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
            <CardMedia
                component="img"
                image="https://www.kindacode.com/wp-content/uploads/2021/06/cute-dog.jpeg"
                style={{
                    margin: '10px auto'
                }}
                sx={{height : 200 , objectFit: 'scale-down'}}
            />

            <Carousel products={products}/>

        </Container>
    )
}
