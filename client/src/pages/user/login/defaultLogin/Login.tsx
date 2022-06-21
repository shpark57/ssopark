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


function Copyright(props: any) {
    return (
      <Typography variant="body2" color="text.secondary" align="center" {...props}>
        {'Copyright © '}
        <Link color="inherit" href="http://shpark91.synology.me:8080/">
          SsoPark
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }
 
interface userInfo{
    check:boolean,
    id:number,
    user_id:string,
    user_name:string,
    avatar:string,
    email:string,
    phone_number:string
}
const theme = createTheme(); 
export default function Login(){
    const {setLoggedUser } = useContext(LoginContext);
    const [remember , setRemember] = useState(Boolean(window.localStorage.getItem('user_id')))
    const [userId , setUserId] = useState(window.localStorage.getItem('user_id') ? String(window.localStorage.getItem('user_id')) : '')
    
    const inputFromHandler = (e:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>{
        setUserId(e.target.value) 
    }


    const handleSubmit = async(event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        // 암호화 모듈 인식을 못함.......  

        const input_id = String(data.get('input_id'))
        const input_password = String(data.get('input_password'))
        const res = await axios.post("/password/check",{user_id:input_id,password:input_password})
        
        if(res.data.check){
            //로그인 시 로그인 시간 저장
            await axios.patch("/Users/"+ res.data.id , {  last_login : Time.getTimeString() } )  
            .then((response) => { console.log("마지막 로그인 시간 수정 완료")})
            .catch((error) =>  {console.log("마지막 로그인 시간 수정 실패")});    
            
            let user = {
                id : res.data.id,
                user_id : res.data.user_id,
                user_name : res.data.user_name,
                avatar : res.data.avatar,
                email : res.data.email,
                phone_number : res.data.phone_number
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
    

    const [errMsg , setErrMsg] = useState("")
    return(
        <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
            sx={{
            marginTop: 25,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            }}
        >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
            Sign in
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
                Sign In
            </Button>
            <Grid container>
                <Grid item xs>
                <Link href="#" variant="body2">
                    Forgot password?
                </Link>
                </Grid>
                <Grid item>
                <Link href="signUp" variant="body2">
                    {"Don't have an account? Sign Up"}
                </Link>
                </Grid>
            </Grid>
            </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
        </Container>
        </ThemeProvider>
    )

}