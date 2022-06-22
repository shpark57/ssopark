import axios from 'axios';
import React, { useEffect, useState ,useContext} from 'react';
import { useParams ,useNavigate} from 'react-router-dom';
import Button from '@mui/material/Button';
import * as Time from 'src/types/time'
import {Container , Grid, Box , TextField} from '@mui/material';
import { LoginContext } from 'src/contexts/login'
import useModal from "src/components/modal/hooks/useModal";
import DeleteIcon from '@mui/icons-material/Delete';

import {CommentBodyProp,Comments} from './CommentComponent';
const CommentBody:React.FC<CommentBodyProp> = (props) => {
   
    console.log(props.comments)
    return (
        <>
            {   
                props.comments.map(comment=>{
                    <div key={comment.id}>{comment.id}</div>
                })
            }
        </>
    )
}
export default CommentBody