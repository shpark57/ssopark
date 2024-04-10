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

export default function ProductsList(){
    let navigate = useNavigate();   //페이지 이동을 위해필요.
    const { showModal } = useModal();
    const {loggedIn , user } = useContext(LoginContext);
    const [products , setProducts] = useState<ProductProps[]>([])
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
            const response = await axios.get('/Products' , {params : {use_yn: 'Y',_sort:'id',_order:'DESC',_limit: 3,_page: page ,_exceptcols : 'content'}})


            const newData = response.data.map(
                (product:ProductProps) => ({
                    id :product.id
                    , like : product.like
                    , dis_like : product.dis_like
                    , price : product.price
                    , product_nm : product.product_nm
                    ,rgstr_id:product.rgstr_id
                    ,rgstr_time:product.rgstr_time
                    ,content:product.content
                    ,use_yn:product.use_yn
                    ,product_type:product.product_type
                    ,cnt:product.cnt
                    ,title_img : product.title_img
                    ,visits : product.visits
                })
            )
            // 불러온 데이터를 배열에 추가
            setProducts((prevData) => [...prevData, ...newData]);



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
                { products &&
                    products.map( (product, index ,array) => {
                        return(
                            <ProductBody key={index} id={product.id} like={product.like} dis_like={product.dis_like} price={product.price} product_nm={product.product_nm} product_type={product.product_type} rgstr_id={product.rgstr_id} rgstr_time={product.rgstr_time} content={product.content} use_yn={product.use_yn} cnt={product.cnt} mdfr_id={product.rgstr_id} mdfr_time={product.rgstr_time }  title_img = {product.title_img} visits = {product.visits}></ProductBody>

                        )
                  })


                }

                {isLoading && <p>Loading...</p>}

                <div id="observer" style={{ height: "10px" }}></div>
                {   user.auth == 'admin' ?
                        <div style={{textAlign:"right",position: "sticky", bottom: "20px",opacity : 0.5}}>
                        <AddCircleIcon  sx={{fontSize : 70}}  onClick={productsAdd} style={{ cursor : 'pointer'}} />
                        </div>
                    : ''


                }

            </Container>
        </>
    )
}