import axios from 'axios';
import React, { useEffect, useState ,useContext} from 'react';
import { useParams ,useNavigate} from 'react-router-dom';
import Button from '@mui/material/Button';
import * as Time from 'src/types/time'
import {Container , Grid, Box , TextField} from '@mui/material';
import { LoginContext } from 'src/contexts/login'
import useModal from "src/components/modal/hooks/useModal";
import DeleteIcon from '@mui/icons-material/Delete';


import {CommentHeaderProp} from './CommentComponent';


const CommentHeader:React.FC<CommentHeaderProp> =  (props) => {

    const { user } = useContext(LoginContext);
    const { showModal } = useModal();   
    const [comment , setComment] =useState('')
    const inputFromHandler = (event:React.ChangeEvent<HTMLInputElement>) => {
        setComment(event.target.value)
    }
    const commentSaveBtn = () => {
        const params = { parent_id : props.parent_id , type : props.type , comment : comment , rgstr_id : user.user_id }
            
        axios.post('/Comment',  params )
        .then(res=>{
            showModal({
                modalType: "AlertModal",
                modalProps: {
                  message: "댓글을 등록했습니다."
                }
              });
              setComment('')
              props.setCommentHeaderRerend(!props.commentHeaderRerend)
        }).catch(err => {console.log(err)})
    }
    return (
        <>
            <Grid item xs={12}>
                <Grid item  xs={12}>
                    {props.commentCnt} 개의 댓글
                    <hr/>
                </Grid>
            </Grid>

            <Grid item container spacing={2}  xs={12}>
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
        </>
    )
}
export default CommentHeader