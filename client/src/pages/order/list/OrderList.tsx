import React, {useState, useEffect, useContext, useRef} from "react";

import ProductBody from 'src/pages/producrs/list/ProductBody'
import {useNavigate} from "react-router-dom";
import useModal from "../../../components/modal/hooks/useModal";
import {LoginContext} from "../../../contexts/login";
import axios from "axios";
import Container from "@mui/material/Container";
import {ThemeProvider} from "@mui/material/styles";


import Loading from 'src/components/loding/Loding';
import {FileProps} from "../../../contexts/file/FileProps";

import AddCircleIcon from '@mui/icons-material/AddCircle';
import Typography from "@mui/material/Typography";
import {SvgIconTypeMap} from "@mui/material/SvgIcon/SvgIcon";

import {ProductProps} from 'src/pages/producrs/props/ProductProps'
import {OrdersProps} from "../props/OrdersProps";
import {OrdersDetailParm} from "../props/OrdersDetailParm";
import OrderBody from "./OrderBody";
import {CardActionArea} from "@mui/material";

export default function ProductsList(){
    let navigate = useNavigate();   //페이지 이동을 위해필요.
    const { showModal } = useModal();
    const {loggedIn , user } = useContext(LoginContext);
    const [orders , setOrders] = useState<OrdersProps[]>([])
    const [imgs , setImgs] = useState<string[]>([])


    const [page, setPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);


    useEffect(()=>{
        fetchData();
    } , [page]);



    // API를 호출하는 부분
    const fetchData = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get( process.env.REACT_APP_SERVER_HOST_API + '/orders' , {params : {user_id : user.id ,  _rel : 'details',_sort:'rgstr_time',_order:'DESC',_limit: 5,_page: page ,_exceptcols : 'content'}})


            const newData = response.data.map(
                (orders:OrdersProps) => ({
                      id                        : orders.id
                    , user_id                   : orders.user_id
                    , order_date                : orders.order_date
                    , order_state               : orders.order_state
                    , order_title               : orders.order_title
                    , order_price               : orders.order_price
                    , rgstr_id                  : orders.rgstr_id
                    , rgstr_time                : orders.rgstr_time
                    , mdfr_id                   : orders.mdfr_id
                    , mdfr_time                 : orders.mdfr_time
                    , addr                      : orders.addr
                    , addrDetail                : orders.addrDetail
                    , zipNo                     : orders.zipNo
                    , recipient_name            : orders.recipient_name
                    , recipient_phone_number    : orders.recipient_phone_number
                    , details                   : orders.details

                })
            )
            // 불러온 데이터를 배열에 추가
            setOrders((prevData) => [...prevData, ...newData]);



        } catch (error) {
            console.log(error);
        }
        setIsLoading(false);
    };




    const handleObserver = (entries: IntersectionObserverEntry[]) => {
        const target = entries[0];
        if (target.isIntersecting && !isLoading) {
            setPage((prevPage) => prevPage + 1);
        }
    };
    useEffect(() => {
        const observer = new IntersectionObserver(handleObserver, {
            threshold: 0, //  Intersection Observer의 옵션, 0일 때는 교차점이 한 번만 발생해도 실행, 1은 모든 영역이 교차해야 콜백 함수가 실행.
        });
        // 최하단 요소를 관찰 대상으로 지정함
        const observerTarget = document.getElementById("observer");
        // 관찰 시작
        if (observerTarget) {
            observer.observe(observerTarget);
        }
    }, []);


    const productsAdd = (e:React.MouseEvent<HTMLOrSVGElement>) => {  //li클릭 이벤트
        navigate(String("/productsAdd"))
    }


    return(
        <>

            <Container component="main" maxWidth="md">
                <Typography variant="h5" >
                    주문목록
                </Typography>
                { orders &&
                orders.map( (order, index ,array) => {
                    return(

                        <OrderBody key={index} order={order}></OrderBody>
                    )
                })


                }

                {isLoading && <p>Loading...</p>}

                <div id="observer" style={{ height: "10px" }}></div>


            </Container>
        </>
    )
}