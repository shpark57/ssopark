import axios from 'axios';
import React, { useEffect, useState ,useContext} from 'react';
import { useParams ,useNavigate} from 'react-router-dom';
import Button from '@mui/material/Button';
import * as Time from 'src/types/time'
import {Container , Grid, Box , TextField} from '@mui/material';
import { LoginContext } from 'src/contexts/login'
import useModal from "src/components/modal/hooks/useModal";
import DeleteIcon from '@mui/icons-material/Delete';


import CommentComponent from './comment/CommentComponent';

const Sample = () => {
    const [parent_id , setParent_id] = useState(1)
    const [type , setType] = useState('Movies')

    return (
        <Container component="main" maxWidth="lg">
            게시판
            <CommentComponent parent_id={parent_id} type={type} />
        </Container>
    )
}

export default Sample