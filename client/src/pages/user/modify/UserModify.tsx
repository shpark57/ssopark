import React, {useState, useEffect, useContext, ChangeEvent} from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import { useParams ,useNavigate} from 'react-router-dom';
import {Alert, Hidden, Paper} from "@mui/material";


import { LoginContext } from 'src/contexts/login'
import * as Time from 'src/types/time'

import useModal from "src/components/modal/hooks/useModal";

import PasswordModifyModal from './Modals/PasswordModifyModal'
import {CommentBodyProp, CommentInputProp} from "../../../components/comment/CommentComponent";
import {IAddr} from "../../../types/iddr";

interface userInfo  {
    id: number;
    user_id : string;
    password: string;
    email: string;
    user_name: string;
    phone_number: string;
    useYn: string;
    rgstr_id: string;
    rgstr_time: string;
    mdfr_id: string;
    mdfr_time: string;
    last_login: string;
    salt: string;
    auth: string;
    addr : string,
    addrDetail : string,
    zipNo : string
}

interface Interface {
    id?:number
}
const theme = createTheme();

const UserModify:React.FC<Interface> =  (props) => {
        const { showModal } = useModal();
        // @ts-ignore
        //let {id} = useParams();

        const {loggedIn , user } = useContext(LoginContext);


        const [alertMessage, setAlertMessage] = useState(''); //알림 메시지
        //let navigate = useNavigate();   //페이지 이동을 위해필요.
        const [userParams , setUserParams] = useState({
            id : 0,
            user_id : "",
            password : "",
            email : "",
            user_name : "",
            phone_number :"",
            useYn : "Y",
            rgstr_id: "",
            rgstr_time:"" ,
            mdfr_id: "",
            mdfr_time: "",
            last_login: "",
            salt : ""     ,
            auth :"" ,
            addr : "",
            addrDetail : "",
            zipNo : ""
        })

        useEffect(() => {
            axios.get( '/api/Users/'+props.id)
                .then(res =>  setUserParams(res.data))
            /* .then(res => {
                 setUserParams((prevUser:userInfo ) => ({
                   ...prevUser ,
                   mdfr_time : Time.getTimeString(),
                   rgstr_id : user.user_id,                              //타임스탬프 변환해주어야함...
                   rgstr_time : Time.toDateString(prevUser.rgstr_time),  //타임스탬프 변환해주어야함...
                   last_login :  Time.toDateString(prevUser.last_login), //타임스탬프 변환해주어야함...
                 }))
               }).then(()=>console.log(userParams))*/
        },[0])


        const handleModify = async(event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();

            const data = new FormData(event.currentTarget);

            const input_id = String(data.get('user_id'))
            const input_password = String(data.get('password'))
            const res = await axios.post( "/api//password/check",{user_id:input_id,password:input_password})
            if( data.get('password') == '' ){
                setAlertMessage('비밀번호를 입력해주세요,')
                return
            }
            if(!res.data.check){
                setAlertMessage('비밀번호가 다릅니다,')
                return
            }

            const regPhone = /^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/
            const emailRegEx = /^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/i;
            if( String(data.get('email')).match(emailRegEx) === null ){
                setAlertMessage("이메일 형식을 확인해주세요.")
                return
            }
            if( String(data.get('phone_number')).match(regPhone) === null  ){
                setAlertMessage("전화번호를 확인해주세요.")
                return
            }



            axios.put( "/api//Users/"+ userParams.id , userParams )
                .then((response) => {

                    showModal({
                        modalType: "AlertModal",
                        modalProps: {
                            message : '수정에 성공했습니다.'
                        }
                    });
                })
                //.then(()=> navigate(String("/Users")))
                .catch((error) =>  {
                    setAlertMessage('수정에 실패했습니다.')
                });

        };

        const inputFromHandler = (e:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>{
            setUserParams((prevUser:userInfo ) => ({
                ...prevUser ,
                [e.target.id] : e.target.value,
                mdfr_id : user.user_id,
                mdfr_time : Time.getTimeString(),
                rgstr_time : Time.toDateString(prevUser.rgstr_time),
                last_login :  Time.toDateString(prevUser.last_login),
            }))
        }

        const handleClickDefaultModal = () => {
            showModal({
                modalType: "DefaultModal",
                modalProps: {
                    message : ( <PasswordModifyModal user_id={userParams.user_id}/>),
                    title: "",
                }
            });
        };





    const handleAddrDetail = (event: ChangeEvent<HTMLInputElement>) => {
        setUserParams((prevUser:userInfo ) => ({
            ...prevUser ,
            addrDetail: event.target.value
        }))
    };

    const onClickAddr = (event: React.MouseEvent<HTMLInputElement>) => {
        new window.daum.Postcode({
            oncomplete: function (data: IAddr) {
                setUserParams((prevUser:userInfo ) => ({
                    ...prevUser ,
                    addrDetail:'',
                    addr: data.address,
                    zipNo:data.zonecode
                }))
                document.getElementById('addrDetail')?.focus();
            }
        }).open();
    };

        return (

            <ThemeProvider theme={theme}>
                <Container component="main" maxWidth="xs">
                    <CssBaseline />
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Box component="form" noValidate onSubmit={handleModify} sx={{ mt: 3 }}>
                            <Grid container spacing={2}>

                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        id="user_id"
                                        label="ID"
                                        name="user_id"
                                        autoComplete="user_id"
                                        value={userParams.user_id}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        id="email"
                                        label="Email"
                                        name="email"
                                        autoComplete="email"
                                        value={userParams.email}
                                        onChange={(e:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => inputFromHandler(e)}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        id="user_name"
                                        label="이름"
                                        name="user_name"
                                        autoComplete="user_name"
                                        value={userParams.user_name}
                                        onChange={(e:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => inputFromHandler(e)}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        id="phone_number"
                                        label="휴대번호"
                                        name="phone_number"
                                        autoComplete="phone_number"
                                        value={userParams.phone_number }
                                        onChange={(e:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => inputFromHandler(e)}
                                    />
                                </Grid>

                                {   user.auth == 'admin' ?
                                    <Grid item xs={12}>
                                        <TextField
                                            required
                                            fullWidth
                                            id="auth"
                                            label="권한"
                                            name="auth"
                                            autoComplete="auth"
                                            value={userParams.auth}
                                            onChange={(e:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => inputFromHandler(e)}
                                        />
                                    </Grid>
                                    :''

                                }
                                <Grid item xs={8}>
                                    <TextField
                                        required
                                        fullWidth
                                        name="password"
                                        label="Password"
                                        type="password"
                                        id="password"
                                        autoComplete="new-password"
                                    />
                                </Grid>
                                <Grid item  xs={4}>
                                    <Button
                                        onClick={handleClickDefaultModal}
                                        fullWidth
                                        variant="contained"
                                        sx={{ mt: 1, mb: 2 }}
                                    >
                                        변경
                                    </Button>
                                </Grid>

                                <Grid item xs={12} sm={4}>
                                    <TextField
                                        required
                                        fullWidth
                                        id="zipNo"
                                        label="우편주소"
                                        name="zipNo"
                                        autoComplete="zipNo"
                                        value={userParams.zipNo}
                                        onClick={onClickAddr}
                                    />
                                </Grid>
                                <Grid item  xs={12} sm={8}>
                                    <TextField
                                        required
                                        fullWidth
                                        id="addr"
                                        label="도로명주소"
                                        name="addr"
                                        autoComplete="addr"
                                        value={userParams.addr}
                                        onClick={onClickAddr}
                                    />
                                </Grid>

                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        id="addrDetail"
                                        label="상세주소"
                                        name="addrDetail"
                                        autoComplete="addrDetail"
                                        value={userParams.addrDetail}
                                        onChange={handleAddrDetail}
                                    />
                                </Grid>
                            </Grid>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                수정
                            </Button>
                        </Box>
                    </Box>
                    {
                        alertMessage != '' ? <Alert severity="error">{alertMessage}</Alert> : ''
                    }


                </Container>
            </ThemeProvider>

        )
}
export default UserModify