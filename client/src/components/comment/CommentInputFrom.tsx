import axios from 'axios';
import React, { useEffect, useState ,useContext} from 'react';
import Button from '@mui/material/Button';
import { Grid , TextField} from '@mui/material';
import { LoginContext } from 'src/contexts/login'
import useModal from "src/components/modal/hooks/useModal";


import {CommentInputProp} from './CommentComponent';

const CommentInputFrom:React.FC<CommentInputProp> =  (props) => {
    
    const { loggedIn , user } = useContext(LoginContext);  //로그인 사용자 정보
    const { showModal } = useModal();           //모달 사용
    const [comment , setComment] =useState('')  //댓글 입력시 사용되는 변수
    const inputFromHandler = (event:React.ChangeEvent<HTMLInputElement>) => {
        //댓글 입력시마다 수정되는 글자를 인식시켜줌
        setComment(event.target.value)
    }
    const commentSaveBtn = () => {

        if(!loggedIn){
            showModal({
                modalType: "AlertModal",
                modalProps: {
                    message: "로그인을 해야 댓글을 작성할 수 있습니다."
                }
            });
            return
        }
        //댓글 저장
        //parent_comment_id 가 있으면 대댓글이고 없으면 그냥 댓글이다.
        const params = { parent_id : props.parent_id , type : props.type , comment : comment , rgstr_id : user.user_id , parent_comment_id  : props.parent_comment_id}
         
        
        axios.post( process.env.REACT_APP_SERVER_HOST + '/api/Comment',  params )
        .then(res=>{
            showModal({
                modalType: "AlertModal",
                modalProps: {
                  message: "댓글을 등록했습니다."
                }
              });
              setComment('')
              props.setCommentHeaderRerend(!props.commentHeaderRerend)  // 해더부분 리랜더링
              props.setCommentBodyRerend(!props.commentBodyRerend)      // 댓글부분 리랜더링
        }).catch(err => {console.log(err)})
        
    }
    return (
            <Grid item container spacing={2}  xs={12} className="comment">
                    <Grid item  xs={12}>
                        <TextField
                            fullWidth
                            id="content"
                            label="댓글을 입력해주세요"
                            name="content"
                            variant="outlined"
                            multiline
                            minRows={3}
                            maxRows={3}
                            value ={comment}
                            onChange={inputFromHandler}
                        />    
                        
                    <Grid container justifyContent="flex-end">
                        <Button
                            variant="contained"
                            sx={{ mt: 1, mb: 2 }}
                            onClick={commentSaveBtn}
                        >
                            등록
                        </Button>
                    </Grid>         
                    </Grid>
            </Grid>    
    )
}
export default CommentInputFrom