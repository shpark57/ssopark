//댓글달기와 대댓글에 사용됨.
import React from "react";
import {ProductProps} from "../../producrs/props/ProductProps";

export interface CartProps {
    id : number
    cnt : number
    title_img : string
    product_id : number
    user_id : number
    product : ProductProps
    product_nm : string
    rgstr_id : string
    rgstr_time : string
    mdfr_id : string
    mdfr_time : string
}

