import axios from "axios";
import './login.css'
import React, {useState, useEffect ,useContext} from "react";
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


import { LoginContext } from 'src/contexts/login';
import * as Time from 'src/types/time'
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import useModal from "../../../../components/modal/hooks/useModal";

import SignUp from "src/pages/user/login/defaultLogin/SignUp";
import PasswordModifyModal from "../../modify/Modals/PasswordModifyModal";
import ForgotPassword from "./Modals/ForgotPassword";


 
interface userInfo{
    check:boolean,
    id:number,
    user_id:string,
    user_name:string,
    email:string,
    phone_number:string,
    auth : string,
    addr : string,
    addrDetail: string,
    zipNo: string

}
const theme = createTheme(); 
export default function Login(){
    const {setLoggedUser } = useContext(LoginContext);
    const [remember , setRemember] = useState(Boolean(window.localStorage.getItem('user_id')))
    const [userId , setUserId] = useState(window.localStorage.getItem('user_id') ? String(window.localStorage.getItem('user_id')) : '')

    const { showModal } = useModal();           //모달 사용
    const inputFromHandler = (e:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>{
        setUserId(e.target.value) 
    }


    const handleLogIn  = (e:React.MouseEvent<HTMLButtonElement >) => { //임시로 로그인버튼을 탑바의 사진모양 클릭으로 만들어둠.
        showModal({
            modalType: "IncludeModal",
            modalProps: {
                message:  <SignUp/>
            }
        });
        // navigate(String("/login"))
    }
    const handleSubmit = async(event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        // 암호화 모듈 인식을 못함.......  

        const input_id = String(data.get('input_id'))
        const input_password = String(data.get('input_password'))
        const res = await axios.post( process.env.REACT_APP_SERVER_HOST_API + "/password/check",{user_id:input_id,password:input_password})

        if(res.data.check){
            //로그인 시 로그인 시간 저장
            await axios.patch( process.env.REACT_APP_SERVER_HOST_API + "/Users/"+ res.data.id , {  last_login : Time.getTimeString() } )
            .then((response) => { console.log("마지막 로그인 시간 수정 완료")})
            .catch((error) =>  {console.log("마지막 로그인 시간 수정 실패")});    

            let user = {
                id : res.data.id,
                user_id : res.data.user_id,
                user_name : res.data.user_name,
                email : res.data.email,
                phone_number : res.data.phone_number,
                auth : res.data.auth,
                addr : res.data.addr,
                addrDetail: res.data.addrDetail,
                zipNo: res.data.zipNo,
            }
            await setLoggedUser(user,remember)
        }else{
            setErrMsg('계정을 다시 확인해 주세요')
        }
      };

      const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();

        setRemember(event.currentTarget.checked)
      };

    const handleClickForgotPassword = () => {
        showModal({
            modalType: "DefaultModal",
            modalProps: {
                message : ( <ForgotPassword/>),
                title: "",
            }
        });
    };

    const [errMsg , setErrMsg] = useState("")
    return(
        <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="md">
        <Box
            sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            }}
        >
            <Typography component="h1" variant="h5">
            로그인
            </Typography>
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
                margin="normal"
                required
                fullWidth
                id="input_id"
                label="ID"
                name="input_id"
                autoComplete="id"
                autoFocus
                value={userId}
                onChange={(e:React.ChangeEvent<HTMLInputElement>) => inputFromHandler(e)}
            />
            <TextField
                margin="normal"
                required
                fullWidth
                name="input_password"
                label="Password"
                type="password"
                id="input_password"
                autoComplete="current-password"
            />
            <FormControlLabel
                control={<Checkbox value="remember" color="primary" onChange={changeHandler} checked={remember} />}
                label="Remember me"
            />  
            <div className="errMsg"> {errMsg}</div>
            <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
            >
                로그인
            </Button>
            <Grid container>
                <Grid item xs>
                    <Button
                        onClick={handleClickForgotPassword}
                        variant="text"
                        sx={{ mt: 1, mb: 2 }}
                    >
                        ID / PW 찾기
                    </Button>
                </Grid>
                <Grid item>

                    <Button
                        onClick={handleLogIn}

                        variant="text"
                        sx={{ mt: 1, mb: 2 }}
                    >
                    회원가입
                    </Button>
                </Grid>
            </Grid>
            </Box>
        </Box>
        </Container>
        </ThemeProvider>
    )

}