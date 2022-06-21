

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



const MoviesView = () =>{  
    
    let {id} = useParams();
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
    interface Comment{
        id:number;
        parent_id:number;
        type:string;
        type_detail:string;
        parent_comment_id:number;
        comment:string;
        rgstr_id:string;
        rgstr_time:string;
        children:[{
            id:number;
            parent_id:number;
            type:string;
            type_detail:string;
            parent_comment_id:number;
            comment:string;
            rgstr_id:string;
            rgstr_time:string;
        }]
    }


    const [rerend,setRerend] = useState(false)
    const [movie , setMovie] = useState<Movie|null>(null)
    const getMovie = () => {
        axios.get('/Movies/'+id+'?use_yn=Y')
        .then(res =>{
            setMovie(res.data)
        })
    }
    useEffect(() => {
        getMovie()
    },[])  

    
    const { user } = useContext(LoginContext);
    const [comments , setComments] = useState<Comment[]|null>([])

    const [childShow , setChildShow] = useState([false])

    useEffect(() => {
        axios.get('/Comment?parent_id='+id+'&_rel=children&parent_comment_id=null&_sort=rgstr_time&_order=desc')
        .then(res =>{
            setComments(res.data)
        })
    },[rerend])  

    
    const [commentCnt , setCommentCnt] = useState(0)
    useEffect(() => {
        axios.get('/Comment?parent_id='+id)
        .then(res =>{
            setCommentCnt(res.data.length)
        })
    },[rerend])  

    const { showModal } = useModal();   
    const handleVideo = () => {
        console.log("끝")
    }

    const [videoUrl ,setVideoUrl ] = useState('')
    const getVideoUrl = () =>{
        axios.get('/Files?parent_id='+ id +'&Type=Movies&type_detail=video&_limit=1')
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


        const likeCheck =  await axios.get('/Likes?parent_id='+id+'&type=Movies&rgstr_id='+user.user_id)       // 중복 등록인지 체크

        if(likeCheck.data.length ==0) {
            const saveLike =  await axios.post('/Likes',{parent_id:id ,type:'Movies' ,rgstr_id : user.user_id, like_type:target_type }) //좋아요 , 싫어요 등록
        

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

        const getLikeCnt =  await axios.get('/Likes?parent_id='+id+'&type=Movies&like_type='+target_type)
        let params:any ={}
        params[target_type] = getLikeCnt.data.length
        axios.patch('/Movies/'+id,params).then(res=>{
            getMovie()

        })

    }    

    interface myComment{
        id:number;
        parent_id:number;
        type:string;
        type_detail:string;
        parent_comment_id:number;
        comment:string;
        rgstr_id:string;
        rgstr_time:string;
    }
    const [myComment , setMyComment] = useState('')
    const inputFromHandler = (e:React.ChangeEvent<HTMLInputElement >) =>{
        setMyComment(e.target.value)
      }
    const commentInsertBtn = (event: React.FormEvent<HTMLButtonElement>) => {
        event.preventDefault();
        if(!id){return}
        const params = { parent_id : id , type : 'Movies' , comment : myComment , rgstr_id : user.user_id }
            
        axios.post('/Comment',  params ).then(res=>{
            
            showModal({
                modalType: "AlertModal",
                modalProps: {
                  message: "댓글을 등록했습니다."
                }
              });
            setMyComment('')
            setRerend(!rerend)
        })
            
        
    }
    const [childComment , setChildComment] = useState([''])
    const childInputFromHandler = (e:React.ChangeEvent<HTMLInputElement >) =>{
        e.preventDefault();
        const comment_id:number = Number(e.target.id)
        childComment[comment_id] = e.target.value
    }

    

    const commentDelete = (event :React.MouseEvent<HTMLButtonElement>) =>{
        if(!(event.target instanceof HTMLButtonElement)){ 
            return;
        }
        const comment_id = event.target.dataset.id
        
        showModal({
            modalType: "ConfirmModal",
            modalProps: {
              message: "삭제하시겠습니까?",
              confirmText: "Yes",
              cancelText: "No",
              title: "",
              handleConfirm: () => {
                axios.patch('/Comment/'+comment_id, {comment: '삭제한 댓글 입니다.'})
                .then(res=>{
                    setRerend(!rerend)
                })
              },
              handleClose: () => {
             
              }
            }
          });

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
        <Box  className="comment">

            <Grid item container spacing={3}  xs={12}>
                    <Grid item  xs={1}>
                    </Grid>
                    <Grid item  xs={10}>
                                {commentCnt} 개의 댓글
                                <hr/>
                    </Grid>
                    <Grid item  xs={1}>
                    </Grid>
            </Grid>

            <Grid item container spacing={3}  xs={12}>
                    <Grid item  xs={1}>
                    </Grid>
                    <Grid item  xs={10}>
                        <TextField
                        
                        fullWidth
                        id="content"
                        label="댓글을 입력해주세요"
                        name="content"
                        variant="outlined"
                        multiline
                        minRows={3}
                        maxRows={3}
                        value ={myComment}
                        onChange={(e:React.ChangeEvent<HTMLInputElement>) => inputFromHandler(e)}
                        />    
                        
                    <Grid container justifyContent="flex-end">
                        <Button
                            variant="contained"
                            sx={{ mt: 1, mb: 2 }}
                            onClick={commentInsertBtn}
                        >
                            등록
                        </Button>
                    </Grid>         
                    </Grid>
                    <Grid item  xs={1}>
                    </Grid>
            </Grid>

        </Box>

            <>

             {
                comments && comments.map((comment,index)=>{
                    return(
                            <Grid item container spacing={3}  xs={12}   key={'container_'+index}>
                                    <Grid item  xs={1}>
                                    </Grid>
                                    <Grid item  xs={9}>
                                        <div className="commentTitle">{comment.rgstr_id }</div>

                                        <div className="commentTime">{comment && Time.toDateString(comment.rgstr_time) }</div>
                                        
                                        <div className='commentContent'>
                                            {comment.comment }
                                        </div>
                                        <div className='replyBtn' onClick={()=>{
                                            
                                            childShow[comment.id]  = !childShow[comment.id] 
                                            
                                            setRerend(!rerend)
                                        }}>
                                            {comment.children.length > 0 ? `답글 ${comment.children.length}` : '답글 작성'}
                                        </div>
                                        <hr/>  
                                    </Grid>
                                    {   comment.rgstr_id == user.user_id && comment.comment != '삭제한 댓글 입니다.' 
                                        ?
                                            <Grid item  xs={1}>
                                                <Button onClick={commentDelete} data-id= {comment.id} > X </Button>
                                            </Grid>
                                        : ''
                                    }
                                        {  childShow[comment.id] && comment.children.map((child,index)=>{
                                            return(
                                                    <Grid item container spacing={3}  xs={12} key={'child_'+index}>
                                                            <Grid item  xs={2}>
                                                            </Grid>
                                                            <Grid item  xs={8} >
                                                                <div className="commentTitle">{child.rgstr_id }</div>
                        
                                                                <div className="commentTime">{child && Time.toDateString(child.rgstr_time) }</div>
                                                                
                                                                <div className='commentContent'>
                                                                    {child.comment }
                                                                </div>
                                                            </Grid>
                                                            {   child.rgstr_id == user.user_id && child.comment != '삭제한 댓글 입니다.' 
                                                                ?
                                                                    <Grid item  xs={1}>
                                                                        <Button onClick={commentDelete} data-id= {child.id} > X </Button>
                                                                    </Grid>
                                                                : ''
                                                            }
                                                            <Grid item  xs={2}>
                                                            </Grid>
                                                            
                                                    </Grid>
                                            )   
                                           
                                        }) 

                                    }
                                    {
                                      childShow[comment.id] ?
                                    
                                    <Grid item container spacing={3}  xs={12}>

                                        <Grid item  xs={1}>
                                        </Grid>
                                        <Grid item  xs={9}>
                                                    <TextField
                                                        fullWidth
                                                        id={String(comment.id)}
                                                        label="댓글을 입력해주세요"
                                                        name="content"
                                                        variant="outlined"
                                                        multiline
                                                        minRows={2}
                                                        //value={childComment[comment.id]}
                                                        maxRows={2}
                                                        onChange={(e:React.ChangeEvent<HTMLInputElement>) => childInputFromHandler(e)}
                                                    />    
                                                    <hr/>
                                        </Grid>
                                        <Grid item  xs={1}>
                                            <Button
                                                variant="contained"
                                                sx={{ mt: 4}}
                                                onClick={() =>{
                                                    const params = { parent_id : id , type : 'Movies' , comment : childComment[comment.id] , rgstr_id : user.user_id , parent_comment_id : comment.id }
                                                    
                                                    axios.post('/Comment' ,params).then(res=>{
                                                        childComment[comment.id] = ''
                                                        /* 이렇게 쓰면안되는데 어쩔수 없었음 */
                                                        let input:any = document.getElementById(String(comment.id))
                                                        input.value=''
                                                                                                    
                                                        showModal({
                                                            modalType: "AlertModal",
                                                            modalProps: {
                                                            message: "댓글을 등록했습니다."
                                                            }
                                                        });
                                                        setRerend(!rerend)
                                                    })

                                                }}
                                            >
                                                등록
                                            </Button>
                                        </Grid>
 
                                    
                                    </Grid>
                                    :''
                                    }
                            </Grid>
                    )
                })
             }
        </>
        
      </Container>
    )
}

export default MoviesView;