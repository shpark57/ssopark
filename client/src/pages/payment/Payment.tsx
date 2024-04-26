import axios from 'axios';
import React, { useEffect, useState ,useContext} from 'react';
import { useParams ,useNavigate} from 'react-router-dom';
import Button from '@mui/material/Button';
import * as Time from 'src/types/time'
import {Container , Grid, Box , TextField} from '@mui/material';
import { LoginContext } from 'src/contexts/login'
import useModal from "src/components/modal/hooks/useModal";
import DeleteIcon from '@mui/icons-material/Delete';


import CommentComponent from 'src/components/comment/CommentComponent';

const Payment = () => {
    const {query} = useParams();

    useEffect(() => {
<<<<<<< HEAD
        /*
=======

        // @ts-ignore
>>>>>>> c52a42c (no message)
        const { imp_uid , merchant_uid , imp_success } = query;
        if(imp_uid && merchant_uid && imp_success) {
            // 결제 후 리디렉션 url로 이동이 되었을 경우
            // ... 쿼리스트링으로 받은 데이터를 가지고 핸들링
<<<<<<< HEAD
        };
         */

        console.log(query)
    }, [query]);

    return(
        <div></div>
=======

            axios.patch(process.env.REACT_APP_SERVER_HOST_API + '/Orders/id='+merchant_uid ,{ 'order_state' : '결제성공'})
                .then(res=>{
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
        }else{
            axios.delete(process.env.REACT_APP_SERVER_HOST_API + '/OrderDetails?order_id='+merchant_uid)
                .then(res=>{
                    axios.delete(process.env.REACT_APP_SERVER_HOST_API + '/Order?id='+merchant_uid)
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
>>>>>>> c52a42c (no message)
    )

}

<<<<<<< HEAD
export default Payment
=======
export default Payment


>>>>>>> c52a42c (no message)
