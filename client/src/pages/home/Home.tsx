import React from 'react'
import './home.css'

import FeaturedInfo from 'src/components/featuredInfo/FeaturedInfo'
import WidgetSm from 'src/components/widgetSm/WidgetSm'
import WidgetLg from 'src/components/widgetLg/WidgetLg'
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import useModal from "src/components/modal/hooks/useModal";

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
        </div>
    )
}