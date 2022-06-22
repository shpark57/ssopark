import axios from 'axios';
import React, { useEffect, useState ,useContext} from 'react';
import { useParams ,useNavigate} from 'react-router-dom';
import Button from '@mui/material/Button';
import * as Time from 'src/types/time'
import {Container , Grid, Box , TextField} from '@mui/material';
import { LoginContext } from 'src/contexts/login'
import useModal from "src/components/modal/hooks/useModal";
import DeleteIcon from '@mui/icons-material/Delete';
import CommentHeader from './CommentHeader';
import CommentBody from './CommentBody'
import Deley from 'src/contexts/delay/Delay'

type sampleProp = {
    parent_id:number;
    type:string;
}
export interface CommentHeaderProp {
    parent_id : number
    type : string
    commentCnt :number
    commentHeaderRerend : boolean
    setCommentHeaderRerend:React.Dispatch<React.SetStateAction<boolean>>
}
export interface Comments{
    id:number;
    parent_id:number;
    type:string;
    type_detail:string;
    parent_comment_id:number;
    comment:string;
    rgstr_id:string;
    rgstr_time:string;
    children:[Comments]
}
export interface CommentBodyProp {
    comments : Comments[]
    commentBodyRerend : boolean
    setCommentBodyRerend:React.Dispatch<React.SetStateAction<boolean>>
}
const CommentComponent:React.FC<sampleProp> = ({parent_id,type}) => {


    const [commentCnt , setCommentCnt] = useState(0)
    const [commentHeaderRerend , setCommentHeaderRerend ] = useState(false)
    useEffect(() => {
        axios.get('/Comment?parent_id='+parent_id)
        .then(res =>{
            setCommentCnt(res.data.length)
            return ()=>{
                console.log('cleanup')
            } 
        }).catch(err => {console.log(err)})
       
    },[commentHeaderRerend])  



    const [comments , setComments] = useState<Comments[]>([])
    const [commentBodyRerend , setCommentBodyRerend ] = useState(false)
    useEffect(() => {
         axios.get('/Comment?parent_id='+parent_id+'&type='+type+'&_rel=children&parent_comment_id=null&_sort=rgstr_time&_order=desc')
        .then(res =>{
            setComments(res.data)
            return ()=>{
                console.log('cleanup')
            }
        }).catch(err => {console.log(err)})
   
    },[commentBodyRerend])  


    return (
        <Container component="main" maxWidth="md" sx={{ mb: 8}} >
            <CommentHeader {...{parent_id , type , commentCnt ,commentHeaderRerend , setCommentHeaderRerend}} />
            <Delay wait={3000}/>
            <CommentBody { ...{ comments ,commentBodyRerend ,setCommentBodyRerend} }/>
        </Container>
    )
}

export default CommentComponent