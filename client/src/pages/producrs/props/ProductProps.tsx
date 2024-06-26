//댓글달기와 대댓글에 사용됨.
import React from "react";
import {FileProps} from "src/contexts/file/FileProps";

export interface ProductProps {
    id : number
    product_nm : string
    product_type :string
    price :number
    content :string
    use_yn : string
    like : number
    dis_like : number
    rgstr_id : string
    rgstr_time : string
    mdfr_id : string
    mdfr_time : string
    cnt : number
    title_img : string
    visits : number
}

