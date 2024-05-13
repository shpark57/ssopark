import React , {useState,useContext} from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { LoginContext } from 'src/contexts/login'

import * as Time from 'src/types/time'
import axios from 'axios';

import crypto from 'crypto'

import useModal from "src/components/modal/hooks/useModal";
import {FormControl, InputLabel, NativeSelect} from "@mui/material";
import {OrdersProps} from "../../props/OrdersProps";


type CicpProp = {
  order : OrdersProps;
  setParentOrder : any;
};

const Cicp:React.FC<CicpProp> = (props) => {


  const { loggedIn , user } = useContext(LoginContext);
  const { showModal,hideModal } = useModal();
  const [order,setOrder] = useState<OrdersProps>(props.order)
  const [valCourier_company , setValCourier_company] = useState("로젠택배")
  const [valInvoice_number , setValInvoice_number] = useState("")

  function setParentOrder(tmpOrder : OrdersProps){
    props.setParentOrder(tmpOrder)
  }

  const handleChangeCourier_company = (event: React.ChangeEvent) =>{
    // @ts-ignore
    let value = event.target.value
    setValCourier_company(value)

  }

  const handleChangeInvoice_number = (event: React.ChangeEvent) =>{
    // @ts-ignore
    let value = event.target.value
    setValInvoice_number(value)
  }

  const handleClickYes =() => {

    if(valInvoice_number == ''){
      alert("송장번호를 입력해주세요")
      return;
    }
    let tmpOrder = Object.assign({...order} , {order_state: '배송중' ,courier_company : valCourier_company  , invoice_number : valInvoice_number , mdfr_id : user.user_id , mdfr_time : Time.getTimeString()})
    setOrder(tmpOrder)
    setParentOrder(tmpOrder)
    axios.patch(process.env.REACT_APP_SERVER_HOST_API + '/Orders/'+order.id, tmpOrder)
        .then(res=>{console.log('주문상태 수정 성공')})
        .then(res=>{
          hideModal()
        })
        .catch(e=>{console.log(e)})
  }


  const handleClickNo =() => {
    hideModal()
  }

  return (
      <Container component="main" maxWidth="xs">
        <Grid  container spacing={2} >
          <Grid item xs={12}>
            주문상태를 변경하시겠습니까?
          </Grid>
          <Grid item xs={4}  sm={4}>
            <FormControl>
              <InputLabel variant="standard" htmlFor="uncontrolled-native">
                택배사
              </InputLabel>
              <NativeSelect
                  sx={{fontSize: '12px'}}
                  value={valCourier_company}
                  onChange={handleChangeCourier_company}
              >
                <option value={'로젠택배'} >로젠택배</option>
                <option value={'우체국택배'} >우체국택배</option>
              </NativeSelect>
            </FormControl>
          </Grid>
          <Grid item xs={8}  sm={8}>
            <TextField
                required
                id="invoice_number"
                label="송장번호"
                name="invoice_number"
                value ={valInvoice_number}
                onChange={handleChangeInvoice_number}
            />
          </Grid>
          <Grid item xs={12}>
            <Button sx ={{float : 'right'}} onClick={handleClickYes}>YES</Button>
            <Button sx ={{float : 'right'}} onClick={handleClickNo}>NO</Button>
          </Grid>
        </Grid>
      </Container>
  );
}

export default Cicp;