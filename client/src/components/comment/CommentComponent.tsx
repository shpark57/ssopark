import axios from 'axios';
import React, { useEffect, useState ,useContext} from 'react';
import {Container , Grid, Box , TextField} from '@mui/material';
import CommentHeader from './CommentHeader';
import CommentBody from './CommentBody'

//코맨트 컴포넌트에 필요한 값
//2개의 인자값을 넘겨주면된다.
type CommentProps = {
    parent_id:number;
    type:string;
}

//인풋박으세 들어가는 인터페이스.
//댓글달기와 대댓글에 사용됨.
export interface CommentInputProp {
    parent_id : number
    type : string
    parent_comment_id?:number
    commentCnt? :number
    commentHeaderRerend : boolean
    setCommentHeaderRerend:React.Dispatch<React.SetStateAction<boolean>>
    commentBodyRerend : boolean
    setCommentBodyRerend:React.Dispatch<React.SetStateAction<boolean>>
}

//댓글 조회시 사용하는 인터페이스
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

//Comment와 마찬가지로 댓글 조회시 필요한 인터페이스.
export interface CommentBodyProp {
    comment : Comments
    parent_id : number
    type:string;
    commentHeaderRerend : boolean
    setCommentHeaderRerend:React.Dispatch<React.SetStateAction<boolean>>
    commentBodyRerend : boolean
    setCommentBodyRerend:React.Dispatch<React.SetStateAction<boolean>>
}

const CommentComponent:React.FC<CommentProps> = ({parent_id,type}) => {

    /**************************************************
     * 
     *  사용방법 <CommentComponent parent_id={Number(id)} type={'Movies'} />
     * 
     *************************************************/

   
    const [commentCnt , setCommentCnt] = useState(0) //댓글 컴포넌트 최상단의 총 댓글 갯수 조회.
    const [commentHeaderRerend , setCommentHeaderRerend ] = useState(false) //댓글 상위 부분 리랜더링을 위한 변수
    useEffect(() => {
        axios.get( '/api/Comment?parent_id='+parent_id)
        .then(res =>{
            setCommentCnt(res.data.length)
            return ()=>{
                console.log('cleanup')
            }
        }).catch(err => {console.log(err)})

    },[commentHeaderRerend])



    const [comments , setComments] = useState<Comments[]>([]) //해당 글의 댓글을 계층형으로 조회
    const [commentBodyRerend , setCommentBodyRerend ] = useState(false) //댓글 부분 리랜더링을 위한 변수.
    useEffect(() => {
         axios.get( '/api/Comment?parent_id='+parent_id+'&type='+type+'&_rel=children&parent_comment_id=null&_sort=rgstr_time&_order=desc')
        .then(res =>{
            setComments(res.data)
            return ()=>{
                console.log('cleanup')
            }
        }).catch(err => {console.log(err)})
   
    },[commentBodyRerend])  


    return (
        <Container component="main" maxWidth="md" sx={{ mb: 8}} >
            <CommentHeader {...{parent_id , type , commentCnt ,commentHeaderRerend , setCommentHeaderRerend,commentBodyRerend , setCommentBodyRerend }} />
            {
                comments.map((comment,index)=>{
                    return(
                        <CommentBody key={index} { ... {comment ,parent_id,type, commentHeaderRerend , setCommentHeaderRerend ,commentBodyRerend , setCommentBodyRerend }  } />
                    )
                })
            }
        </Container>
    )
}

export default CommentComponent