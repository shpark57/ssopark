
import React, {useEffect, useState, useContext, ChangeEvent} from 'react';

import {ProductProps} from 'src/pages/producrs/props/ProductProps'
import 'src/pages/producrs/list/ProductBody.css'


import Container from '@mui/material/Container';

import Box from '@mui/material/Box';
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from '@mui/material/styles';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import {
    Button,
    CardActionArea,
    CardActions,
    FormControl,
    Grid,
    InputLabel,
    NativeSelect, Select,
    SelectChangeEvent
} from '@mui/material';
import axios from "axios";

import { useNavigate } from 'react-router-dom';
import {OrdersProps} from "../props/OrdersProps";
import {toDateStringDay} from "../../../types/time";
import {display} from "@mui/system";
import {OrdersDetailParm} from "../props/OrdersDetailParm";
import useModal from "../../../components/modal/hooks/useModal";
import {LoginContext} from "../../../contexts/login";
import * as Time from "../../../types/time";
import set = Reflect.set;

interface Interface {
    order : OrdersProps
}
const OrderBody  = (props:Interface) => {

    const {loggedIn , user } = useContext(LoginContext);
    const { showModal } = useModal();
    let navigate = useNavigate();   //페이지 이동을 위해필요.
    const theme = createTheme();
    const [order,setOrder] = useState<OrdersProps>(props.order)

    const goOrderView =  ()  => () => {
        navigate("/orderView" , {state : {
                order :  order
            }})
    }

    const handleChangeState = (event: React.ChangeEvent) => {
        // @ts-ignore
        let value = event.target.value




        showModal({
            modalType: "ConfirmModal",
            modalProps: {
                message: "주문상태를 변경하시겠습니까?",
                confirmText: "Yes",
                cancelText: "No",
                title: "",
                handleConfirm: () => {
                    let tmpOrder = Object.assign({...order} , {order_state: value})
                    setOrder(tmpOrder)
                    axios.patch(process.env.REACT_APP_SERVER_HOST_API + '/Orders/'+order.id, tmpOrder)
                        .then(res=>{console.log('주문상태 수정 성공')})
                        .catch(e=>{console.log(e)})


                    if(value == '배송중'){
                        console.log('배송 출발 메시지와 그에따른 이벤트가 필요.')
                    }


                },
                handleClose: () => {

                }
            }
        });
    };
    return (
        <CardActionArea>
            <Grid item xs={8} justifyContent="flex-start">
                <h4 style={{display:"inline"}}>{toDateStringDay(order.rgstr_time)}</h4>   <h5 style={{color : 'silver',display:"inline"}}> ㆍ 주문번호 : {order.id}</h5>
            </Grid>
                <Grid item xs={12}>
                    <h5 style={{display:"inline"}}>받는 사람: {order.recipient_name}</h5> ㆍ <h5 style={{display:"inline"}}>주문 상태: {order.order_state}</h5>
                    <FormControl sx={{float : "right"}}>
                        <InputLabel variant="standard" htmlFor="uncontrolled-native">
                            주문상태
                        </InputLabel>
                        <NativeSelect
                            sx={{fontSize: '12px'}}
                            value={order.order_state}
                            onChange={handleChangeState}
                        >
                            <option value={'결제대기'} >결제대기</option>
                            <option value={'결제성공'} >결제성공</option>
                            <option value={'배송중'}  >배송중</option>
                            <option value={'거래완료'} >거래완료</option>
                            <option value={'환불신청'} >환불신청</option>
                            <option value={'환불완료'} >환불완료</option>
                        </NativeSelect>
                    </FormControl>

                </Grid>
                {order.details.map((detail,index)=>{
                    return(
                        <Grid  key ={index} sx={{ mt: -4}}  >
                            <CardContent >

                                <Grid  container spacing={2} sx={{ mt: 2}}>
                                    <Grid item xs={4} sm={4}>
                                        <Typography variant="h6" color="red" align="left" >
                                            <CardMedia
                                                onClick={goOrderView()}
                                                component="img"
                                                image={detail.title_img}
                                                style={{
                                                    left : '0'
                                                    ,right : '0'
                                                    ,margin: '10px auto'
                                                }}
                                                sx={{height : 100 , objectFit: 'scale-down'}}
                                            />


                                        </Typography>
                                    </Grid>
                                    <Grid item xs={8} sm = {8} sx={{ mt: 2}}>
                                        <h4>{detail.product_nm}</h4>
                                        <h4> {detail.price.toLocaleString('ko-KR')+'원'}  {detail.cnt} 개</h4>

                                    </Grid>

                                </Grid>
                            </CardContent>
                        </Grid>
                    )
                })}

        </CardActionArea>
    )
} 
export default OrderBody