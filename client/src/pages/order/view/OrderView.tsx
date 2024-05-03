

import axios from 'axios';
import React, {useEffect, useState, useContext, useRef, Fragment} from 'react';
import {useParams, useNavigate, useLocation} from 'react-router-dom';
import ReactPlayer from 'react-player/lazy';    //비디오플레이어
import Plyr from 'react-plyr';
import './OrderView.css'
import Button from '@mui/material/Button';

import * as Time from 'src/types/time'

import {Container, Grid, Box, TextField, CardActionArea} from '@mui/material';
import { LoginContext } from 'src/contexts/login'
import useModal from "src/components/modal/hooks/useModal";
import DeleteIcon from '@mui/icons-material/Delete';

import CommentComponent from 'src/components/comment/CommentComponent'


import {ProductProps} from 'src/pages/producrs/props/ProductProps'
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import TuiViewer from "src/components//Tui/TuiViewer";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import {Editor} from "@toast-ui/react-editor";
import EditIcon from '@mui/icons-material/Edit';

// @ts-ignore
import Session from 'react-session-api';
import UserModify from "../../user/modify/UserModify";
import OrderAdd from "src/pages/order/add/OrderAdd";
import {getCookie, setCookie} from "../../../types/cookie";
import {toDateString, toDateStringDay} from "src/types/time";
import {OrdersProps} from "../props/OrdersProps";
import {OrdersDetailParm} from "../props/OrdersDetailParm";



interface type{
    state : {
        order : OrdersProps
    }
}
const OrderView = () =>{
    const { state } = useLocation() as type;	// 2번 라인
    const { order } = state;	// 3번 라인

    const {id} = useParams();
    const { loggedIn , user } = useContext(LoginContext);
    const { showModal } = useModal();

    let navigate = useNavigate();   //페이지 이동을 위해필요.

    const goProductsView =  (detail:OrdersDetailParm)  => () => {
        axios.get( process.env.REACT_APP_SERVER_HOST_API + '/Products/'+detail.product_id)
            .then(res=>{
                if(res.data != ''){
                    axios.patch( process.env.REACT_APP_SERVER_HOST_API + '/Products/'+detail.product_id ,{'visits++' : 1})
                        .then(res=>{
                            navigate(String("/ProductsView/"+ detail.product_id))
                        })
                }else{
                    showModal({
                        modalType: "AlertModal",
                        modalProps: {
                            message: "삭제된 상품입니다."
                        }
                    });
                }
            }).catch(e=>{ console.log(e)})


    }

    return (
        <Container component="main" maxWidth="lg" className='product' sx={{ mb: 8}} >
            <Grid>
                <Grid item xs={12} justifyContent="flex-start">
                    <h2 style={{display:"inline"}}> {order.order_title} </h2>  <h5 style={{display:"inline"}}>{toDateString(order.rgstr_time)}</h5>   <h6 style={{color : 'silver',display:"inline"}}> ㆍ 주문번호 : {order.id}</h6>
                </Grid>
                {order.details.map((detail,index)=>{
                    return(
                        <CardActionArea  key ={index} sx={{ mt: -4}}   onClick={goProductsView(detail)}>
                            <CardContent >
                                <Grid  container spacing={2} sx={{ mt: 2}}>
                                    <Grid item xs={4} sm={2}>
                                        <Typography variant="h6" color="red" align="left" >
                                            <CardMedia
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
                                    <Grid item xs={8} sm = {10} sx={{ mt: 2}}>
                                        {detail.product_nm}
                                        <br/>
                                        {detail.price.toLocaleString('ko-KR')+'원'}  {detail.cnt} 개
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </CardActionArea>
                    )
                })}


            </Grid>
            <Grid container spacing={4}>
                <Grid item xs={12} sm = {12} sx={{ mb: -4}}>
                    <h4>받는사람 정보</h4>
                </Grid>
                <Grid item xs={4} sm = {2} >
                    이름 :
                </Grid>
                <Grid item xs={8} sm = {4} >
                    {order.recipient_name}
                </Grid>
                <Grid item xs={4} sm = {2} >
                   휴대번호 :
                </Grid>
                <Grid item xs={8} sm = {4} >
                    {order.recipient_phone_number}
                </Grid>
                <Grid item xs={3} sm = {2} >
                    주소 :
                </Grid>
                <Grid item xs={9} sm = {10} >
                    [{order.zipNo}]  {order.addr} {order.addrDetail}
                </Grid>
                <Grid item xs={4} sm = {2} >
                    주문 상태 :
                </Grid>
                <Grid item xs={8} sm = {4} >
                    {order.order_state}
                </Grid>
                <Grid item xs={4} sm = {2} >
                    총 결제금액 :
                </Grid>
                <Grid item xs={8} sm = {4} >
                    {order.order_price.toLocaleString('ko-KR')+'원'}
                </Grid>

            </Grid>
        </Container>
    )
}

export default OrderView;