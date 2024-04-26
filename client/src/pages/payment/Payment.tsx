import axios from 'axios';
import React, { useEffect, useState ,useContext} from 'react';
import { useParams ,useNavigate} from 'react-router-dom';
import Button from '@mui/material/Button';
import * as Time from 'src/types/time'
import {Container , Grid, Box , TextField} from '@mui/material';
import { LoginContext } from 'src/contexts/login'
import useModal from "src/components/modal/hooks/useModal";
import DeleteIcon from '@mui/icons-material/Delete';


import CommentComponent from 'src/components/comment/CommentComponent';

const Payment = () => {
    const {query} = useParams();

    useEffect(() => {
        /*
        const { imp_uid , merchant_uid , imp_success } = query;
        if(imp_uid && merchant_uid && imp_success) {
            // 결제 후 리디렉션 url로 이동이 되었을 경우
            // ... 쿼리스트링으로 받은 데이터를 가지고 핸들링
        };
         */

        console.log(query)
    }, [query]);

    return(
        <div></div>
    )

}

export default Payment