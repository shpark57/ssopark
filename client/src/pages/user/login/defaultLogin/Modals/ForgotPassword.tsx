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

type PasswordModifyModalProps = {
  user_id : string;
};

const PasswordModifyModal:React.FC<PasswordModifyModalProps> = ({user_id}) => {
  const { showModal } = useModal();
  const [errMsg , setErrMsg] = useState("")
  const handleSubmit = async(event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    let password = String(data.get('password'))
    let new_password = String(data.get('new_password'))
    let new_confirm_password = String(data.get('new_confirm_password'))
    
    if(new_password != new_confirm_password){
      setErrMsg('새 비밀번호와 비밀번호 확인이 일치하지 않습니다.')
      return
    }

    if(new_password.length < 6){

      setErrMsg('비밀번호 6글자 이상')
      return
    }

    const res = await axios.post("/password/check",{user_id:user_id,password:password})

    if(res.data.check){

      const salt = crypto.randomBytes(32).toString('hex');
      const hashPassword = crypto.pbkdf2Sync(new_password, salt, 1, 32, 'sha512').toString('hex');
  
      axios.patch("/users/"+ user_id ,  { password :hashPassword , salt : salt } )
      .then((response) => { 
        showModal({
          modalType: "AlertModal",
          modalProps: {
            message : '비밀번호가 변경되었습니다.'
          }
        });
      })
      .catch((error) =>  {
        showModal({
          modalType: "AlertModal",
          modalProps: {
            message : '수정 실패'
          }
        });
      });



    }else{
      setErrMsg('비밀번호가 일치하지 않습니다.')
      return
    }

  };


  return (
      <Container component="main" maxWidth="xs">
          <div className="errMsg"> {errMsg}</div>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
            <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="현재 비밀번호"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="new_password"
                  label="새 비밀번호"
                  type="password"
                  id="new_password"
                  autoComplete="new_password"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="new_confirm_password"
                  label="새 비밀번호 확인"
                  type="password"
                  id="new_confirm_password"
                  autoComplete="new_confirm_password"
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
      </Container>
  );
}

export default PasswordModifyModal;