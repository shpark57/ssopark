import axios from 'axios';
import React, { useEffect, useState ,useContext} from 'react';
import { useSearchParams ,useNavigate} from 'react-router-dom';
import Button from '@mui/material/Button';
import * as Time from 'src/types/time'
import {Container , Grid, Box , TextField} from '@mui/material';
import { LoginContext } from 'src/contexts/login'
import {CartContext} from "src/contexts/carts/cartsProv";
import useModal from "src/components/modal/hooks/useModal";
import DeleteIcon from '@mui/icons-material/Delete';


import CommentComponent from 'src/components/comment/CommentComponent';
import {getCookie, removeCookie, setCookie} from "../../types/cookie";
import {CartProps} from "../cart/props/CartProps";
import {OrdersDetailParm} from "../order/props/OrdersDetailParm";

const Payment = () => {

    const {ckCarts,ckAddInfo,setCkCartsSession,removeSessionCarts} = useContext(CartContext);
    const {loggedIn , user } = useContext(LoginContext);
    const { showModal } = useModal();
    let navigate = useNavigate();   //페이지 이동을 위해필요.
    const [query, setQuery]  = useSearchParams();
    const fatchData = async () =>{
        if(query.get('imp_uid') && query.get('merchant_uid') && query.get('imp_success')) {
            let sckCarts   = JSON.parse(ckCarts)
            let sckAddInfo = JSON.parse(ckAddInfo)


            let ordNo = query.get('merchant_uid')

            let ordersParm = {
                id: ordNo,
                user_id: user.id != 0 ? user.id : null,
                order_date: Time.getTimeString(),
                order_state: '결제성공',
                order_title: sckCarts.length > 1 ?  sckCarts[0].product.product_nm + '외 '+ String(sckCarts.length -1) +'건' : sckCarts[0].product.product_nm   ,
                order_price: sckAddInfo.totalPrice,  //배송비 무료
                rgstr_id: user.user_id != 'null' ? user.user_id : 'system',
                rgstr_time: Time.getTimeString(),
                mdfr_id:  user.user_id != 'null' ? user.user_id : 'system',
                mdfr_time: Time.getTimeString(),
                addr: sckAddInfo.addr,
                addrDetail: sckAddInfo.addrDetail,
                zipNo: sckAddInfo.zipNo,
                recipient_name: sckAddInfo.recipient_name,
                recipient_phone_number: sckAddInfo.recipient_phone_number
            }
            let a1 = await axios.post( process.env.REACT_APP_SERVER_HOST_API + '/Orders', ordersParm)

            for(let i in sckCarts){
                let ordersDetailParm = {
                    order_id: a1.data.id,
                    product_id: sckCarts[i].product.id,
                    product_nm: sckCarts[i].product.product_nm,
                    product_type: sckCarts[i].product.product_type,
                    cnt: sckCarts[i].cnt,
                    price: sckCarts[i].product.price,
                    totalPrice: sckAddInfo.totalPrice,
                    title_img: sckCarts[i].product.title_img,
                    rgstr_id: user.user_id != 'null' ? user.user_id : 'system',
                    rgstr_time: Time.getTimeString(),
                    mdfr_id: user.user_id != 'null' ? user.user_id : 'system',
                    mdfr_time: Time.getTimeString(),
                }
                let a2 = await axios.post( process.env.REACT_APP_SERVER_HOST_API + '/OrderDetails', ordersDetailParm)
            }

            removeSessionCarts()

            let a3 = await axios.get(process.env.REACT_APP_SERVER_HOST_API + '/Orders?id='+ordNo+'&_rel=details')
            let details = a3.data[0].details
            if(loggedIn){
                details.forEach((detail:OrdersDetailParm) =>{
                    axios.delete( process.env.REACT_APP_SERVER_HOST_API + "/Cart?product_id="+detail.product_id +"&user_id="+user.id )
                })
            }else{
                let cookieCartList =   getCookie("cookieCartList")
                let tmpArr:CartProps[] = []

                cookieCartList.forEach((cart: CartProps) =>{
                    let index = details.findIndex((detail:OrdersDetailParm) => detail.product_id  === cart.product.id)
                    if(index === -1 ){
                        tmpArr.push(cart)
                    }
                })


                setCookie("cookieCartList" , JSON.stringify(tmpArr))
            }

            axios.get( process.env.REACT_APP_SERVER_HOST_API + "/Users?user_id=allan159")
                .then(res=>{
                    const param = {
                        "key" :  process.env.REACT_APP_SMS_ICODE_KEY
                        ,"tel" :  res.data[0].phone_number
                        ,"cb" : "01090293089"
                        ,"msg" : "주문번호 : ["+ ordersParm.id  +"] \n" +
                            ordersParm.recipient_name  +" 님이 \n" +
                            ordersParm.order_title +" 을/를 주문됐습니다. \n" +
                            ordersParm.order_price.toLocaleString('ko-KR')+" 원 \n" +
                            "주문을 확인해주세요."
                        ,"title" : ordersParm.order_title
                        ,"count" : "1"
                    }

                    axios.post(process.env.REACT_APP_SERVER_HOST_API + "/sendsms"  , param)
                        .then(res=>{
                            // @ts-ignore
                            if(!alert("주문에 성공했습니다.")) navigate("/orderList")

                        })
                        .catch(res=>{
                            console.log("문자발송 실패")
                        })
                })

        }else{
            // @ts-ignore
            if(!alert("주문에 실패했습니다.")) navigate("/orderList")
        }
    }

    useEffect(() => {
        fatchData()
    }, [query]);

    return(
        <Container component="main" maxWidth="lg">
            결제중.
        </Container>
    )

}

export default Payment


