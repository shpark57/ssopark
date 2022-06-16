import { createContext, useState } from 'react';
import crypto  from 'crypto'
import axios from 'axios';

interface userInfo {      //공유되는 유저정보 타입       
    user_id : string ,
    user_name : string ,
    avatar : string,
    email : string ,
    phone_number : string ,
  }
const LoginContext = createContext({//로그인 시 공유할 유저 정보
    user : {
        user_id : '',
        user_name : '',
        avatar : '',
        email : '',
        phone_number : '',      
    },
    loggedIn : false , 
    setLoggedUser: (user:userInfo,remember:boolean) => {},
    setLoggedOut: () => {}
});

const sessionStorage = window.sessionStorage; //새로고침시에도 정보가 남아있기 위해 세션스토리지에도 담음
const localStorage = window.localStorage;
interface Props {
  children: JSX.Element | JSX.Element[];
}

const LoginProvider = ({ children }: Props): JSX.Element => { //App에서 LoginProvider 내부의 라우트들에게 로그인 정보 공유
  const [user, setUser] = useState<userInfo>({
        user_id : String(sessionStorage.getItem('user_id')) 
        ,user_name : String(sessionStorage.getItem('user_name')) 
        ,avatar : String(sessionStorage.getItem('avatar')) 
        ,email : String(sessionStorage.getItem('email')) 
        ,phone_number : String(sessionStorage.getItem('phone_number'))  
    });
  const [loggedIn, setLoggedIn] = useState(false);

  const setLoggedUser = (user:userInfo,remember:boolean): void => {
    //로그인 처리
    sessionStorage.setItem('loggedIn' , 'true');
    sessionStorage.setItem('user_id' , user.user_id);
    sessionStorage.setItem('avatar' , user.avatar);
    sessionStorage.setItem('email' , user.email);
    sessionStorage.setItem('phone_number' , user.phone_number);
    sessionStorage.setItem('user_name' , user.user_name);

    if(remember){
      localStorage.setItem('user_id',user.user_id)
    }else{
      localStorage.clear()
    }
    setUser(user);
    setLoggedIn(true)
    window.location.replace("/")     
  };  

  const setLoggedOut = (): void => {
    //로그아웃 처리
    sessionStorage.clear()
    setUser({
      user_id : '',
      user_name : '',
      avatar : '',
      email : '',
      phone_number : '',      
    });
    setLoggedIn(false)
    
    window.location.replace("/")       
  };
  return (
    <LoginContext.Provider
      value={{
        user,
        loggedIn,
        setLoggedUser,
        setLoggedOut 
      }}>
      {children}
    </LoginContext.Provider>
  );
};

export { LoginContext, LoginProvider };


export const checkPassword = async(user_id:string , password:string) => {
  const res1 = await axios.get('/users' , {params: {user_id : user_id}})
  if(res1.data.length != 1){
    return{ check : false , user_id : '',user_name : '',avatar : '',email : '',phone_number : ''}
  }
  const salt = res1.data[0].salt
  const hashPassword = crypto.pbkdf2Sync(password, salt, 1, 32, 'sha512').toString('hex');

  const res2 = await axios.get('/users' , {params: {user_id : user_id , password : hashPassword}})
  if(res2.data.length == 1){
    return{ check : true ,id : res2.data[0].id , user_id : res2.data[0].user_id ,user_name : res2.data[0].user_name,avatar : res2.data[0].avatar,email : res2.data[0].email,phone_number : res2.data[0].phone_number}
  }else{
    return{ check : false ,id : '' , user_id : '',user_name : '',avatar : '',email : '',phone_number : ''}
  }
}