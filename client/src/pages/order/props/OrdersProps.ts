import * as Time from "../../../types/time";
import {OrdersDetailParm} from "./OrdersDetailParm";

export interface OrdersProps {
    id : string
    user_id : number
    order_date : string
    order_state : string
    order_title : string
    order_price : number
    rgstr_id : string
    rgstr_time : string
    mdfr_id : string
    mdfr_time : string
    addr : string
    addrDetail : string
    zipNo : string
    recipient_name :string
    recipient_phone_number : string
    details : OrdersDetailParm[]
}

