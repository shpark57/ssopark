import React, {useState, useEffect ,useContext} from "react";
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
import {ProductProps} from "../../producrs/props/ProductProps";



export default function CartList(){
    const { showModal } = useModal();
    const {loggedIn , user } = useContext(LoginContext);
    const [tableData , setTableData] = useState([])
    
    useEffect(() => {
        axios.get('/cart' , {params : {user_id: /*user.id*/ '1' , _rel : 'product' }})
            .then(res =>  {
                console.log("?")
                // @ts-ignore
                res.data.map((obj,index)=>{
                    obj.id = index
                    obj.product_nm = obj.product.product_nm
                })
                setTableData(res.data)
            })
    },[0])

    const inputCntHandler = (row:any) => () => {
        const tempTable =[]

        console.log(row)

        setTableData(tableData)
    }

    const columns =[
        {   field : 'product' , headerName : '' ,
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
                            <Grid item xs={12} sx={{ mt: 1 }}>
                                <TextField
                                    type={"number"}
                                    id="addrDetail"
                                    name="addrDetail"
                                    autoComplete="addrDetail"
                                    value= { params.row.product.cnt }
                                    onChange={inputCntHandler(params.row)}
                                />
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
                    pageSize={10}
                    rowsPerPageOptions={[5]}
                    checkboxSelection

                />
            </div>

    )
}