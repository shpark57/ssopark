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

import crypto from 'crypto'

import useModal from "src/components/modal/hooks/useModal";
import {Alert, Radio, RadioGroup} from "@mui/material";

const ForgotPassword = () => {
  const { showModal } = useModal();
  const [errMsg , setErrMsg] = useState("")
  const [alertMessage, setAlertMessage] = useState(''); //알림 메시지

  const [radioValue, setRadioValue] = React.useState('id');
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {

    setRadioValue((event.target as HTMLInputElement).value);
  };

  function generateRandomString() {
    const chars =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%&*";
    let randomStr = "";
    for (let i = 0; i < 10; i++) {
      let randomIndex = Math.floor(Math.random() * chars.length);
      randomStr += chars[randomIndex];
    }
    return randomStr
  }

  const handleSubmit = async(event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    if( data.get('email') == '' ){
      setAlertMessage('이메일을 입력해주세요,')
      return
    }
    if(radioValue == 'id'){
      axios.get( "/api/Users?email="+data.get('email'))
          .then(res=>{
            if(res.data.length == 0){
              setAlertMessage('등록된 아이디가 없습니다.')
              return
            }else {
              showModal({
                modalType: "ConfirmModal",
                modalProps: {
                  message: "아이디를 등록된 이메일에서 확인하시겠습니까?",
                  confirmText: "Yes",
                  cancelText: "No",
                  title: "",
                  handleConfirm: () => {


                    var mailParam = {
                      name  : "아이디 찾기" ,
                      email : res.data[0].email ,
                      message :  res.data[0].user_name + "님의 아이디는  " + res.data[0].user_id + " 입니다."
                    }
                    axios.post( "/api//sendmail",mailParam)
                        .then(res=>{
                          showModal({
                            modalType: "AlertModal",
                            modalProps: {
                              message: "메일 발송에 성공했습니다."
                            }
                          });
                        })



                  },
                  handleClose: () => {

                  }
                }
              });



            }
          })
          .catch((error) =>  {console.log(error)});
    }else if(radioValue == 'pw'){
      if( data.get('id') == '' ){
        setAlertMessage('ID를 입력해주세요,')
        return
      }
      axios.get( "/api/Users?email="+data.get('email')+"&user_id="+data.get('id'))
          .then(res=>{
            if(res.data.length == 0){
              setAlertMessage('등록된 이메일이 없습니다.')
              return
            }else {

              showModal({
                modalType: "ConfirmModal",
                modalProps: {
                  message: "비밀번호를 초기화 하시겠습니까?",
                  confirmText: "Yes",
                  cancelText: "No",
                  title: "",
                  handleConfirm: () => {
                    var new_password = generateRandomString()
                    console.log(new_password)
                    axios.patch( "/api//password/change/"+ res.data[0].id ,  {password :new_password , mdfr_time : Time.getTimeString() , mdfr_id : 'system' } )
                        .then((response) => {
                          var mailParam = {
                            name  : "비밀번호 초기화" ,
                            email : res.data[0].email ,
                            message :  res.data[0].user_name + "님의 비밀번호를  " + new_password + "입니다. \n 비밀번호를 변경해주세요."
                          }
                          axios.post( "/api//sendmail",mailParam)
                              .then(res=>{
                                showModal({
                                  modalType: "AlertModal",
                                  modalProps: {
                                    message: "등록된 이메일로 메일 발송에 성공했습니다."
                                  }
                                });
                              })
                        })



                  },
                  handleClose: () => {

                  }
                }
              });
            }
          })
          .catch((error) =>  {console.log(error)});
    }


/*


*/

  };

  return (
      <Container component="main" maxWidth="xs">
          <div className="errMsg"> {errMsg}</div>
          <Box component="form" noValidate onSubmit={handleSubmit}>
            <Grid container spacing={2}>
            <Grid item xs={12}>
              <RadioGroup
                  row
                  aria-labelledby="demo-radio-buttons-group-label"
                  value={radioValue}
                  onChange={handleChange}
                  name="radio-buttons-group"
              >
                <FormControlLabel value="id" control={<Radio />} label="아이디 찾기" />
                <FormControlLabel value="pw" control={<Radio />} label="비밀번호 찾기" />
              </RadioGroup>
            </Grid>
              <Grid item xs={12}>
                <TextField
                    required
                    fullWidth
                    name="email"
                    label="이메일"
                    type="email"
                    id="email"
                />
              </Grid>
              { radioValue == 'pw' ?
                  <Grid item xs={12}>
                    <TextField
                        required
                        fullWidth
                        name="id"
                        label="아이디"
                        type="text"
                        id="id"

                    />
                  </Grid>
                  : ''
              }
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              찾기
            </Button>
          </Box>
        {
          alertMessage != '' ? <Alert severity="error">{alertMessage}</Alert> : ''
        }
      </Container>

  );
}

export default ForgotPassword;