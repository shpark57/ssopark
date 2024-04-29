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
import {getCookie, setCookie} from "../../types/cookie";
import {CartProps} from "../cart/props/CartProps";
import {OrdersDetailParm} from "../order/props/OrdersDetailParm";

const Payment = () => {

    const {loggedIn , user } = useContext(LoginContext);
    const { showModal } = useModal();
    let navigate = useNavigate();   //페이지 이동을 위해필요.
    const [query, setQuery]  = useSearchParams();
    useEffect(() => {
        if(query.get('imp_uid') && query.get('merchant_uid') && query.get('imp_success')) {
            // 결제 후 리디렉션 url로 이동이 되었을 경우
            // ... 쿼리스트링으로 받은 데이터를 가지고 핸들링
            axios.patch(process.env.REACT_APP_SERVER_HOST_API + '/Orders/'+query.get('merchant_uid') ,{ 'order_state' : '결제완료'})
                .then(res=>{
                        axios.get(process.env.REACT_APP_SERVER_HOST_API + '/Orders?id='+query.get('merchant_uid')+'&_rel=details')
                            .then(res=>{
                                let details = res.data[0].details
                                if(loggedIn){
                                    details.forEach((detail:OrdersDetailParm) =>{
                                        axios.delete( process.env.REACT_APP_SERVER_HOST_API + "/Cart?product_id="+detail.product_id +"&user_id="+user.id ).catch(e => console.log(e))
                                    })
                                }else {
                                    let cookieCartList =   getCookie("cookieCartList")
                                    let tmpArr:CartProps[] = []

                                    cookieCartList.forEach((cart: CartProps) =>{
                                        let index = details.findIndex((detail:OrdersDetailParm) => detail.product_id  === cart.product.id  )
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
                                        navigate(String("/carts"))
                                    }
                                }
                            });
                        })


                }).catch(e=>{console.log(e)})

        }else{
            axios.delete(process.env.REACT_APP_SERVER_HOST_API + '/OrderDetails?order_id='+query.get('merchant_uid'))
                .then(res=>{
                    axios.delete(process.env.REACT_APP_SERVER_HOST_API + '/Order?id='+query.get('merchant_uid'))
                        .then(res=>{
                            showModal({
                                modalType: "AlertModal",
                                modalProps: {
                                    message: "주문에 실패했습니다.",
                                    handleConfirm : arg => {
                                        navigate(String("/carts"))
                                    }
                                }
                            });
                        }).catch(e=>{console.log(e)})
                }).catch(e=>{console.log(e)})
        }
    }, [query]);

    return(
        <Container component="main" maxWidth="lg">
            결제중.
        </Container>
    )

}

export default Payment


