
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


const ProductBody:React.FC<ProductProps> = (props) => {

    const theme = createTheme();
    const [productUrl ,setProductUrl ] = useState('')
    const getImgUrl = () =>{
        axios.get('/Files?parent_id='+ props.id +'&type=Products&type_detail=poto&_limit=1')
            .then(res=>{
                setProductUrl('/fileService/read/'+res.data[0].id)
            })
    }
    useEffect(() => {
        getImgUrl()
    },[0])

    return (

        <CardActionArea>
                <CardMedia
                    component="img"
                    image={productUrl}
                    alt="green iguana"
                    style={{
                        left : '0'
                        ,right : '0'
                        ,margin: '10px auto'
                    }}
                    sx={{height : 300}}
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
                            남은 개수 : {props.count}
                        </Typography>
                    </Grid>
                </Grid>

            </CardContent>
        </CardActionArea>
    )
} 
export default ProductBody