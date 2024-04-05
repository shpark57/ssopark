import React, {useState, useEffect ,useContext} from "react";
import './userList.css'

import {DataGrid} from '@mui/x-data-grid'
import { DeleteOutline } from "@mui/icons-material";
import axios from 'axios';
import {Link} from 'react-router-dom'
import * as Time from 'src/types/time'
import { LoginContext } from 'src/contexts/login'


import useModal from "src/components/modal/hooks/useModal";





export default function UserList(){
    const { showModal } = useModal();   
    const {loggedIn , user } = useContext(LoginContext);
    const [tableData , setTableData] = useState([])
    useEffect(() => {
        axios.get('/Users' , {params : {use_yn: 'Y',_sort:'last_login',_order:'DESC' }})
            .then(res =>  setTableData(res.data))
    },[0])   

    const handleDelete = (row:any) => () => {
        /* json-server 데이터 삭제 */
        /*
        axios.delete("/Users/" + row.id )
            .then( (response) => { alert("삭제 성공") })
            .catch( (error) => { alert("삭제 실패") });
        */
        /* useYn N 처리 업데이트 논리삭제*/
        axios.patch("/Users/" + row.id , { 
            use_yn : 'N' ,  
            mdfr_id : user.user_id,
            mdfr_time : Time.getTimeString()    
        } )
            .then( (response) => { 
                showModal({
                    modalType: "AlertModal",
                    modalProps: {
                      message: "삭제 성공!"
                    }
                  });
            })
            .catch( (error) => {
                
                showModal({
                    modalType: "AlertModal",
                    modalProps: {
                      message: "삭제 실패!"
                    }
                  });
            });
        
        setTableData(tableData.filter((item) => item['user_id']  !== row.user_id) )
    }

    const columns =[
        {   field : 'user_id' , headerName : 'ID' , width : 150},
        {   field : 'user' , 
            headerName : 'User' , 
            width : 200 ,
          /*  renderCell: (params:any) =>{
                return(
                    <div className="userListUser">
                        <img 
                            className="userListImg"
                            src={params.row.avatar ? params.row.avatar : 'https://cdn.pixabay.com/photo/2017/11/10/05/48/user-2935527_960_720.png'} 
                            alt=""
                        />
                        {params.row.user_name}
                    </div>
                )
            }*/
        
        },
        {   field : 'email' , headerName : '이메일' , width : 300},
        {   field : 'phone_number' , headerName : '전화번호' , width : 150, 
            renderCell: (params:any) =>{
                return(
                    <div className="userListUser">
                        {params.row.phone_number.replace(/(^02.{0}|^01.{1}|[0-9]{3})([0-9]+)([0-9]{4})/,"$1-$2-$3") }
                    </div>
                )
            }
        },
        
        {   field : 'last_login' , headerName : '마지막 로그인' , width : 200,
            renderCell : (params : any) => {
                return (
                    Time.toDateString(`${params.row.last_login}`)
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