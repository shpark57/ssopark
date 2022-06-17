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

    const handleClickgGetTest = () => {
      axios.post("/password/check",{user_id:'shpark8381',password:'123qwe!@#'}).then((res) => console.log(res.data)) 
    };

    const handleClickgPostTest = () => {
      axios.get("/menu").then((res) => console.log(res.data)) 
    };

    const handleClickgPutTest = () => {
      let params = {query : 'SELECT * FROM users'}
      axios.post("/query" , {params}).then((res) => console.log(res))
    };

    const handleClickgPatchTest = () => {
      axios.patch("/api").then((res) => console.log(alert(res.data.id)))
    };
    const handleClickgDeleteTest = () => {
      axios.delete("/users").then((res) =>  console.log(res))
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
            >Rest Query TEST</Button>
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
