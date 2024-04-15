import React, {useState, useEffect, useContext, ChangeEvent} from "react";
import './cartList.css'

import {DataGrid} from '@mui/x-data-grid'
import { DeleteOutline } from "@mui/icons-material";
import axios from 'axios';
import {Link} from 'react-router-dom'
import * as Time from 'src/types/time'
import { LoginContext } from 'src/contexts/login'


import useModal from "src/components/modal/hooks/useModal";
import UserModify from 'src/pages/user/modify/UserModify';        //유저 정보 수정
import {Button, CardActionArea} from "@mui/material";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import CardMedia from "@mui/material/CardMedia";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {ProductProps} from "src/pages/producrs/props/ProductProps";

import { Unstable_NumberInput as NumberInput } from '@mui/base';

interface Interface {
    id : number
    cnt : number
    title_img : string
    product_id : number
    user_id : number
    product : ProductProps
    product_nm : string
    rgstr_id : string
    rgstr_time : string
    mdfr_id : string
    mdfr_time : string
}

export default function CartList(){
    const { showModal } = useModal();
    const {loggedIn , user } = useContext(LoginContext);
    const [tableData , setTableData] = useState<Interface[]>([])
    
    useEffect(() => {
        axios.get('/cart' , {params : {user_id: /*user.id*/ '1' , _rel : 'product' }})
            .then(res =>  {
                res.data.map((obj:Interface,index:number)=>{
                    obj.id = index
                    obj.product_nm = obj.product.product_nm
                })
                setTableData(res.data)
            })
    },[0])
    const handleCntChange = (event: ChangeEvent<HTMLInputElement>)=> {
        const updatedItems = [...tableData];
        // 해당 인덱스의 객체를 새로운 객체로 교체합니다.
        updatedItems[ Number(event.target.name)] = { ...updatedItems[ Number(event.target.name)], cnt: Number( Number(event.target.value) < 1 ? 1 :  event.target.value ) };
        // 변경된 배열을 설정합니다.
        setTableData(updatedItems);

    }

    const handleCntClick = (row:any,add:number) => () => {
        console.log("?")
        const updatedItems = [...tableData];
        // 해당 인덱스의 객체를 새로운 객체로 교체합니다.
        updatedItems[ Number( row.id )] = { ...updatedItems[ Number( row.id)], cnt: updatedItems[  row.id ].cnt + add < 1 ? 1 : updatedItems[  row.id ].cnt + add   };
        // 변경된 배열을 설정합니다.
        setTableData(updatedItems);

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
                            </Grid>
                            <Grid item xs={12} sx={{ mt: 1 }} >
                                {params.row.product.price.toLocaleString('ko-KR') } 원
                            </Grid>
                            <Grid item xs={12} sx={{ mt: 1 ,textAlign:'center'}}>
                                <span className="numeric-input-container">
                                    <button  onClick={handleCntClick(params.row , -1)}>-</button>
                                    <input type="number" name={String(params.row.id)} value= {tableData[params.row.id].cnt } className="numeric-input" onChange={handleCntChange}></input>
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
                    rowHeight={100}
                    rows = {tableData}
                    disableSelectionOnClick
                    columns={columns}
                    pageSize={50}
                    rowsPerPageOptions={[5]}
                    checkboxSelection

                />
            </div>

    )
}