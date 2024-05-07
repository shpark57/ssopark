import { createContext, useState } from 'react';
import crypto  from 'crypto'
import axios from 'axios';
import {ProductProps} from "../../pages/producrs/props/ProductProps";
import {OrdersDetailParm} from "../../pages/order/props/OrdersDetailParm";
import {getCookie, removeCookie, setCookie} from "../../types/cookie";
import {CartProps} from "../../pages/cart/props/CartProps";




const CartContext = createContext({//로그인 시 공유할 유저 정보
    ckCarts : '',
    ckAddInfo :'' ,
    setCkCartsSession: (carts:string , addInfo : string) => {},
    removeSessionCarts: () => {}

});

const sessionStorage = window.sessionStorage; //새로고침시에도 정보가 남아있기 위해 세션스토리지에도 담음
const localStorage = window.localStorage;
interface Props {
  children: JSX.Element | JSX.Element[];
}

const CartProvider = ({ children }: Props): JSX.Element => { //App에서 LoginProvider 내부의 라우트들에게 로그인 정보 공유
    const [ckCarts, setCkCarts] = useState<string>(String(sessionStorage.getItem('ckCarts')));
    const [ckAddInfo, setCkAddInfo] = useState<string>(String(sessionStorage.getItem('ckAddInfo')));

  const setCkCartsSession = (carts:string , addInfo : string) => {
      sessionStorage.setItem('ckCarts' , carts);
      sessionStorage.setItem('ckAddInfo' ,addInfo);
      setCkCarts(carts);
      setCkAddInfo(addInfo);
  }
  const removeSessionCarts = () =>{
      sessionStorage.setItem('ckCarts' , '');
      sessionStorage.setItem('ckAddInfo' ,'');

      setCkCarts("")
      setCkAddInfo("")
  }
    return (
    <CartContext.Provider
      value={{
          ckCarts
          ,ckAddInfo
          ,setCkCartsSession
          ,removeSessionCarts
      }}>
      {children}
    </CartContext.Provider>
  );
};

export { CartContext, CartProvider };
