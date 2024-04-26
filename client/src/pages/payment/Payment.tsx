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

const Payment = () => {
   alert("결과가 와야해..")

    const { showModal } = useModal();
    let navigate = useNavigate();   //페이지 이동을 위해필요.
    const [query, setQuery]  = useSearchParams();
    useEffect(() => {
        console.log("?")
        if(query.get('imp_uid') && query.get('merchant_uid') && query.get('imp_success')) {
            // 결제 후 리디렉션 url로 이동이 되었을 경우
            // ... 쿼리스트링으로 받은 데이터를 가지고 핸들링
            alert("결제변경 갑니다.")

            axios.patch(process.env.REACT_APP_SERVER_HOST_API + '/Orders/'+query.get('merchant_uid') ,{ 'order_state' : '결제성공'})
                .then(res=>{

                    alert("주문도성공")
                    showModal({
                        modalType: "AlertModal",
                        modalProps: {
                            message: "주문에 성공했습니다.",
                            handleConfirm : arg => {
 /* 장바구니 삭제 로직
     let cartLocalStorage = window.localStorage;
    let localCartList =  cartLocalStorage.getItem("localCartList")
    if(localCartList){
      let cartList = JSON.parse(localCartList)
      for(let i in props.carts){
        cartList = cartList.filter((obj:CartProps , index:number) => obj['product_id'] !== props.carts[i].product_id )
      }
      cartLocalStorage.setItem("localCartList",JSON.stringify(cartList))
    }                               
  */
                                navigate(String("/carts"))
                            }
                        }
                    });
                })
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
            테스트
        </Container>
    )

}

export default Payment


