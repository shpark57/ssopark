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


import { LoginContext ,checkPassword } from 'src/contexts/login'
import * as Time from 'src/types/time'
import crypto  from 'crypto'

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
    id: string;
    password: string;
    email: string;
    username: string;
    phoneNumber: string;
    avatar: string;
    useYn: string;
    rgstrId: string;
    rgstrTime: string;
    mdfrId: string;
    mdfrTime: string;
    lastLogin: string;
    salt: string;
}

const theme = createTheme();
export default function UserModify() {
    let navigate = useNavigate();   //페이지 이동을 위해필요.
    let {id} = useParams();
    const {loggedIn , user , setLoggedOut} = useContext(LoginContext);


    const [userParams , setUserParams] = useState({ 
                                        id : "",
                                        password : "",
                                        email : "", 
                                        username : "",
                                        phoneNumber :"",
                                        avatar : "",
                                        useYn : "Y",
                                        rgstrId: "",
                                        rgstrTime:"" ,
                                        mdfrId: "",
                                        mdfrTime: "",      
                                        lastLogin: "",
                                        salt : ""                           
                                    })
    
    useEffect(() => {
        axios.get('http://localhost:4000/users?id='+{id}.id)
        .then(res => setUserParams(res.data[0]))
    },[0])  


  const handleModify = async(event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);

    const input_id = String(data.get('id'))
    const input_password = String(data.get('password'))
    const res = await checkPassword(input_id ,input_password)
    if(!res.check){
      alert("비밀번호 다르다")
      return
    }
    if( data.get('password') == '' ){
        alert("비밀번호 입력해라")
        return
    }


    axios.put("http://localhost:4000/users/"+ userParams.id , userParams )
      .then((response) => { console.log(response);alert("수정 성공")})
      .then(()=> navigate(String("/users"))) 
      .catch((error) =>  {alert("수정 실패")});

  };

  const inputFromHandler = (e:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>{
    setUserParams((prevUser:userInfo ) => ({
        ...prevUser ,
        [e.target.id] : e.target.value,
        mdfrId : user.id,
        mdfrTime : Time.getTimeString()
    }))
  }

  const { showModal } = useModal();
  const handleClickDefaultModal = () => {
    showModal({
      modalType: "DefaultModal",
      modalProps: {
        message : ( <PasswordModifyModal userId={userParams.id}/>),
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
                  id="id"
                  label="ID"
                  name="id"
                  autoComplete="id"
                  value={userParams.id}
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
                  id="username"
                  label="이름"
                  name="username"
                  autoComplete="username"
                  value={userParams.username}
                  onChange={(e:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => inputFromHandler(e)}
                />
              </Grid>       
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="phoneNumber"
                  label="Phone Number"
                  name="phoneNumber"
                  autoComplete="phoneNumber"
                  value={userParams.phoneNumber}
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