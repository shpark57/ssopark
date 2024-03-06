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

import Carousel from  "src/components/carousel/Carousel";


export default function Home(){


  const {loggedIn , user } = useContext(LoginContext);
    const { showModal } = useModal();   
    const handleClickAlertModal = () => {
      showModal({
        modalType: "AlertModal",
        modalProps: {
          message: "Success!"
        }
      });
    };
  
    const handleClickConfirmModal = () => {
      showModal({
        modalType: "ConfirmModal",
        modalProps: {
          message: "Yes or No",
          confirmText: "Yes",
          cancelText: "No",
          title: "",
          handleConfirm: () => {
            alert("YES!")
          },
          handleClose: () => {
            alert("NO!")
          }
        }
      });
    };
  
    const handleClickDefaultModal = () => {
      showModal({
        modalType: "ConfirmModal",
        modalProps: {
          message: "Yes or No",
          confirmText: "Yes",
          cancelText: "No",
          title: "",
          handleConfirm: () => {
            alert("YES!")
          },
          handleClose: () => {
            alert("NO!")
          }
        }
      });
    };


    const handleClickTest1 = () => {
      axios.post("/password/check",{user_id:'shpark8381',password:'123qwe!@#'}).then((res) => console.log(res.data)) 
    };

    const handleClickTest2 = () => {
      axios.get("/Menu").then((res) => console.log(res.data)) 
    };

    const handleClickTest3 = () => {
      axios.patch("/Movies/1" , {dis_like : 1 , like : 3}).then((res) => console.log(res))
    };

    const handleClickTest4 = () => {
      axios.get("/Files?parent_id=1&type=Movies")
      .then((res) =>  {
        console.log("영화의 파일조회") 
        console.log(res)
      })  //대댓글 조회
    };
    const handleClickTest5 = () => {
      axios.get("/Comment?parent_id=1&_rel=children&parent_comment_id=null&type=Movies")
      .then((res) =>  {
        console.log("댓글조회") 
        console.log(res)
      })  //대댓글 조회
    };


    return(
        <div className='home'>
            <div className='homeWidgets'>
                <div className="homeCard">
                    <img src="https://www.kindacode.com/wp-content/uploads/2021/06/cute-dog.jpeg" />

                </div>
            </div>


          <div className='homeWidgets'>
                <div className="homeCard" >
                  <Carousel urls={["https://www.kindacode.com/wp-content/uploads/2021/06/cute-dog.jpeg","https://www.kindacode.com/wp-content/uploads/2021/06/cute-dog.jpeg","https://www.kindacode.com/wp-content/uploads/2021/06/cute-dog.jpeg","https://www.kindacode.com/wp-content/uploads/2021/06/cute-dog.jpeg","https://www.kindacode.com/wp-content/uploads/2021/06/cute-dog.jpeg"]}/>
                </div>
            </div>
        </div>
    )
}
