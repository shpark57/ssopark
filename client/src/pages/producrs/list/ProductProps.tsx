//댓글달기와 대댓글에 사용됨.
import React from "react";

export interface ProductProps {
    id : number
    product_nm : string
    product_type :string
    price :number
    content? :string
    use_yn? : string
    grade : number
    rgstr_id : string
    rgstr_time : string
}