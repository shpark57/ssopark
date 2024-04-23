import React, {ChangeEvent, useEffect, useState} from 'react';
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

import * as crypto from 'src/types/crypto-browserify'

import LoginPage from "src/pages/user/login/defaultLogin/Login";
import useModal from "src/components/modal/hooks/useModal";


import { IAddr } from 'src/types/iddr'
import {Alert} from "@mui/material";

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


  const [alertMessage, setAlertMessage] = useState(''); //알림 메시지
  const { showModal } = useModal();   
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    if( data.get('password') != data.get('confirmPassword')){
      setAlertMessage("비밀번호가 틀렸습니다!")
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



    const salt = crypto.randomBytes(32).toString('hex');
    const password = String(data.get('password'))
    const hashPassword = crypto.pbkdf2Sync(password, salt, 1, 32, 'sha512').toString('hex');



    const params = {
      user_id :  data.get('user_id'),
      password : hashPassword,
      email : data.get('email'), 
      user_name : data.get('user_name'),
      phone_number : data.get('phone_number'),
      use_yn : 'Y',
      rgstr_id: data.get('user_id'),
      rgstr_time: Time.getTimeString() ,
      mdfr_id: data.get('user_id'),
      mdfr_time: Time.getTimeString(),      
      last_login: Time.getTimeString(),
      salt : salt,                           //암호화시 키가 될값 저장
      addr : addrValue,
      addrDetail : addrDetailValue,
      zipNo : zipNoValue
    }



    axios.post( process.env.REACT_APP_CLIENT_HOST + "/api/Users" , params)
      .then( (response) => {
        
        showModal({
          modalType: "AlertModal",
          modalProps: {
            message: "회원가입에 성공하셨습니다.",
            handleConfirm : arg => {
              showModal({
                modalType: "IncludeModal",
                modalProps: {
                  message:  <LoginPage/>
                }
              });
            }
          }
        })
      })

      .catch( (error) => {


        if(error.response.status == 500 ){
          setAlertMessage('동일한 아이디가 존재합니다.')
        }else{
          setAlertMessage("회원가입에 실패하셨습니다.")
        }

      });

  };





  const [addrValue, setAddrValue] = useState(''); // 도로명주소
  const [zipNoValue, setZipNoValue] = useState(''); // 우편번호
  const [addrDetailValue, setAddrDetailValue] = useState(''); // 상세주소



  const handleAddrDetail = (event: ChangeEvent<HTMLInputElement>) => {
    setAddrDetailValue(event.target.value);
  };

  const onClickAddr = (event: React.MouseEvent<HTMLInputElement>) => {
    new window.daum.Postcode({
      oncomplete: function (data: IAddr) {
        setAddrValue(data.address);
        setZipNoValue(data.zonecode);
        setAddrDetailValue('');
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
          <Typography component="h1" variant="h5">
            회원가입
          </Typography>



          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>

              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="user_id"
                  label="아이디"
                  name="user_id"
                  autoComplete="id"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="이메일"
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
                  label="휴대번호"
                  name="phone_number"
                  autoComplete="phone_number"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="패스워드"
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
                  label="패스워드 확인"
                  type="password"
                  id="confirmPassword"
                  autoComplete="new-password"
                />
              </Grid>

              <Grid item xs={12} sm={4}>
                <TextField
                    required
                    fullWidth
                    id="zipNo"
                    label="우편주소"
                    name="zipNo"
                    autoComplete="zipNo"
                    value={zipNoValue}
                    onClick={onClickAddr}
                />
              </Grid>
              <Grid item xs={12} sm={8}>
                <TextField
                    required
                    fullWidth
                    id="addr"
                    label="도로명주소"
                    name="addr"
                    autoComplete="addr"
                    onClick={onClickAddr}
                    value={addrValue}
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
                    value={addrDetailValue}
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
              회원가입
            </Button>

            {
              alertMessage != '' ? <Alert severity="error">{alertMessage}</Alert> : ''
            }



          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}