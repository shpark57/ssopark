import React , {useState,useContext} from 'react';
import { LoginContext } from 'src/contexts/login'
import './home.css'

import FeaturedInfo from 'src/components/featuredInfo/FeaturedInfo'
import WidgetSm from 'src/components/widgetSm/WidgetSm'
import WidgetLg from 'src/components/widgetLg/WidgetLg'
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import useModal from "src/components/modal/hooks/useModal";
import axios from 'axios'
import { useEffect } from 'react';
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
            <FeaturedInfo/>

            <div className='homeWidgets'>
                <WidgetSm/>
                <WidgetLg/>
                
            </div>
            <Button 
                variant="contained" 
                sx={{  mr: 3, ml: 3  }}
                onClick={handleClickAlertModal}
            >Alert</Button>
            <Button 
                variant="contained" 
                sx={{  mr: 3, ml: 3  }}
                onClick={handleClickConfirmModal}
            >Confirm</Button>
            <Button 
                variant="contained" 
                sx={{  mr: 3, ml: 3  }}
                onClick={handleClickDefaultModal}
            >Default</Button>
            <Button 
                variant="contained" 
                sx={{  mr: 3, ml: 3  }}
                onClick={handleClickTest1}
            >Test1</Button>
            <Button 
                variant="contained" 
                sx={{  mr: 3, ml: 3  }}
                onClick={handleClickTest2}
            >Test2</Button>
            <Button 
                variant="contained" 
                sx={{  mr: 3, ml: 3  }}
                onClick={handleClickTest3}
            >Test3</Button>
            <Button 
                variant="contained" 
                sx={{  mr: 3, ml: 3  }}
                onClick={handleClickTest4}
            >Test4</Button>
            <Button 
                variant="contained" 
                sx={{  mr: 3, ml: 3  }}
                onClick={handleClickTest5}
            >Test5</Button>
        </div>
    )
}
