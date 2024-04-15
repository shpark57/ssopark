

import axios from 'axios';
import React, {useEffect, useState, useContext, useRef} from 'react';
import { useParams ,useNavigate} from 'react-router-dom';
import ReactPlayer from 'react-player/lazy';    //비디오플레이어
import Plyr from 'react-plyr';
import './ProductsView.css'
import Button from '@mui/material/Button';

import * as Time from 'src/types/time'

import {Container, Grid, Box, TextField, CardActionArea} from '@mui/material';
import { LoginContext } from 'src/contexts/login'
import useModal from "src/components/modal/hooks/useModal";
import DeleteIcon from '@mui/icons-material/Delete';

import CommentComponent from 'src/components/comment/CommentComponent'


import {ProductProps} from 'src/pages/producrs/props/ProductProps'
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import TuiViewer from "src/components//Tui/TuiViewer";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import {Editor} from "@toast-ui/react-editor";
import EditIcon from '@mui/icons-material/Edit';
const ProductsView = () =>{


    window.scrollTo(0,0)
    const {id} = useParams();
    const { loggedIn , user } = useContext(LoginContext);
    const { showModal } = useModal();   
    const [product , setProduct] = useState<ProductProps|null>(null)
    const [rerend,setRerend] = useState(false)
    const getProduct = () => {
        axios.get('/Products/'+id+'?use_yn=Y')
        .then(res =>{
            setProduct(res.data)
        })
    }
    useEffect(() => {
        getProduct()
    },[])  

    
    const handleVideo = () => {
        console.log("끝")
    }


    const LikeButton = ( {type} : any ) =>{
        return <button  id={type}   className={'productButton '+ type} onClick={likeClick}> {product &&  (type=='좋아요'? product.like : product.dis_like).toLocaleString()}<br/>{type}</button>
    }
    const likeClick = async  (event: React.FormEvent<HTMLButtonElement>) => {
        if(!loggedIn){
            showModal({
                modalType: "AlertModal",
                modalProps: {
                    message: "로그인을 해야 좋아요 표현을 할 수 있습니다.."
                }
            });
            return
        }

        event.preventDefault();
        const target_type = event.currentTarget.getAttribute('id') == '좋아요' ?  'like':'dis_like' //좋아요, 싫어요 구분


        const likeCheck =  await axios.get('/Likes?parent_id='+id+'&type=Products&rgstr_id='+user.user_id)       // 중복 등록인지 체크

        if(likeCheck.data.length ==0) {
            const saveLike =  await axios.post('/Likes',{parent_id:id ,type:'Products' ,rgstr_id : user.user_id, like_type:target_type }) //좋아요 , 싫어요 등록
        

        }else if(likeCheck.data.length > 0){
            console.log(likeCheck.data[0])
            if(likeCheck.data[0].like_type == target_type){
                const likeDel =  await axios.delete('/Likes/'+likeCheck.data[0].id)
          
            }else{
                showModal({
                    modalType: "AlertModal",
                    modalProps: {
                      message: "중복!"
                    }
                  });
            }
        }else{
            console.log('에러인듯')
            return
        }

        const getLikeCnt =  await axios.get('/Likes?parent_id='+id+'&type=Products&like_type='+target_type)
        let params:any ={}
        params[target_type] = getLikeCnt.data.length
        axios.patch('/Products/'+id,params).then(res=>{
            getProduct()

        })

    }
    let navigate = useNavigate();   //페이지 이동을 위해필요.

    const goProductsModify = async (e : React.MouseEvent<any>) => {

        navigate(String("/ProductsModify/"+ id))
    }
    return (
      <Container component="main" maxWidth="lg" className='product' sx={{ mb: 8}} >
        
        <Grid container spacing={3} sx={{ mb: 5}} >
            <Grid item xs={5} container justifyContent="flex-start" sx={{ mt: 3}}>
                <h3 className="productTitle">{product?.product_nm}</h3>   <h6 style={{color : 'silver'}}>{product?.product_type}</h6>
            </Grid>

            <Grid item xs={6}  container  justifyContent="flex-end" sx={{ mt: 7 }}>
               방문자 수 : {product?.visits}
            </Grid>

            <Grid item xs={12} container  justifyContent="flex-start" sx={{ mt: -9 , ml:7 }}>
                <h5>{ product?.rgstr_id}|</h5>  <h6>{product && Time.toDateString(product.rgstr_time) }</h6>
            </Grid>



            <Grid item xs={12} sx={{alignItems: 'center'}} >
                <Box
                    sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    }}
                >
                </Box>
            </Grid>

            <Grid item xs={12} sx={{alignItems: 'center'}} >
                <CardMedia
                    component="img"
                    image={product?.title_img}
                    style={{
                        left : '0'
                        ,right : '0'
                        ,margin: '10px auto'
                    }}
                    sx={{height : 300 , objectFit: 'scale-down'}}
                />

                <CardContent >
                    <Typography gutterBottom variant="h5" >
                        {product?.product_type}
                    </Typography>

                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <Typography variant="h6" color="red" align="left" >
                                {product?.price.toLocaleString('ko-KR')} 원
                            </Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography  variant="h6" align ="right" >
                                남은 개수 : {product?.cnt}
                            </Typography>
                        </Grid>
                    </Grid>

                </CardContent>

            </Grid>


            <Grid item xs={12} container justifyContent="center">
                {  product ?  <div  dangerouslySetInnerHTML={ {__html : product?.content} }></div>: ''

                }
            </Grid>

            
            <Grid item xs={12}>
                <Box
                    sx={{
                    marginTop: 5,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    }}
                >
                    
                    <Grid item xs={12}>
                        <LikeButton type='좋아요' />
                    </Grid>
                   
                </Box>
            </Grid>
        </Grid>


        <CommentComponent parent_id={Number(id)} type={'Products'} />

          <Grid item xs={12} style={{textAlign:"center",position: "sticky", bottom: "0"  , zIndex : '999' , height : ''}}>
              <div  >
                  <Button
                      variant="contained"
                      sx={{fontSize : 20}}
                      style={{ height : '50px' , margin : '10px'}}

                  >
                      장바구니
                  </Button>
                  <Button
                      variant="contained"
                      sx={{fontSize : 20}}
                      style={{ height : '50px'  , margin : '10px'}}

                  >
                      구매하기
                  </Button>
              </div>
          </Grid>
          { user.auth == 'admin' ?   <div
              style={{textAlign:"right",position: "sticky", bottom: "0", zIndex : '999', opacity : 0.5,  height : ''}}>
              <EditIcon  onClick={goProductsModify}  sx={{fontSize : 30}}   style={{ cursor : 'pointer'}} />

          </div> : ''

          }

      </Container>
    )
}

export default ProductsView;