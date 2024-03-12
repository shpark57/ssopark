
import React, { useEffect, useState ,useContext} from 'react';

import {ProductProps} from 'src/pages/producrs/list/ProductProps'
import 'src/pages/producrs/list/ProductBody.css'


import Container from '@mui/material/Container';

import Box from '@mui/material/Box';
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from '@mui/material/styles';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
const ProductBody:React.FC<ProductProps> = (props) => {

    const theme = createTheme();

    return (

    <Card sx={{  marginTop: 5}}>
        <CardActionArea >
            <CardMedia
                component="img"
                image="https://www.kindacode.com/wp-content/uploads/2021/06/cute-dog.jpeg"
                alt="green iguana"
                
            />
            <CardContent >
                <Typography gutterBottom variant="h5" component="div">
                    {props.product_nm}
                </Typography>
                <Typography variant="h6" color="red">
                    {props.price.toLocaleString('ko-KR')} 원
                </Typography>


                <Typography  variant="h6" textAlign ="right" >
                    남은 개수 : {props.count}
                </Typography>
            </CardContent>
        </CardActionArea>
    </Card>

    )
} 
export default ProductBody