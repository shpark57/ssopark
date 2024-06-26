import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import React from "react";
import {CommentBodyProp} from "../comment/CommentComponent";

import {NextTo,Prev} from './Arrow'
import {useNavigate} from "react-router-dom";
import axios from "axios";

import {ProductProps} from "src/pages/producrs/props/ProductProps";
import CardMedia from "@mui/material/CardMedia";
import {CardActionArea} from "@mui/material";

const Carousel:React.FC<{products:ProductProps[]}> = (props) => {

    let navigate = useNavigate();   //페이지 이동을 위해필요.
    const goProductsView = async (e : React.MouseEvent<HTMLSpanElement>) => {
        if(!(e.target instanceof HTMLImageElement)){
            return;
        }
        const id = e.target.dataset.id


        await axios.patch( process.env.REACT_APP_SERVER_HOST_API + '/Products/'+id ,{'visits++' : 1})
        navigate(String("/ProductsView/"+ id))
    }



    const settings = {
        dots : true,
        infinite  : true,
        speed : 500,
        arrows : true,
        centerMode: false, // 현재 컨텐츠 가운데 정렬
        nextArrow:  (<NextTo />),
        prevArrow: (<Prev />)
    }
    return(
            <Slider {...settings}>

                {
                    props.products.map((product,index , array) => {
                        return (

                                <CardMedia
                                    component="img"
                                    onClick={goProductsView}
                                    data-id={product.id}
                                    image={product.title_img}
                                    style={{
                                        left : '0'
                                        ,right : '0'
                                        ,margin: '10px auto'
                                    }}
                                    sx={{height : 300}}
                                />

                    )
                    })
                }

            </Slider>
    )
}
export default Carousel;