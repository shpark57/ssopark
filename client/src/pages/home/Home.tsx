import React from 'react'
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


    //import useModal from "src/components/modal/hooks/useModal";
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

    const handleClickgGetTest = () => {
      axios.get("/users?username=다이&id=shpark8381&_limit=20&_sort=id&_order=DESC").then((res) => console.log(res))
    };

    const handleClickgPostTest = () => {
      axios.get("/users/shpark").then((res) => console.log(res))
    };

    const handleClickgPutTest = () => {
      axios.get("/users").then((res) => console.log(res))
    };

    const handleClickgPatchTest = () => {
      axios.patch("/api").then((res) => console.log(alert(res.data.id)))
    };
    const handleClickgDeleteTest = () => {
      axios.delete("/api").then((res) => console.log(alert(res.data.id)))
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
                onClick={handleClickgGetTest}
            >Rest GET TEST</Button>
            <Button 
                variant="contained" 
                sx={{  mr: 3, ml: 3  }}
                onClick={handleClickgPostTest}
            >Rest POST TEST</Button>
            <Button 
                variant="contained" 
                sx={{  mr: 3, ml: 3  }}
                onClick={handleClickgPutTest}
            >Rest PUT TEST</Button>
            <Button 
                variant="contained" 
                sx={{  mr: 3, ml: 3  }}
                onClick={handleClickgPatchTest}
            >Rest PATCH TEST</Button>
            <Button 
                variant="contained" 
                sx={{  mr: 3, ml: 3  }}
                onClick={handleClickgDeleteTest}
            >Rest DELETE TEST</Button>
        </div>
    )
}
