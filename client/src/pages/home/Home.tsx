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


    const test = async () => {
        const param = {
            "key" :  "7b035420e12cc0e8ec83b7540f668cfe"
            ,"tel" : "01050348381"
            ,"cb" : "01090293089"
            ,"msg" : "테스트 메시지"
            ,"title" : "테스트 제목"
        }
        var test = await axios.post(process.env.REACT_APP_SERVER_HOST_API + "/sendsms"  , param)
        console.log(test)

    };

    return(
        <Container component="main" maxWidth="xs" sx={{textAlign:'center'}}>
            <button onClick={test}> test </button>
            <div style={{
                backgroundImage: `url(${process.env.PUBLIC_URL}/images/introduction_3.jpg)`,
                backgroundSize: '100%',
                height: '320px',
                backgroundRepeat: 'no-repeat',
                marginBottom: '30px',
                position: 'relative' /* 내부 요소의 위치를 설정하기 위해 부모 요소에 상대적 위치를 지정합니다. */
            }}>
                <div style={{
                    position: 'absolute', /* 내부 요소를 부모 요소에 대해 절대적으로 위치시킵니다. */
                    top: '50%', /* 위쪽 여백을 50%로 설정하여 요소를 수직으로 가운데로 이동시킵니다. */
                    left: '50%', /* 왼쪽 여백을 50%로 설정하여 요소를 수평으로 가운데로 이동시킵니다. */
                    transform: 'translate(-50%, -50%)', /* 수평 및 수직 이동을 위해 요소를 자체 크기의 반만큼 이동시킵니다. */
                    textAlign: 'center', /* 텍스트를 수평으로 가운데로 정렬합니다. */
                    backgroundColor: 'rgba(255, 255, 255, 0.7)', /* 배경 색상과 투명도를 지정합니다. */
                    padding: '10px', /* 내부 여백을 추가합니다. */
                    width: '90%'
                }}>

                    <strong>
                        <p> 2018년 영농 후계자로 출발한  </p>
                        <p> 농장인 승현네는 귀농 후 고창군의 </p>
                        <p> 청정하고 아름다운 자연 속에서 </p>
                        <p> 수박, 메론, 블루베리, 청량고추 등  </p>
                        <p> 다양한 작물을 친환경 재배방식으로 </p>
                        <p> 정성껏 재배하고 있습니다. </p>

                    </strong>
                </div>
            </div>

            <Carousel products={products}/>
        </Container>
    )
}
