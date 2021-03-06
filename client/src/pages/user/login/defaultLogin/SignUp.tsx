import React , {useState} from 'react';
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

import * as Time from 'src/types/time'
import axios from 'axios';

import crypto  from 'crypto'

import useModal from "src/components/modal/hooks/useModal";
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

const theme = createTheme();
export default function SignUp() {
  const { showModal } = useModal();   
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    
    if( data.get('password') != data.get('confirmPassword')){
               
        showModal({
          modalType: "AlertModal",
          modalProps: {
            message: "비밀번호가 틀렸습니다!"
          }
        });
      return
    }


    const salt = crypto.randomBytes(32).toString('hex');
    const password = String(data.get('password'))
    const hashPassword = crypto.pbkdf2Sync(password, salt, 1, 32, 'sha512').toString('hex');


    const params = {
      user_id :  data.get('user_id'),
      password : hashPassword,
      email : data.get('email'), 
      user_name : data.get('user_name'),
      phone_number : data.get('phone_number'),
      avatar : data.get('avatar'),
      use_yn : 'Y',
      rgstr_id: data.get('user_id'),
      rgstr_time: Time.getTimeString() ,
      mdfr_id: data.get('user_id'),
      mdfr_time: Time.getTimeString(),      
      last_login: Time.getTimeString(),
      salt : salt                           //암호화시 키가 될값 저장
    }
    
    if(params.avatar == ''){
      params.avatar = 'https://cdn.pixabay.com/photo/2017/11/10/05/48/user-2935527_960_720.png'
    }

    axios.post("/Users" , params)
      .then( (response) => {
        
        showModal({
          modalType: "AlertModal",
          modalProps: {
            message: "회원가입에 성공하셨습니다."
          }
        });
      })
      .then(()=> window.location.replace("/"))
      .catch( (error) => { 
        
        showModal({
          modalType: "AlertModal",
          modalProps: {
            message: "회원가입에 실패하셨습니다."
          }
        });
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
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  
                  fullWidth
                  id="avatar"
                  label="이미지 개발중 경로만 입력하세요"
                  name="avatar"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="user_id"
                  label="ID"
                  name="user_id"
                  autoComplete="id"
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
                />
              </Grid>
              <Grid item xs={12}>
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
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="confirmPassword"
                  label="Confirm password"
                  type="password"
                  id="confirmPassword"
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="primary" />}
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="#" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}