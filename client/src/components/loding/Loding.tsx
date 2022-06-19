// Loading.js
import React from 'react';
import './loding.css';
import Spinner from './ellipsis-1s-200px.gif';

export default () => {
    return (
        <div className='Background' >
            <div className='LoadingText'>잠시만 기다려 주세요.</div>
            <img src={Spinner} alt="로딩중" width="5%" />
        </div>
    );
};