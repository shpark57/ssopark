
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
import {Alert, CardActionArea, Divider, List, ListItem, ListItemText, Radio, RadioGroup} from "@mui/material";
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

  const [alertMessage, setAlertMessage] = useState(''); //알림 메시지
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

    if(loggedIn){
      setName(user.user_name)
      setPhone_number(user.phone_number)
      setEmail(user.email)

      setRecipient_name(user.user_name)
      setRecipient_phone_number(user.phone_number)
      setRecipient_email(user.email)


      setAddr(user.addr)
      setAddrDetail(user.addrDetail)
      setZipNo(user.zipNo)
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


  const ordNo = 'ord_' +Time.toDateStringNumRandom();
  const onClickPayment = () => {

    const { IMP }:any = window;
    IMP.init(`${process.env.REACT_APP_IMP}`);

    if(name == '' || name == null){
      setAlertMessage('이름을 입력해주세요,')
      return
    }else if(phone_number == '' || phone_number == null){
      setAlertMessage('휴대번호를 입력해주세요,')
      return
    }else if(email == '' || email == null){
      setAlertMessage('이메일을 입력해주세요,')
      return
    }else if(recipient_name == '' || recipient_name == null){
      setAlertMessage('받는사람 이름을 입력해주세요,')
      return
    }else if(recipient_phone_number == '' || recipient_phone_number == null){
      setAlertMessage('받는사람 휴대번호를 입력해주세요,')
      return
    }else if(recipient_email == '' || recipient_email == null){
      setAlertMessage('받는사람 이메일을 입력해주세요,')
      return
    }else if(addr == '' || addr == null){
      setAlertMessage('주소를 입력해주세요,')
      return
    }else if(addrDetail == '' || addrDetail == null){
      setAlertMessage('상세주소를 입력해주세요,')
      return
    }else if(zipNo == '' || zipNo == null){
      setAlertMessage('우편번호를 입력해주세요,')
      return
    }

    console.log("?")

    const data = {
      pg: PG, // PG사
      pay_method: payMethod, // 결제수단
      merchant_uid: ordNo, // 주문번호
      amount: props.totalPrice, // 결제금액
      name: props.product?.product_nm, // 주문명
      buyer_name: name, // 구매자 이름
      buyer_tel: phone_number, // 구매자 전화번호
      buyer_email: email, // 구매자 이메일
      buyer_addr: addr + ' ' +addrDetail, // 구매자 주소
      buyer_postcode: zipNo, // 구매자 우편번호
    };
    IMP.request_pay(data, callback);


  };
  const callback = (response: any) => {
    const {success, error_msg} = response;
    if (success) {
      let ordersParm = {
        id: ordNo,
        user_id: user.id != 0 ? user.id : null,
        order_date: Time.getTimeString(),
        order_state: '결제완료',
        order_title: props.product ? props.product.product_nm : '',
        order_price: props.totalPrice,  //배송비 무료
        rgstr_id: user.user_id != 'null' ? user.user_id : 'system',
        rgstr_time: Time.getTimeString(),
        mdfr_id:  user.user_id != 'null' ? user.user_id : 'system',
        mdfr_time: Time.getTimeString(),
        addr: addr,
        addrDetail: addrDetail,
        zipNo: zipNo,
        recipient_name: recipient_name,
        recipient_phone_number: recipient_phone_number
      }
      axios.post( process.env.REACT_APP_SERVER_HOST_API + '/Orders', ordersParm)
          .then(res => {
            let ordersDetailParm = {
              order_id: res.data.id,
              product_nm: props.product?.product_nm,
              product_type: props.product?.product_type,
              cnt: props.orderCnt,
              price: props.product?.price,
              totalPrice: props.totalPrice,
              title_img: props.product?.title_img,
              rgstr_id: user.user_id != 'null' ? user.user_id : 'system',
              rgstr_time: Time.getTimeString(),
              mdfr_id: user.user_id != 'null' ? user.user_id : 'system',
              mdfr_time: Time.getTimeString(),
            }


            axios.post( process.env.REACT_APP_SERVER_HOST_API + '/OrderDetails', ordersDetailParm)
                .then(res => {

                  showModal({
                    modalType: "AlertModal",
                    modalProps: {
                      message: "결제가 완료됐습니다."
                    }
                  });
                })
          })
          .catch((error) => {
            console.log(error)
          });

    } else {
      alert(`결제 실패: ${error_msg}`);
    }
    ;
  }

 const copyDefaultInfo = () =>{
   setRecipient_name(name)
   setRecipient_phone_number(phone_number)
   setRecipient_email(email)
 }

  const input_name_Handler = (e:React.ChangeEvent<HTMLInputElement>) =>{
    setName(e.target.value)
  }
  const input_phone_number_Handler = (e:React.ChangeEvent<HTMLInputElement>) =>{
    setPhone_number(e.target.value)
  }
  const input_email_Handler = (e:React.ChangeEvent<HTMLInputElement>) =>{
    setEmail(e.target.value)
  }

  const input_recipient_name_Handler = (e:React.ChangeEvent<HTMLInputElement>) =>{
    setRecipient_name(e.target.value)
  }
  const input_recipient_phone_number_Handler = (e:React.ChangeEvent<HTMLInputElement>) =>{
    setRecipient_phone_number(e.target.value)
  }
  const input_recipient_email_Handler = (e:React.ChangeEvent<HTMLInputElement>) =>{
    setRecipient_email(e.target.value)
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
                value={name}
                onChange={(e:React.ChangeEvent<HTMLInputElement>) => input_name_Handler(e)}
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
                value={phone_number}
                onChange={(e:React.ChangeEvent<HTMLInputElement>) => input_phone_number_Handler(e)}
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
                value={email}
                onChange={(e:React.ChangeEvent<HTMLInputElement>) => input_email_Handler(e)}
            />
          </Grid>

          <Grid item xs={12} container  justifyContent="flex-start" >
            <Grid item xs={5} >
              <h4>받는사람정보</h4>          
            </Grid>

            <Grid item xs={7} sx={{ textAlign : "right"}}>
              <Button
                  variant="contained"
                  sx={{ height : '30px' , top:20}}
                  onClick ={copyDefaultInfo}
              >
                기본정보 복사
              </Button>
            </Grid>

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
                value={recipient_name}
                onChange={(e:React.ChangeEvent<HTMLInputElement>) => input_recipient_name_Handler(e)}
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
                value={recipient_phone_number}
                onChange={(e:React.ChangeEvent<HTMLInputElement>) => input_recipient_phone_number_Handler(e)}
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
                value={recipient_email}
                onChange={(e:React.ChangeEvent<HTMLInputElement>) => input_recipient_email_Handler(e)}
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
              <FormControlLabel className="mobileHide" value="kakaopay"        control={<Radio />}       label="카카오페이" />
            </RadioGroup>
          </Grid>
        </Grid>
        <Grid item xs={12} sx={{ textAlign : "right" , mt : 3 }}>
          {
            alertMessage != '' ? <Alert severity="error" sx={{height:'30px'}}>{alertMessage}</Alert> : ''
          }
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