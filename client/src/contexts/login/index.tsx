import { createContext, useState } from 'react';
import crypto  from 'crypto'
import axios from 'axios';

interface userInfo {      //공유되는 유저정보 타입       
    id : number,
    user_id : string ,
    user_name : string ,
    email : string ,
    phone_number : string ,
    auth : string
  }
const LoginContext = createContext({//로그인 시 공유할 유저 정보
    user : {
        id : 0,
        user_id : '',
        user_name : '',
        email : '',
        phone_number : '',
        auth : ''
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
        id : Number(sessionStorage.getItem('id')) 
        ,user_id : String(sessionStorage.getItem('user_id')) 
        ,user_name : String(sessionStorage.getItem('user_name'))
        ,email : String(sessionStorage.getItem('email'))
        ,phone_number : String(sessionStorage.getItem('phone_number'))
        ,auth : String(sessionStorage.getItem('auth'))
  });
  const [loggedIn, setLoggedIn] = useState(false);

  const setLoggedUser = (user:userInfo,remember:boolean): void => {
    //로그인 처리
    sessionStorage.setItem('loggedIn' , 'true');
    sessionStorage.setItem('id' , String(user.id));
    sessionStorage.setItem('user_id' , user.user_id);
    sessionStorage.setItem('email' , user.email);
    sessionStorage.setItem('phone_number' , user.phone_number);
    sessionStorage.setItem('user_name' , user.user_name);
    sessionStorage.setItem('auth' , user.auth);

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
      id : 0,
      user_id : '',
      user_name : '',
      email : '',
      phone_number : '',
      auth :''
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
