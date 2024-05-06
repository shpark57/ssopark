import MenuIcon from '@mui/icons-material/Menu';
import React, {useContext} from "react";
import './footer.css'
import PasswordModifyModal from "../../pages/user/modify/Modals/PasswordModifyModal";
import TermsOfUse from "./TermsOfUse/TermsOfUse";
import useModal from "../modal/hooks/useModal";
export default function Footer(){

    const { showModal } = useModal();           //모달 사용

    const goTermsOfUse = (type:string)  => () => {
        showModal({
            modalType: "IncludeModal",
            modalProps: {
                message : ( <TermsOfUse type={type}/>),
                title: "",
            }
        });
    };
    return(
        <div className='footer'>
            <span onClick={goTermsOfUse("")}>회사소개</span>  <span onClick={goTermsOfUse("TermsofUse")}>이용약관</span>  <span onClick={goTermsOfUse("privacyPolicy")}>개인정보처리방침</span>  <span onClick={goTermsOfUse("informationUse")}>이용안내</span>
            <br/>
            상호 : 승현네 대표 : 박성일
            <br/>
            주소 : 전라북도 고창군 흥덕면 용반리 226
            <br/>
            사업자번호 :479-96-01630  통신판매업신고 : 아직..
            <br/>
            대표번호 : 010-9029-3089 이메일 : shpark91@kakao.com
            <br/>
            copyrightⓒ2024 shpark91.iptime.org. All Rights Reserved.
        </div>
    )
}