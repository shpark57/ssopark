import React, {useState, useEffect ,useContext} from "react";
import './userList.css'

import {DataGrid} from '@mui/x-data-grid'
import { DeleteOutline } from "@mui/icons-material";
import axios from 'axios';
import {Link} from 'react-router-dom'
import * as Time from 'src/types/time'
import { LoginContext } from 'src/contexts/login'






export default function UserList(){
    const {loggedIn , user , setLoggedOut} = useContext(LoginContext);
    const [tableData , setTableData] = useState([])
    const params = {useYn: 'Y'}
    useEffect(() => {
        axios.get('http://localhost:4000/users' , {params})
            .then(res => setTableData(res.data))
    },[0])   



    const delIds = new Array();

    const handleDelete = (row:any) => () => {
        /* json-server 데이터 삭제 */
        /*
        fetch("http://localhost:4000/users/" + row.id, {
            method: "DELETE",
          })
        */


        /* useYn N 처리 업데이트 논리삭제*/
        axios.patch("http://localhost:4000/users/" + row.id , { 
            useYn : 'N' ,  
            mdfrId : user.id,
            mdfrTime : Time.getTimeString()    
        } )
            .then( (response) => { alert("삭제 성공") })
            .catch( (error) => { alert("삭제 실패") });
        
        setTableData(tableData.filter((item) => item['id']  !== row.id) )
    }

    const columns =[
        {   field : 'id' , headerName : 'ID' , width : 150},
        {   field : 'user' , 
            headerName : 'User' , 
            width : 200 ,
            renderCell: (params:any) =>{
                return(
                    <div className="userListUser">
                        <img 
                            className="userListImg"
                            src={params.row.avatar ? params.row.avatar : 'https://cdn.pixabay.com/photo/2017/11/10/05/48/user-2935527_960_720.png'} 
                            alt=""
                        />
                        {params.row.username}
                    </div>
                )
            }
        
        },
        {   field : 'email' , headerName : 'Email' , width : 300},
        {   field : 'phoneNumber' , headerName : 'PhoneNumber' , width : 150, 
            renderCell: (params:any) =>{
                return(
                    <div className="userListUser">
                        {params.row.phoneNumber.replace(/(^02.{0}|^01.{1}|[0-9]{3})([0-9]+)([0-9]{4})/,"$1-$2-$3") }
                    </div>
                )
            }
        },
        {   field : 'action' , 
            headerName : 'Action' , 
            width : 130,
            renderCell: (params:any) =>{
                return(
                    <>
                        <Link to={'/userModify/' + params.row.id}>
                            <button className="userListEdit">Edit</button>
                        </Link>
                        <DeleteOutline 
                            className="userListDelete" 
                            onClick = {handleDelete(params.row)}
                        />
                    </>
                )
            }
        },
    ]


    return(
        <div className="userList">
            <DataGrid
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