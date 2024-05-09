import React , {useState,useContext} from 'react';
import { LoginContext } from 'src/contexts/login'
import './home.css'

import FeaturedInfo from 'src/components/featuredInfo/FeaturedInfo'
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import useModal from "src/components/modal/hooks/useModal";
import axios from 'axios'
import { useEffect } from 'react';
import VisibilityIcon from "@mui/icons-material/Visibility";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Carousel from  "src/pages/home/Carousel";
import {ProductProps} from "src/pages/producrs/props/ProductProps";
import {useNavigate} from "react-router-dom";
import CardMedia from "@mui/material/CardMedia";
import Container from "@mui/material/Container";


export default function Home(){
  let navigate = useNavigate();   //페이지 이동을 위해필요.
  const { showModal } = useModal();
  const {loggedIn , user } = useContext(LoginContext);
  const [products , setProducts] = useState<ProductProps[]>([]);

  useEffect(()=>{
    fetchData();
  } , []);

  // API를 호출하는 부분
  const fetchData = () => {
    try {
        axios.get( process.env.REACT_APP_SERVER_HOST_API + '/Products' , {params : {use_yn: 'Y',_sort:'id',_order:'DESC',_limit: 5,_exceptcols : 'content'}})
            .then(response =>{
                setProducts(response.data);
            }).catch((error) =>  {
                console.log(error);
            })

    } catch (error) {
        console.log(error);
    }
  };


  return(
        <Container component="main" maxWidth="xs" sx={{textAlign:'center'}}>

            <p>
                <strong>
                    2018년 영농 후 계자로 출발한 저희 농장인 승현네는 귀농 후 고창군의 청정하고 아름다운 자연 속에서
                </strong>
            </p>
            <p>
                <strong>
                    수박, 메론, 블루베리, 청량고추 등 다양한 작물을 친환경 재배방식으로 정성껏 재배하고 있습니다.
                </strong>
            </p>



            <Carousel products={products}/>

        </Container>
    )
}
