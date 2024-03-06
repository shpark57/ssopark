import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import React from "react";
import {CommentBodyProp} from "../comment/CommentComponent";

import {NextTo,Prev} from './Arrow'


const Carousel:React.FC<{urls:string[]}> = (props) => {


    const settings = {
        dots : true,
        infinite  : true,
        speed : 500,
        arrows : true,
        centerMode: true, // 현재 컨텐츠 가운데 정렬
        nextArrow:  (<NextTo />),
        prevArrow: (<Prev />)
    }
    return(
            <Slider {...settings}>

                {
                    props.urls.map((url,index , array) => {
                        return (
                                <img  key={index} src={url}  />
                        )
                    })
                }

            </Slider>
    )
}
export default Carousel;