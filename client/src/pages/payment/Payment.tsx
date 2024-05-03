import axios from 'axios';
import React, { useEffect, useState ,useContext} from 'react';
import { useSearchParams ,useNavigate} from 'react-router-dom';
import Button from '@mui/material/Button';
import * as Time from 'src/types/time'
import {Container , Grid, Box , TextField} from '@mui/material';
import { LoginContext } from 'src/contexts/login'
import useModal from "src/components/modal/hooks/useModal";
import DeleteIcon from '@mui/icons-material/Delete';


import CommentComponent from 'src/components/comment/CommentComponent';
import {getCookie, removeCookie, setCookie} from "../../types/cookie";
import {CartProps} from "../cart/props/CartProps";
import {OrdersDetailParm} from "../order/props/OrdersDetailParm";

const Payment = () => {

    const {loggedIn , user } = useContext(LoginContext);
    const { showModal } = useModal();
    let navigate = useNavigate();   //페이지 이동을 위해필요.
    const [query, setQuery]  = useSearchParams();
    useEffect(() => {
        if(query.get('imp_uid') && query.get('merchant_uid') && query.get('imp_success')) {
                        let ckCarts   = getCookie("ckCarts" );
                        let ckAddInfo = getCookie("ckAddInfo" );
                        let ordNo = query.get('merchant_uid')

                        let ordersParm = {
                            id: ordNo,
                            user_id: user.id != 0 ? user.id : null,
                            order_date: Time.getTimeString(),
                            order_state: '결제성공',
                            order_title: ckCarts.length > 1 ?  ckCarts[0].product.product_nm + '외 '+ String(ckCarts.length -1) +'건' : ckCarts[0].product.product_nm   ,
                            order_price: ckAddInfo.totalPrice,  //배송비 무료
                            rgstr_id: user.user_id != 'null' ? user.user_id : 'system',
                            rgstr_time: Time.getTimeString(),
                            mdfr_id:  user.user_id != 'null' ? user.user_id : 'system',
                            mdfr_time: Time.getTimeString(),
                            addr: ckAddInfo.addr,
                            addrDetail: ckAddInfo.addrDetail,
                            zipNo: ckAddInfo.zipNo,
                            recipient_name: ckAddInfo.recipient_name,
                            recipient_phone_number: ckAddInfo.recipient_phone_number
                        }
                        axios.post( process.env.REACT_APP_SERVER_HOST_API + '/Orders', ordersParm)
                            .then(res => {
                                for(let i in ckCarts){
                                    let ordersDetailParm = {
                                        order_id: res.data.id,
                                        product_id: ckCarts[i].product.id,
                                        product_nm: ckCarts[i].product.product_nm,
                                        product_type: ckCarts[i].product.product_type,
                                        cnt: ckCarts[i].cnt,
                                        price: ckCarts[i].product.price,
                                        totalPrice: ckAddInfo.totalPrice,
                                        title_img: ckCarts[i].product.title_img,
                                        rgstr_id: user.user_id != 'null' ? user.user_id : 'system',
                                        rgstr_time: Time.getTimeString(),
                                        mdfr_id: user.user_id != 'null' ? user.user_id : 'system',
                                        mdfr_time: Time.getTimeString(),
                                    }
                                    axios.post( process.env.REACT_APP_SERVER_HOST_API + '/OrderDetails', ordersDetailParm)
                                        .catch(e => { console.log(e)})
                                }
                            }).then(res=>{
                            removeCookie("ckCarts" );
                            removeCookie("ckAddInfo" );

                            axios.get(process.env.REACT_APP_SERVER_HOST_API + '/Orders?id='+ordNo+'&_rel=details')
                                .then(res=>{
                                    let details = res.data[0].details
                                    if(loggedIn){
                                        details.forEach((detail:OrdersDetailParm) =>{
                                            axios.delete( process.env.REACT_APP_SERVER_HOST_API + "/Cart?product_id="+detail.product_id +"&user_id="+user.id ).catch(e => console.log(e))
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
                                }).then(res=>{
                                showModal({
                                    modalType: "AlertModal",
                                    modalProps: {
                                        message: "주문에 성공했습니다.",
                                        handleConfirm : arg => {
                                            navigate("/orderList")
                                        }
                                    }
                                })
                            })
                        })
                .catch((error) => {
                    console.log(error)
                });
        }else{
            showModal({
                modalType: "AlertModal",
                modalProps: {
                    message: "주문에 실패했습니다.",
                    handleConfirm : arg => {
                        navigate("/orderList")
                    }
                }
            });
        }
    }, [query]);

    return(
        <Container component="main" maxWidth="lg">
            결제중.
        </Container>
    )

}

export default Payment


