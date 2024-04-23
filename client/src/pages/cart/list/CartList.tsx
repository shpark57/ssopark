import React, {useState, useEffect, useContext, ChangeEvent} from "react";
import './cartList.css'

import {DataGrid, GridSelectionModel} from '@mui/x-data-grid'
import { DeleteOutline } from "@mui/icons-material";
import axios from 'axios';
import {Link} from 'react-router-dom'
import * as Time from 'src/types/time'
import { LoginContext } from 'src/contexts/login'


import useModal from "src/components/modal/hooks/useModal";
import UserModify from 'src/pages/user/modify/UserModify';        //유저 정보 수정
import {Button, CardActionArea, Container} from "@mui/material";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import CardMedia from "@mui/material/CardMedia";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {ProductProps} from "src/pages/producrs/props/ProductProps";
import {CartProps} from "../props/CartProps"
// @ts-ignore
import Session from 'react-session-api';

export default function CartList(){
    const { showModal } = useModal();
    const {loggedIn , user } = useContext(LoginContext);
    const [tableData , setTableData] = useState<CartProps[]>([])
    const [selectIds , setSelectIds] = useState<GridSelectionModel>([])
    const [totalPrice , setTotalPrice] = useState(0)

    const [selectChk , setSelectChk]= useState(0)
    useEffect(() => {
        if(selectChk == 0){
            ontSelect()
        }
        fatchData()
    },[selectIds ,tableData])

    const ontSelect = () => {

        if(loggedIn){
            axios.get( process.env.REACT_APP_SERVER_HOST + '/api/cart' , {params : {user_id: user.id , _rel : 'product' }})
                .then(res =>  {
                    res.data.map((obj:CartProps,index:number)=>{
                        obj.id = index
                        obj.product_nm = obj.product.product_nm
                    })

                    let cartLocalStorage = window.localStorage;
                    let localCartList =  cartLocalStorage.getItem("localCartList")

                    let cartList: CartProps[] = []
                    if(localCartList){
                        cartList = JSON.parse(localCartList)
                        cartList.forEach( (row:CartProps,index:number) =>{
                            row.user_id = user.id

                            var findIndex = res.data.findIndex((obj:any, index:number) => obj['product_id'] === row.product_id)
                            if(findIndex != -1){
                                res.data[findIndex].cnt = res.data[findIndex].cnt + cartList[index].cnt
                                axios.post( process.env.REACT_APP_SERVER_HOST + "/api/Cart", res.data[findIndex])
                                    .catch((error) =>  {console.log("장바구니 수정 오류")});
                            }else{
                                res.data = [...res.data , cartList[index]]
                                axios.post( process.env.REACT_APP_SERVER_HOST + "/api/Cart", cartList[index])
                                    .catch((error) =>  {console.log("장바구니 수정 오류")});
                            }
                        })
                        setTableData(res.data)
                        cartLocalStorage.removeItem("localCartList" )
                    }else{
                        setTableData(res.data)
                    }

                })
            setSelectChk(1)
        }else{
            let cartLocalStorage = window.localStorage;
            let localCartList =  cartLocalStorage.getItem("localCartList")
            if(localCartList){
                let cartList = JSON.parse(localCartList)
                setTableData(cartList)
                setSelectChk(1)
            }
        }
    }

    const fatchData = () =>{

        let total = 0
        const selectedIDs = new Set(selectIds)
        tableData.filter((row:CartProps ) => selectedIDs.has(row.id) ).forEach((obj)=> {
            total = total + (obj.product.price * obj.cnt)
        })
        setTotalPrice(total)
    }
    const handleCntChange = (event: ChangeEvent<HTMLInputElement>)=> {
        const updatedItems = [...tableData];
        // 해당 인덱스의 객체를 새로운 객체로 교체합니다.
        updatedItems[ Number(event.target.name)] = { ...updatedItems[ Number(event.target.name)], cnt: Number( Number(event.target.value) < 1 ? 1 :  event.target.value ) };
        // 변경된 배열을 설정합니다.
        setTableData(updatedItems);
        if(loggedIn){
            axios.post( process.env.REACT_APP_SERVER_HOST + "/api/Cart", updatedItems[  Number(event.target.name) ])
                .catch((error) =>  {console.log("장바구니 수정 오류")});
        }else{
            let cartLocalStorage = window.localStorage;
            let localCartList =  cartLocalStorage.getItem("localCartList")
            if(localCartList){
                let cartList = JSON.parse(localCartList)
                var findIndex = cartList.findIndex((obj:any, index:number) => obj['product_id'] === updatedItems[ Number(event.target.name)].product_id )
                if(findIndex != -1){
                    cartList[findIndex].cnt = cartList[findIndex].cnt + 1
                }
                cartLocalStorage.setItem("localCartList",JSON.stringify(cartList))
            }
        }

    }

    const handleCntClick = (row:any,add:number) => () => {
        const updatedItems = [...tableData];
        // 해당 인덱스의 객체를 새로운 객체로 교체합니다.
        updatedItems[ Number( row.id )] = { ...updatedItems[ Number( row.id)], cnt: updatedItems[  row.id ].cnt + add < 1 ? 1 : updatedItems[  row.id ].cnt + add   };
        // 변경된 배열을 설정합니다.
        setTableData(updatedItems);
        if(loggedIn){
            axios.post( process.env.REACT_APP_SERVER_HOST + "/api/Cart", updatedItems[  Number( row.id) ])
                .catch((error) =>  {console.log("장바구니 수정 오류")});
        }else{
            let cartLocalStorage = window.localStorage;
            let localCartList =  cartLocalStorage.getItem("localCartList")
            if(localCartList){
                let cartList = JSON.parse(localCartList)
                var findIndex = cartList.findIndex((obj:any, index:number) => obj['product_id'] === updatedItems[Number( row.id)].product_id )
                if(findIndex != -1){
                    cartList[findIndex].cnt = cartList[findIndex].cnt + 1
                }
                cartLocalStorage.setItem("localCartList",JSON.stringify(cartList))
            }
        }
    }


    const handleCartDel = (row:any) => () => {

        showModal({
            modalType: "ConfirmModal",
            modalProps: {
                message: "삭제하시겠습니까?",
                confirmText: "Yes",
                cancelText: "No",
                title: "",
                handleConfirm: () => {
                    const updatedItems = [...tableData];
                    const delItems = row

                    let tmpArr = updatedItems.filter((obj:CartProps , index:number) => obj['product_id'] !== updatedItems[Number( row.id)].product_id )
                    tmpArr.forEach((obj:CartProps , index) => {
                        obj.id = index
                    })
                    setTableData(tmpArr);
                    if(loggedIn){
                        axios.delete("/Cart?product_id="+row.product_id +"&user_id="+user.id )
                            .catch( (error) => { alert("장바구니 삭제 오류") });
                    }else{
                        let cartLocalStorage = window.localStorage;
                        let localCartList =  cartLocalStorage.getItem("localCartList")
                        if(localCartList){
                            let cartList = JSON.parse(localCartList)
                            let tmpArr = updatedItems.filter((obj:CartProps , index:number) => obj['product_id'] !== updatedItems[Number( row.id)].product_id )
                            cartLocalStorage.setItem("localCartList",JSON.stringify(tmpArr))
                        }
                    }
                },
                handleClose: () => {

                }
            }
        });

    }



    const columns =[
        {   field : 'product' , headerName : '장바구니' ,
            flex : 1 ,
            renderCell: (params:any) =>{
                return(
                    <Grid container>
                        <Grid item xs={5} sx={{textAlign:'center'}}>
                            <CardMedia
                                component="img"
                                image={params.row.product.title_img }
                                alt="green iguana"
                                sx={{height : 100 , objectFit: 'scale-down'}}
                            />
                        </Grid>


                        <Grid item xs={7} sx={{textAlign:'center'}}>
                            <Grid item xs={12} sx={{ mt: 2 }} >
                                {params.row.product.product_nm }
                                <span className={"closeBtn"} onClick={handleCartDel(params.row)} >X</span>
                            </Grid>
                            <Grid item xs={12} sx={{ mt: 1 }} >
                                {params.row.product.price.toLocaleString('ko-KR') } 원
                            </Grid>
                            <Grid item xs={12} sx={{ mt: 1 ,textAlign:'center'}}>
                                <span className="numeric-input-container">
                                    <button  onClick={handleCntClick(params.row , -1)}>-</button>
                                    <input type="number" name={String(params.row.id)} value= {tableData[params.row.id]?.cnt } className="numeric-input" onChange={handleCntChange}></input>
                                    <button  onClick={handleCntClick(params.row , 1)}>+</button>
                                </span>
                            </Grid>

                        </Grid>
                    </Grid>
                )
            }
        }
    ]


    return(
            <div className="cartList">
                <DataGrid
                    className={"cartGrid"}
                    rowHeight={100}
                    autoHeight
                    rows = {tableData}
                    disableSelectionOnClick
                    columns={columns}
                    pageSize={50}
                    rowsPerPageOptions={[5]}
                    checkboxSelection
                    hideFooter
                    onSelectionModelChange={(ids) => {
                        setSelectIds(ids)
                    }}
                />
                <Grid item xs={12} sx={{textAlign:"center",position: "sticky", bottom: "0"  , zIndex : '999' , height : '100' , background:'white'}}>
                    <div  style={{textAlign:"right"}}>
                        총 금액 : {totalPrice.toLocaleString('ko-KR')}원
                        <Button
                            variant="contained"
                            sx={{fontSize : 20}}
                            style={{ height : '50px'  , margin : '10px'}}

                        >
                            구매하기
                        </Button>
                    </div>
                </Grid>
            </div>

    )
}