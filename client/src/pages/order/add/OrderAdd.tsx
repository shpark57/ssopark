
import React, {useState, useEffect, useContext, useCallback, useRef, ChangeEvent} from 'react';
import { LoginContext } from 'src/contexts/login'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import * as Time from 'src/types/time'

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

import FileUpload from 'src/components/fileUpload/FileUpload';
import useModal from "src/components/modal/hooks/useModal";

import Loading from 'src/components/loding/Loding';

import {OrdersDetailParm} from '../props/OrdersDetailParm'

import './OrderAdd.css'


import '@toast-ui/editor/dist/toastui-editor.css';
import {Editor,  EditorProps} from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/i18n/ko-kr';
import CardMedia from "@mui/material/CardMedia";
import {CardActionArea, Divider, List, ListItem, ListItemText, Radio, RadioGroup} from "@mui/material";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CommentComponent from "../../../components/comment/CommentComponent";
import EditIcon from "@mui/icons-material/Edit";
import {createTheme} from "@mui/material/styles";
import {ProductProps} from "src/pages/producrs/props/ProductProps"
import {IAddr} from "../../../types/iddr";

import {CartProps} from "src/pages/cart/props/CartProps"
import FormControlLabel from "@mui/material/FormControlLabel";

const theme = createTheme();

interface type{
  product? : ProductProps
  orderCnt? : number
  totalPrice? : number
}

const OrderAdd:React.FC<type> = (props) => {


  const { showModal } = useModal();

  const {loggedIn , user } = useContext(LoginContext);

  const [name, setName] = React.useState("");
  const [phone_number, setPhone_number] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [recipient_name, setRecipient_name] = React.useState("");
  const [recipient_phone_number, setRecipient_phone_number] = React.useState("");
  const [recipient_email, setRecipient_email] = React.useState("");
  const [addr , setAddr ] = React.useState("");
  const [addrDetail , setAddrDetail ] = React.useState("");
  const [zipNo , setZipNo ] = React.useState("");


  const initData = () => {
    if(props.product){
      //단건 구매

      // @ts-ignore
      document.getElementById("name").value = user.user_name
      // @ts-ignore
      document.getElementById("phone_number").value = user.phone_number
      // @ts-ignore
      document.getElementById("email").value = user.email

      // @ts-ignore
      document.getElementById("recipient_name").value = user.user_name
      // @ts-ignore
      document.getElementById("recipient_phone_number").value = user.phone_number
      // @ts-ignore
      document.getElementById("recipient_email").value = user.email

      setAddr(user.addr)
      setAddrDetail(user.addrDetail)
      setZipNo(user.zipNo)
    if(loggedIn){
      //로그인 일경우 기본정보 세팅 해주고 변경 readonly
    }else{
      //비로그인 시 입력 가능하게
    }



    }
    
  }


  useEffect(() => {
    initData()
  },[0])


  const handleAddrDetail = (event: ChangeEvent<HTMLInputElement>) => {
    setAddrDetail(event.target.value);
  };

  const onClickAddr = (event: React.MouseEvent<HTMLInputElement>) => {
    new window.daum.Postcode({
      oncomplete: function (data: IAddr) {
        document.getElementById('addrDetail')?.focus();
        setAddr(data.address)
        setZipNo(data.zonecode)
      }
    }).open();
  };



  const [PG, setPG] = React.useState('html5_inicis');
  const [payMethod, setPayMethod] = React.useState('card');
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let value = (event.target as HTMLInputElement).value
    setPG((event.target as HTMLInputElement).value);

    if(value == 'html5_inicis'){
      setPayMethod('card')
    }else if(value == 'kakaopay'){
      setPayMethod('card')
    }
  };


  const onClickPayment = () => {

    const { IMP }:any = window;
    IMP.init(`${process.env.REACT_APP_IMP}`);

    const data = {
      pg: PG, // PG사
      pay_method: payMethod, // 결제수단
      merchant_uid: props.product?.id + '_' +Time.getTimeString(), // 주문번호
      amount: props.totalPrice, // 결제금액
      name: props.product?.product_nm, // 주문명
      buyer_name: user.user_name, // 구매자 이름
      buyer_tel: user.phone_number, // 구매자 전화번호
      buyer_email: user.email, // 구매자 이메일
      buyer_addr: user.addr + ' ' +user.addrDetail, // 구매자 주소
      buyer_postcode: user.zipNo, // 구매자 우편번호
    };
    IMP.request_pay(data, callback);


  };
  const callback = (response:any) => {
    const { success, error_msg } = response;
    if (success) {

      // @ts-ignore
      let recipient_name = document.getElementById("recipient_name").value
      // @ts-ignore
      let recipient_phone_number = document.getElementById("recipient_phone_number").value

      if(loggedIn){
        let ordersParm = {
          user_id : user.id,
          order_date : Time.getTimeString(),
          order_state : '결제완료',
          order_title : props.product? props.product.product_nm : '',
          order_price : props.totalPrice,  //배송비 무료
          rgstr_id : user.user_id,
          rgstr_time : Time.getTimeString(),
          mdfr_id : user.user_id,
          mdfr_time : Time.getTimeString(),
          addr : addr,
          addrDetail : addrDetail,
          zipNo : zipNo,
          recipient_name : recipient_name,
          recipient_phone_number : recipient_phone_number
        }
        axios.post('/Orders' , ordersParm)
            .then(res=>{
              let ordersDetailParm = {
                order_id : res.data.id,
                product_nm : props.product?.product_nm,
                product_type : props.product?.product_type,
                cnt : props.orderCnt,
                price : props.product?.price,
                totalPrice : props.totalPrice,
                title_img : props.product?.title_img,
                rgstr_id : user.user_id,
                rgstr_time : Time.getTimeString(),
                mdfr_id : user.user_id,
                mdfr_time : Time.getTimeString(),
              }


              axios.post('/OrderDetails' , ordersDetailParm)
                  .then(res=>{

                    showModal({
                      modalType: "AlertModal",
                      modalProps: {
                        message: "결제가 완료됐습니다."
                      }
                    });
                  })
            })
            .catch((error) =>  {console.log(error)});
    } else {
      alert(`결제 실패: ${error_msg}`);
    }
  };
 }


  return (

      <Container component="main" maxWidth="lg" className='product' >

        <Grid container spacing={3} >
          <Grid item xs={12} container justifyContent="flex-start" >
            <h3 className="productTitle">주문/결제</h3>
          </Grid>
          
          <Grid item xs={12} container  justifyContent="flex-start" sx={{ mt: -5 }}>
            <h4>기본 정보</h4>
          </Grid>
          <Grid item xs={5} sx={{ mt: -4 }}>
            <TextField
                required
                fullWidth
                name="name"
                label="이름"
                type="text"
                id="name"
                autoComplete="name"
            />
          </Grid>
          <Grid item  xs={7} sx={{ mt: -4 }}>
            <TextField
                required
                fullWidth
                name="phone_number"
                label="휴대번호"
                type="text"
                id="phone_number"
                autoComplete="phone_number"
            />
          </Grid>
          <Grid item  xs={12}>
            <TextField
                required
                fullWidth
                name="email"
                label="email"
                type="email"
                id="email"
                autoComplete="email"
            />
          </Grid>

          <Grid item xs={12} container  justifyContent="flex-start" >
            <h4>받는사람정보</h4>
          </Grid>
          <Grid item xs={5} sx={{ mt: -4 }}>
            <TextField
                required
                fullWidth
                name="recipient_name"
                label="이름"
                type="text"
                id="recipient_name"
                autoComplete="recipient_name"
            />
          </Grid>
          <Grid item  xs={7} sx={{ mt: -4 }}>
            <TextField
                required
                fullWidth
                name="recipient_phone_number"
                label="휴대번호"
                type="text"
                id="recipient_phone_number"
                autoComplete="recipient_phone_number"
            />
          </Grid>
          <Grid item  xs={12}>
            <TextField
                required
                fullWidth
                name="recipient_email"
                label="email"
                type="recipient_email"
                id="recipient_email"
                autoComplete="recipient_email"
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
                required
                fullWidth
                id="zipNo"
                label="우편주소"
                name="zipNo"
                autoComplete="zipNo"
                onClick={onClickAddr}
                value={zipNo}
            />
          </Grid>
          <Grid item  xs={12} sm={8}>
            <TextField
                required
                fullWidth
                id="addr"
                label="도로명주소"
                name="addr"
                autoComplete="addr"
                onClick={onClickAddr}
                value={addr}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
                required
                fullWidth
                id="addrDetail"
                label="상세주소"
                name="addrDetail"
                autoComplete="addrDetail"
                onChange={handleAddrDetail}
                value={addrDetail}
            />
          </Grid>


          <Grid item xs={12} container  justifyContent="flex-start" >
            <h4>결제 정보</h4>
          </Grid>
          <Grid item  xs={12} sm={5}>
            상품 명 :
          </Grid>
          <Grid item  xs={12} sm={7}>
            <Grid item  xs={12} >
              { props.product?props.product.product_nm:''}  {props.orderCnt + '개'}   {props.orderCnt ? ( props.product?props.product.price:0 * props.orderCnt).toLocaleString('ko-KR')+'원':'' }
            </Grid>
          </Grid>
          <Grid item  xs={5}>
            총 가격 :
          </Grid>
          <Grid item  xs={7}>
            {props.totalPrice? props.totalPrice.toLocaleString('ko-KR')+'원':''}
          </Grid>
          <Grid item  xs={5} >
            배송비 :
          </Grid>
          <Grid item  xs={7} >
             무료
          </Grid>
          <Grid item  xs={5} >
            결제 금액 :
          </Grid>
          <Grid item  xs={7} >
            {props.totalPrice?  props.totalPrice.toLocaleString('ko-KR') + '원':''}
          </Grid>

          <Grid item xs={12} sm={5}>
            결제 방법 :
          </Grid>
          <Grid item xs={12} sm={7}>
            <RadioGroup
                row
                aria-labelledby="demo-radio-buttons-group-label"
                value={PG}
                onChange={handleChange}
                name="radio-buttons-group"
            >
              <FormControlLabel value="html5_inicis"    control={<Radio />}       label="KG이니시스" />
              <FormControlLabel value="kakaopay"        control={<Radio />}       label="카카오페이" />
            </RadioGroup>
          </Grid>
        </Grid>
        <Grid item xs={12} sx={{ textAlign : "right" , mt : 3 }}>
            <Button
                variant="contained"
                sx={{fontSize : 20}}
                style={{ height : '50px'  , margin : '10px'}}
                onClick ={onClickPayment}
            >
              결제하기
            </Button>
        </Grid>
      </Container>
  );
}

export default  OrderAdd;