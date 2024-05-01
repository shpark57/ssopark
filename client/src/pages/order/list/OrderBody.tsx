
import React, { useEffect, useState ,useContext} from 'react';

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
import {Button, CardActionArea, CardActions, Grid} from '@mui/material';
import axios from "axios";

import { useNavigate } from 'react-router-dom';
import {OrdersProps} from "../props/OrdersProps";
import {toDateStringDay} from "../../../types/time";
import {display} from "@mui/system";
import {OrdersDetailParm} from "../props/OrdersDetailParm";
import useModal from "../../../components/modal/hooks/useModal";

interface Interface {
    order : OrdersProps
}
const OrderBody  = (props:Interface) => {

    const { showModal } = useModal();
    let navigate = useNavigate();   //페이지 이동을 위해필요.
    const theme = createTheme();

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
        <Grid>
            <Grid item xs={8} justifyContent="flex-start">
                <h5 style={{display:"inline"}}>{toDateStringDay(props.order.rgstr_time)}</h5>   <h6 style={{color : 'silver',display:"inline"}}> ㆍ 주문번호 : {props.order.id}</h6>
            </Grid>
                {props.order.details.map((detail,index)=>{
                    return(
                        <CardActionArea  key ={index} sx={{ mt: -4}}  onClick={goProductsView(detail)}>
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
    )
} 
export default OrderBody