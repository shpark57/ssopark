import MenuIcon from '@mui/icons-material/Menu';
import React, {useContext} from "react";
import './footer.css'
export default function Footer(){
    return(
        <div className='footer'>
            회사소개  이용약관  개인정보처리방침  이용안내
            <br/>
            상호 : 승현네 대표 : 박성일
            <br/>
            주소 : 전라북도 고창군 흥덕면 용란비 226
            <br/>
            사업자번호 :479-96-01630  통신판매업신고 : 아직..
            <br/>
            대표번호 : 010-9029-3089 이메일 : shpark91@kakao.com
            <br/>
            copyrightⓒ2024 shpark91.iptime.org. All Rights Reserved.
        </div>
    )
}