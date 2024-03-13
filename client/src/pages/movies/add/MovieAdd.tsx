
import React , {useState, useEffect,useContext , useCallback} from 'react';
import { LoginContext } from 'src/contexts/login'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import * as Time from 'src/types/time'

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import TextareaAutosize from '@mui/material/TextareaAutosize'
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import FileUpload from 'src/components/fileUpload/FileUpload';
import useModal from "src/components/modal/hooks/useModal";

import Loading from 'src/components/loding/Loding';


const MovieAdd = () => {

const [loading, setLoading] = useState(false);

  const { showModal } = useModal();   
  let navigate = useNavigate();   //페이지 이동을 위해필요.
  const {loggedIn , user } = useContext(LoginContext);


  interface IFileTypes {
    id: number;
    object: File;
  }

  
  const [movieFiles, setMovieFiles] = useState<IFileTypes[]>([]);   //file 변수


  const movieUploadModal = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    showModal({
      modalType: "DefaultModal",
      modalProps: {
        message : ( <FileUpload  mulit ={true} parentCallBack={movieParentCallBack} accept={"video/*"}/>),
        title: "",

      }
    });
  };
  function movieParentCallBack(files:IFileTypes[]){
    setMovieFiles(files)
  }

  const MovieDelFilterFile = useCallback(
    (id: number): void => {
      setMovieFiles(movieFiles.filter((file: IFileTypes) => file.id !== id));
    },
    [movieFiles]
  );

  const [subtitleFiles, setSubtitleFiles] = useState<IFileTypes[]>([]);   //file 변수
 
  const subtitleUploadModal = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    showModal({
      modalType: "DefaultModal",
      modalProps: {
        message : ( <FileUpload  mulit ={false} parentCallBack={subtitleParentCallBack}  accept={"video/*"}/>),
        title: "",

      }
    });
  };
  function subtitleParentCallBack(files:IFileTypes[]){
    setSubtitleFiles(files)
  }

  const SubtitleDelFilterFile = useCallback(
    (id: number): void => {
      setSubtitleFiles(subtitleFiles.filter((file: IFileTypes) => file.id !== id));
    },
    [subtitleFiles]
  );


  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    if( data.get('title') == ''){
               
      showModal({
        modalType: "AlertModal",
        modalProps: {
          message: "제목은 필수값 입니다."
        }
      });
      return
    }
    if( data.get('내용은 필수값 입니다.') == ''){
               
      showModal({
        modalType: "AlertModal",
        modalProps: {
          message: "제목을 입력해야합니다."
        }
      });
      return
    }


    const params = {
      title     : data.get('title'),
      content   : data.get('content'),
      genre     : data.get('genre'),
      tag       : data.get('tag'),
      rgstr_id  : user.user_id,
      mdfr_id   : user.user_id,
    }
    

    
    try {
    setLoading(true);  
    const resMovies = await axios.post("/Movies" , params)    

    let formData = new FormData();
    const config = {
      headers: {
        "content-type": "multipart/form-data"
      }
    };
    for(let i  in movieFiles){
      formData.append('files', movieFiles[i].object)

      formData.append('files_params['+i+'].parent_id', resMovies.data.id)
      formData.append('files_params['+i+'].type', 'Movies')
      formData.append('files_params['+i+'].type_detail', 'video')
      formData.append('files_params['+i+'].ymd', Time.getYmd() )
      formData.append('files_params['+i+'].origin_name', movieFiles[i].object.name.split('.')[0])
      formData.append('files_params['+i+'].change_name', '')
      formData.append('files_params['+i+'].file_type', movieFiles[i].object.name.split('.')[1])
      formData.append('files_params['+i+'].size', String(movieFiles[i].object.size))
    }

    
    axios.post('/fileService/upload/Movies',formData ,config) // Movies 타입은 테이블명. 이게 폴더명으로 변경 됨
    .then(res=>{

      let formData = new FormData();
      for(let i  in subtitleFiles){
        formData.append('files', subtitleFiles[i].object )
  
        formData.append('files_params['+i+'].parent_id', resMovies.data.id)
        formData.append('files_params['+i+'].type', 'Movies')
        formData.append('files_params['+i+'].type_detail', 'video')
        formData.append('files_params['+i+'].ymd', Time.getYmd() )
        formData.append('files_params['+i+'].origin_name', subtitleFiles[i].object.name.split('.')[0])
        formData.append('files_params['+i+'].change_name', '')
        formData.append('files_params['+i+'].file_type', subtitleFiles[i].object.name.split('.')[1])
        formData.append('files_params['+i+'].size', String(subtitleFiles[i].object.size))
      }
    
      axios.post('/fileService/upload/Movies',formData ,config) // Movies 타입은 테이블명. 이게 폴더명으로 변경 됨
      .then(res=>{setLoading(false)})
      .then(res => navigate(String("/MoviesList")))
      .catch(err=>console.log(err))
    }) .catch(err=>console.log(err)) // 영상등록

  } catch (error) {
      setLoading(false);
      showModal({
        modalType: "AlertModal",
        modalProps: {
          message: "영화등록에 실패했습니다."
        }
      });    
  }
  };

  return (
      <Container component="main" maxWidth="lg">
      {loading ? <Loading/> : null}
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="title"
                  label="제목"
                  name="title"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="content"
                  label="내용"
                  name="content"
                  variant="outlined"
                  multiline
                  minRows={10}
                />
              </Grid>
              

              <Grid item xs={12} sm={8}>
                <div className="FileUpload-Files">
                    {movieFiles.length > 0 &&
                      movieFiles.map((file: IFileTypes) => {
                        const {
                          id,
                          object: { name }
                        } = file;

                        return (
                          <div key={id}>
                            <div>{name}</div>
                            <div
                              className="FileUpload-Files-Filter"
                              onClick={() => MovieDelFilterFile(id)}
                            >
                              X
                            </div>
                          </div>
                        );
                      })}
                </div>
              </Grid>
              
              <Grid item xs={12} sm={4} container  justifyContent="flex-end">
                  <Button
                    variant="contained"
                    sx={{ mr: 3 ,mt: 1 }}
                    onClick={movieUploadModal}
                    style={{height : '40px' }}
                  >
                    영상
                  </Button>
              </Grid>
              

              <Grid item xs={12} sm={8}>
                <div className="FileUpload-Files">
                    {subtitleFiles.length > 0 &&
                      subtitleFiles.map((file: IFileTypes) => {
                        const {
                          id,
                          object: { name }
                        } = file;

                        return (
                          <div key={id}>
                            <div>{name}</div>
                            <div
                              className="FileUpload-Files-Filter"
                              onClick={() => SubtitleDelFilterFile(id)}
                            >
                              X
                            </div>
                          </div>
                        );
                      })}
                </div>
              </Grid>
              
              <Grid item xs={12} sm={4} container  justifyContent="flex-end">
                  <Button
                    variant="contained"
                    sx={{ mr: 3 ,mt: 1 }}
                    style={{height : '40px' }}
                    onClick={subtitleUploadModal}
                  >
                    자막
                  </Button>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="genre"
                  label="장르"
                  name="genre"
                  autoComplete="genre"
                />
              </Grid>              
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="tag"
                  label="태그"
                  name="tag"
                  autoComplete="tag"
                />
              </Grid>       
             
            </Grid>

            <Grid container justifyContent="flex-end">
              <Button
                type="submit"
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                등록
              </Button>
            </Grid>
          </Box>
        </Box>
      </Container>
  );
}

export default  MovieAdd;