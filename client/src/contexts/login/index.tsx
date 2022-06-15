import { createContext, useState } from 'react';
import crypto  from 'crypto'
import axios from 'axios';

interface userInfo {      //공유되는 유저정보 타입       
    id : string ,
    username : string ,
    avatar : string,
    email : string ,
    phoneNumber : string ,
  }
const LoginContext = createContext({//로그인 시 공유할 유저 정보
    user : {
        id : '',
        username : '',
        avatar : '',
        email : '',
        phoneNumber : '',      
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
        id : String(sessionStorage.getItem('id')) 
        ,username : String(sessionStorage.getItem('username')) 
        ,avatar : String(sessionStorage.getItem('avatar')) 
        ,email : String(sessionStorage.getItem('email')) 
        ,phoneNumber : String(sessionStorage.getItem('phoneNumber'))  
    });
  const [loggedIn, setLoggedIn] = useState(false);

  const setLoggedUser = (user:userInfo,remember:boolean): void => {
    //로그인 처리
    sessionStorage.setItem('loggedIn' , 'true');
    sessionStorage.setItem('id' , user.id);
    sessionStorage.setItem('avatar' , user.avatar);
    sessionStorage.setItem('email' , user.email);
    sessionStorage.setItem('phoneNumber' , user.phoneNumber);
    sessionStorage.setItem('username' , user.username);

    if(remember){
      localStorage.setItem('id',user.id)
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
      id : '',
      username : '',
      avatar : '',
      email : '',
      phoneNumber : '',      
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


export const checkPassword = async(id:string , password:string) => {
  const res1 = await axios.get('http://localhost:4000/users' , {params: {id : id}})
  if(res1.data.length != 1){
    return{ check : false , id : '',username : '',avatar : '',email : '',phoneNumber : ''}
  }
  const salt = res1.data[0].salt
  const hashPassword = crypto.pbkdf2Sync(password, salt, 1, 32, 'sha512').toString('hex');

  const res2 = await axios.get('http://localhost:4000/users' , {params: {id : id , password : hashPassword}})
  if(res2.data.length == 1){
    return{ check : true , id : res2.data[0].id,username : res2.data[0].username,avatar : res2.data[0].avatar,email : res2.data[0].email,phoneNumber : res2.data[0].phoneNumber}
  }else{
    return{ check : false , id : '',username : '',avatar : '',email : '',phoneNumber : ''}
  }
}