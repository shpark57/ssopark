

import axios from 'axios';
import React, { useEffect, useState ,useContext} from 'react';
import { useParams ,useNavigate} from 'react-router-dom';
import ReactPlayer from 'react-player/lazy';    //비디오플레이어
import Plyr from 'react-plyr';
import './moviesView.css'
import Button from '@mui/material/Button';

import * as Time from 'src/types/time'

import {Container , Grid, Box , TextField} from '@mui/material';
import { LoginContext } from 'src/contexts/login'
import useModal from "src/components/modal/hooks/useModal";
import DeleteIcon from '@mui/icons-material/Delete';

import CommentComponent from 'src/components/comment/CommentComponent'



const MoviesView = () =>{  
    
    interface Movie {
        id: number,
        title: string,
        content: string,
        genre: string,
        tag: string,
        visits: number,
        use_yn: string,
        like: number,
        dis_like: number,
        rgstr_id: string,
        rgstr_time:string,
        mdfr_id: string,
        mdfr_time: string
    }

    const {id} = useParams();
    const { user } = useContext(LoginContext);
    const { showModal } = useModal();   
    const [movie , setMovie] = useState<Movie|null>(null)
    const [rerend,setRerend] = useState(false)
    const getMovie = () => {
        axios.get( '/Movies/'+id+'?use_yn=Y')
        .then(res =>{
            setMovie(res.data)
        })
    }
    useEffect(() => {
        getMovie()
    },[])  

    
    const handleVideo = () => {
        console.log("끝")
    }

    const [videoUrl ,setVideoUrl ] = useState('')
    const getVideoUrl = () =>{
        axios.get( '/Files?parent_id='+ id +'&Type=Movies&type_detail=video&_limit=1')
        .then(res=>{
            setVideoUrl('/fileService/read/'+res.data[0].id)
        })
    }
    useEffect(() => {
        getVideoUrl()
    },[])  


    const Video = () =>{
        return(
            <>
                <div className='player-wrapper'>
                    <ReactPlayer
                        className='react-player'
                        url={videoUrl}    // 플레이어 url
                        width='800px'         // 플레이어 크기 (가로)
                        height='500px'        // 플레이어 크기 (세로)
                        playing={true}        // 자동 재생 on
                        muted={true}          // 자동 재생 on
                        controls={true}       // 플레이어 컨트롤 노출 여부
                        light={false}         // 플레이어 모드
                        pip={true}            // pip 모드 설정 여부
                        poster={'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/BigBuckBunny.jpg'}   // 플레이어 초기 포스터 사진
                        onEnded={() => handleVideo()}  // 플레이어 끝났을 때 이벤트
                    />
                </div>
            </>
        )
    }
    

    const LikeButton = ( {type} : any ) =>{
        return <button  id={type}   className={'movieButton '+ type} onClick={likeClick}> {movie &&  (type=='좋아요'? movie.like : movie.dis_like).toLocaleString()}<br/>{type}</button>
    }
    const likeClick = async  (event: React.FormEvent<HTMLButtonElement>) => {
        event.preventDefault();
        const target_type = event.currentTarget.getAttribute('id') == '좋아요' ?  'like':'dis_like' //좋아요, 싫어요 구분


        const likeCheck =  await axios.get( '/Likes?parent_id='+id+'&type=Movies&rgstr_id='+user.user_id)       // 중복 등록인지 체크

        if(likeCheck.data.length ==0) {
            const saveLike =  await axios.post( '/Likes',{parent_id:id ,type:'Movies' ,rgstr_id : user.user_id, like_type:target_type }) //좋아요 , 싫어요 등록
        

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

        const getLikeCnt =  await axios.get( '/Likes?parent_id='+id+'&type=Movies&like_type='+target_type)
        let params:any ={}
        params[target_type] = getLikeCnt.data.length
        axios.patch( '/Movies/'+id,params).then(res=>{
            getMovie()

        })

    }    




    return (
      <Container component="main" maxWidth="lg" className='movie' sx={{ mb: 8}} >
        
        <Grid container spacing={3} sx={{ mb: 5}} >
            <Grid item xs={5} container justifyContent="flex-start" sx={{ mt: 3}}>
                <h3 className="movieTitle">{movie?.title}</h3>
            </Grid>

            <Grid item xs={6}  container  justifyContent="flex-end" sx={{ mt: 7 }}>
               방문자 수 : {movie?.visits}
            </Grid>

            <Grid item xs={12} container  justifyContent="flex-start" sx={{ mt: -9 , ml:7 }}>
                <h5>{ movie?.rgstr_id}|</h5>  <h6>{movie && Time.toDateString(movie.rgstr_time) }</h6>
            </Grid>



            <Grid item xs={12} sx={{alignItems: 'center'}} >
                <Box
                    sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    }}
                >
                    {Video()}
                </Box>
            </Grid>

            <Grid item xs={1}>
            </Grid>
            <Grid item xs={10}>

                <Box
                    sx={{
                    marginTop: 5,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'left',
                    }}
                >
                    <div className='movieContent'>
                        { movie?.content}
                    </div>
                </Box>
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
                        <LikeButton type='좋아요' /> <LikeButton type='싫어요'/><br/>
                    </Grid>
                   
                </Box>
            </Grid>
        </Grid>


        <CommentComponent parent_id={Number(id)} type={'Movies'} />

        
      </Container>
    )
}

export default MoviesView;