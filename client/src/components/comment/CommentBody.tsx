import axios from 'axios';
import React, { useEffect, useState ,useContext} from 'react';
import * as Time from 'src/types/time'
import { Grid , TextField} from '@mui/material';
import { LoginContext } from 'src/contexts/login'
import useModal from "src/components/modal/hooks/useModal";
import {CommentBodyProp} from './CommentComponent';
import './css/commentBody.css'

import CommentInputFrom from './CommentInputFrom'


const CommentBody:React.FC<CommentBodyProp> = (props) => {
    const { user } = useContext(LoginContext);  //로그인 유저정보
    const { showModal } = useModal();           //모달 사용
    const [childShow , setChildShow] = useState([false])    //대댓글 SHOW AND HIDE 위한 변수
    const commentBodyDelBtnHandler = (event :React.MouseEvent<HTMLDivElement>) =>{
        //댓글 삭제 위한 함수
        if(!(event.target instanceof HTMLDivElement)){  // 선언안하면 DATASET 사용을 못함.
            return;
        }
        const comment_id = event.target.dataset.id
        
        showModal({
            modalType: "ConfirmModal",
            modalProps: {
              message: "삭제하시겠습니까?",
              confirmText: "Yes",
              cancelText: "No",
              title: "",
              handleConfirm: () => {
                axios.patch('/Comment/'+comment_id, {comment: '삭제한 댓글 입니다.'})   //논리삭제.
                .then(res=>{
                    props.setCommentBodyRerend(!props.commentBodyRerend)    //댓글부분 리랜더링
                   
                })
              },
              handleClose: () => {
             
              }
            }
          });

    }

    return (
            <Grid item xs={12} key={'from_'+props.comment.id}>
                <Grid item  xs={12} >
                    <div className="commentBodyTitle">{props.comment.rgstr_id }</div>
                    {
                        props.comment.rgstr_id == user.user_id && props.comment.comment != '삭제한 댓글 입니다.'
                        ?  <div  className='commentBodyDelBtn' onClick={commentBodyDelBtnHandler} data-id= {props.comment.id} > X </div>
                        :  ''
                    }
                    <div className="commentBodyTime">{props.comment && Time.toDateString(props.comment.rgstr_time) }</div>
                    <div className='commentBodyContent'>
                        {props.comment.comment }
                    </div>
                    <div className='commentBodyChildBtn' onClick={()=>{
                        childShow[props.comment.id]  = !childShow[props.comment.id] 
                        props.setCommentBodyRerend(!props.commentBodyRerend)
                    }}>
                        {props.comment.children.length > 0 ? `답글 ${props.comment.children.length}` : '답글 작성'}
                    </div>
                    <hr/>  
                </Grid>
                {   
                    childShow[props.comment.id] && props.comment.children.map((child,index)=>{
                        return(
                            <Grid item  xs={12} key={'child_'+index} container spacing={2}  >
                                <Grid item  xs={1} >
                                </Grid>
                                <Grid item  xs={11}  key={'child-'+index}>
                                    <div className="commentBodyTitle">{child.rgstr_id }</div>

                                    {   child.rgstr_id == user.user_id && child.comment != '삭제한 댓글 입니다.' 
                                        ?<div  className='commentBodyDelBtn' onClick={commentBodyDelBtnHandler} data-id= {child.id} > X </div>
                                        : ''
                                    }
                                    <div className="commentBodyTime">{child && Time.toDateString(child.rgstr_time) }</div>

                                    <div className='commentBodyContent'>
                                        {child.comment }
                                    </div>
                                </Grid>
                            </Grid>
                        )      
                    })}
                    {
                        childShow[props.comment.id] 
                        ?   
                            <Grid item  xs={13} key={'inputFrom_'+props.comment.id} sx={{mt:5}}>
                                <CommentInputFrom 
                                    parent_id={props.parent_id}  
                                    type={props.type} 
                                    parent_comment_id={props.comment.id} 
                                    commentHeaderRerend={props.commentHeaderRerend} 
                                    setCommentHeaderRerend={props.setCommentHeaderRerend} 
                                    commentBodyRerend={props.commentBodyRerend} 
                                    setCommentBodyRerend={props.setCommentBodyRerend}   
                                />
                            </Grid>

                        :   ''
                    }
            </Grid>
    )
} 
export default CommentBody