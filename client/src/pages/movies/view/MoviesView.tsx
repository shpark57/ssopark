

import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams ,useNavigate} from 'react-router-dom';
import ReactPlayer from 'react-player/lazy';    //비디오플레이어
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

    const [movie , setMovie] = useState<Movie|null>(null)
    useEffect(() => {
        axios.get('/Movies/'+id+'?use_yn=Y')
        .then(res =>{
            console.log(res.data)
            setMovie(res.data)
        }).then(res=> console.log({movie}))
    
    },[])  

    
    const [comments , setComments] = useState<Comment[]|null>([])
    useEffect(() => {
        axios.get('/Comment?parent_id='+id+'&_rel=children&parent_comment_id=null')
        .then(res =>{
            setComments(res.data)
        }).then(res=> console.log({comments}))
    
    },[])  

    const handleVideo = () => {
        console.log("끝")
    }

    useEffect(() => {
        axios.get('/fileService/movie/read/'+id)
        .then(res=>console.log(res))
    
    },[])  


    const Video = () =>{
        return(
            <>
                <h2>Player Test</h2>
                <div className='player-wrapper'>
                    <ReactPlayer
                        className='react-player'
                        url={'/fileService/movie/read/'}    // 플레이어 url
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
    



    return (
        <div>
            
            <div>영화 아이디  :{movie && movie.id        }</div>      <br/>
            <div>영화 제목 :{movie && movie.title     }</div>   <br/>
            <div>영화 내용 :{movie && movie.content   }</div>   <br/>
            <div>영화 장르 :{movie && movie.genre     }</div>   <br/>
            <div>영화 태그 :{movie && movie.tag       }</div>   <br/>
            <div>영화 방문자수 :{movie && movie.visits    } </div>  <br/>
            <div>영화 사용여부 :{movie && movie.use_yn    } </div>  <br/>
            <div>영화 좋아요 :{movie && movie.like      } </div>  <br/>
            <div>영화 싫어요 :{movie && movie.dis_like  } </div>  <br/>
            <div>영화 등록자 :{movie && movie.rgstr_id  } </div>  <br/>
            <div>영화 등록시간 :{movie && movie.rgstr_time} </div>  <br/>
            <div>영화 수정자 :{movie && movie.mdfr_id   } </div>  <br/>
            <div>영화 수정시간 :{movie && movie.mdfr_time } </div>  <br/>

             {
                comments?.map(comment=>{
                    return(
                        <div>
                            <div>코멘트 아이디 :{comment.id } </div>  <br/>
                            <div>코멘트 상위아이디 :{comment.parent_id } </div>  <br/>
                            <div>코멘트 타입 :{comment.type } </div>  <br/>
                            <div>코멘트 타입상세 :{comment.type_detail } </div>  <br/>
                            <div>코멘트 상위댓글아이디 :{comment.parent_comment_id } </div>  <br/>
                            <div>코멘트 내용 :{comment.comment } </div>  <br/>
                            <div>코멘트 등록자ID :{comment.rgstr_id } </div>  <br/>
                            <div>코멘트 등록시간 :{comment.rgstr_time } </div>  <br/>
                            {comment?.children.map(child=>{
                                return(
                                    <div>
                                        <div>ㄴ 대댓글 아이디 :{child.id } </div>  <br/>
                                        <div>ㄴ 대댓글 상위아이디 :{child.parent_id } </div>  <br/>
                                        <div>ㄴ 대댓글 타입 :{child.type } </div>  <br/>
                                        <div>ㄴ 대댓글 타입상세 :{child.type_detail } </div>  <br/>
                                        <div>ㄴ 대댓글 상위댓글아이디 :{child.parent_comment_id } </div>  <br/>
                                        <div>ㄴ 대댓글 내용 :{child.comment } </div>  <br/>
                                        <div>ㄴ 대댓글 등록자ID :{child.rgstr_id } </div>  <br/>
                                        <div>ㄴ 대댓글 등록시간 :{child.rgstr_time } </div>  <br/>
                                    </div>
                                )
                             })
                            }
                        </div>
                    )
                })
             }
             {Video()}
        </div>
    )
}

export default MoviesView;