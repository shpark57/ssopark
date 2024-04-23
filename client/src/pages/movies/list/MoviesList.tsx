import React, {useState, useEffect ,useContext} from "react";
import './moviesList.css'

import {DataGrid} from '@mui/x-data-grid'
import { DeleteOutline } from "@mui/icons-material";
import axios from 'axios';
import {Link} from 'react-router-dom'
import * as Time from 'src/types/time'
import { LoginContext } from 'src/contexts/login'
import { useNavigate } from 'react-router-dom';


import useModal from "src/components/modal/hooks/useModal";





export default function UserList(){

    let navigate = useNavigate();   //페이지 이동을 위해필요.
    const { showModal } = useModal();   
    const {loggedIn , user } = useContext(LoginContext);
    const [tableData , setTableData] = useState([])
    useEffect(() => {
        axios.get( process.env.REACT_APP_SERVER_HOST + '/api/Movies' , {params : {use_yn: 'Y',_sort:'rgstr_time',_order:'DESC' }})
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
        axios.patch( process.env.REACT_APP_SERVER_HOST + "/api/Movies/" + row.id , {
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
        
        setTableData(tableData.filter((item) => item['id']  !== row.id) )
    }
    const goMoviesView = async (e : React.MouseEvent<HTMLSpanElement>) => {
        if(!(e.target instanceof HTMLSpanElement)){ 
            return;
        }
        const id = e.target.dataset.id    
        

        await axios.patch( process.env.REACT_APP_SERVER_HOST + '/api/Movies/'+id ,{'visits++' : 1})
        navigate(String("/moviesView/"+ id))
    }


       
    const columns =[
        {   field : 'title' , headerName : '제목' , width : 150,   
        renderCell: (params:any)=>{
            return(
                <> 
                    <span onClick={goMoviesView}  data-id={params.row.id} className="listCellClick" >{params.row.title}</span>   
                </>
            )
        }},

        {   field : 'content' , headerName : '내용' , width : 300,   
            renderCell: (params:any)=>{
                return(
                    <> 
                        <span onClick={goMoviesView}  data-id={params.row.id} className="listCellClick" >{params.row.content}</span>   
                    </>
                )
            }
        },
        {   field : 'genre' , headerName : '장르' , width : 150},

        {   field : 'visits' , headerName : '방문자 수' , width : 150},
        {   field : 'like' , 
            headerName : '좋아요,싫어요' , 
            width : 200 ,
            renderCell: (params:any) =>{
                return(
                    <>
                        {params.row.like + ' / ' + params.row.dis_like}
                    </>
                )
            }
        
        },

        {   field : 'rgstr_id' , headerName : '등록자 ID' , width : 150},
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