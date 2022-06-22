import { Grid } from '@mui/material';


import {CommentInputProp} from './CommentComponent';
import CommentInputFrom from './CommentInputFrom';


const CommentHeader:React.FC<CommentInputProp> =  (props) => {
    return (
        <div className='comment'>
            <Grid item xs={12} >
                <Grid item  xs={12}>
                    {props.commentCnt} 개의 댓글
                    <hr/>
                </Grid>
            </Grid>

            <CommentInputFrom  
                parent_id={props.parent_id}  
                type={props.type} 
                commentHeaderRerend={props.commentHeaderRerend} 
                setCommentHeaderRerend={props.setCommentHeaderRerend} 
                commentBodyRerend={props.commentBodyRerend} 
                setCommentBodyRerend={props.setCommentBodyRerend}   
            />
        </div>
    )
}
export default CommentHeader