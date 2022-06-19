import React , {useState, useEffect,useContext} from 'react';
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
import { Hidden, Paper } from "@mui/material";


import { LoginContext } from 'src/contexts/login'
import * as Time from 'src/types/time'

import useModal from "src/components/modal/hooks/useModal";

import PasswordModifyModal from './Modals/PasswordModifyModal'

function Copyright(props: any) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

interface userInfo  {
    id: number;
    user_id : string;
    password: string;
    email: string;
    user_name: string;
    phone_number: string;
    avatar: string;
    useYn: string;
    rgstr_id: string;
    rgstr_time: string;
    mdfr_id: string;
    mdfr_time: string;
    last_login: string;
    salt: string;
}

const theme = createTheme();
export default function UserModify() {
  const { showModal } = useModal();   
    let navigate = useNavigate();   //페이지 이동을 위해필요.
    let {id} = useParams();
    const {loggedIn , user } = useContext(LoginContext);


    const [userParams , setUserParams] = useState({ 
                                        id : 0,
                                        user_id : "",
                                        password : "",
                                        email : "", 
                                        user_name : "",
                                        phone_number :"",
                                        avatar : "",
                                        useYn : "Y",
                                        rgstr_id: "",
                                        rgstr_time:"" ,
                                        mdfr_id: "",
                                        mdfr_time: "",      
                                        last_login: "",
                                        salt : ""                           
                                    })
    
    useEffect(() => {
        axios.get('/Users/'+id)
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
    const res = await axios.post("/password/check",{user_id:input_id,password:input_password})
    if(!res.data.check){
        showModal({
          modalType: "AlertModal",
          modalProps: {
            message : '비밀번호가 다릅니다,'
          }
        });
      return
    }
    if( data.get('password') == '' ){
          showModal({
            modalType: "AlertModal",
            modalProps: {
              message : '비밀번호를 입력해주세요,'
            }
          });
        return
    }

    axios.put("/Users/"+ userParams.id , userParams )
      .then((response) => {
        showModal({
          modalType: "AlertModal",
          modalProps: {
            message : '수정에 성공했습니다.'
          }
        });
      })
      .then(()=> navigate(String("/Users"))) 
      .catch((error) =>  {
        showModal({
          modalType: "AlertModal",
          modalProps: {
            message : '수정에 실패했습니다.'
          }
        });
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

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Box component="form" noValidate onSubmit={handleModify} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  
                  fullWidth
                  id="avatar"
                  label="이미지 개발중 경로만 입력하세요"
                  name="avatar"
                  value={userParams.avatar}
                  onChange={(e:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => inputFromHandler(e)}
                />
              </Grid>
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
                  label="Phone Number"
                  name="phone_number"
                  autoComplete="phone_number"
                  value={userParams.phone_number}
                  onChange={(e:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => inputFromHandler(e)}
                />
              </Grid>
              <Grid item xs={12} sm={8}>
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
              
              <Grid item xs={12} sm={4}>
                <Button
                  onClick={handleClickDefaultModal}
                  fullWidth
                  variant="contained"
                  sx={{ mt: 1, mb: 2 }}
                >
                  변경
                </Button>
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
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}