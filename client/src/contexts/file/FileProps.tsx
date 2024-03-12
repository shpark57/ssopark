//댓글달기와 대댓글에 사용됨.
import React from "react";

export interface FileProps {
id  : number
parent_id : number
type : string
type_detail : string
ymd : string
origin_name : string
change_name : string
file_type : string
size : number
rgstr_id :string
rgstr_time : string
}