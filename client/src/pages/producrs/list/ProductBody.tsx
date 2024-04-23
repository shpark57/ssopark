
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

const ProductBody:React.FC<ProductProps> = (props) => {

    let navigate = useNavigate();   //페이지 이동을 위해필요.
    const theme = createTheme();
    const goProductsView = async (e : React.MouseEvent<HTMLSpanElement>) => {
        if(!(e.target instanceof HTMLImageElement)){
            return;
        }
        window.scrollTo(0,0)
        const id = e.target.dataset.id


        await axios.patch( '/Products/'+id ,{'visits++' : 1})
        navigate(String("/ProductsView/"+ id))
    }



    return (

        <CardActionArea  >
                <CardMedia
                    component="img"
                    onClick={goProductsView}
                    data-id={props.id}
                    image={props.title_img}
                    alt="green iguana"
                    style={{
                        left : '0'
                        ,right : '0'
                        ,margin: '10px auto'
                    }}
                    sx={{height : 300 , objectFit: 'scale-down'}}
                />

            <CardContent >
                <Typography gutterBottom variant="h5" >
                    {props.product_nm}
                </Typography>

                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <Typography variant="h6" color="red" align="left" >
                            {props.price.toLocaleString('ko-KR')} 원
                        </Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography  variant="h6" align ="right" >
                            남은 개수 : {props.cnt}
                        </Typography>
                    </Grid>
                </Grid>

            </CardContent>
        </CardActionArea>
    )
} 
export default ProductBody