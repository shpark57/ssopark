
import React, {useState, useEffect, useContext, useCallback, useRef} from 'react';
import { LoginContext } from 'src/contexts/login'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import * as Time from 'src/types/time'

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

import FileUpload from 'src/components/fileUpload/FileUpload';
import useModal from "src/components/modal/hooks/useModal";

import Loading from 'src/components/loding/Loding';


import 'src/pages/producrs/add/ProductAdd.css'


import '@toast-ui/editor/dist/toastui-editor.css';
import {Editor,  EditorProps} from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/i18n/ko-kr';
import CardMedia from "@mui/material/CardMedia";
import {CardActionArea} from "@mui/material";

const ProductAdd = () => {
  window.scrollTo(0,0)


const [loading, setLoading] = useState(false);

  const { showModal } = useModal();
  let navigate = useNavigate();   //페이지 이동을 위해필요.
  const {loggedIn , user } = useContext(LoginContext);


  interface IFileTypes {
    id: number;
    object: File;
  }


  const [imgFiles, setImgFiles] = useState<IFileTypes[]>([]);   //file 변수


  const fileUploadModal = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    showModal({
      modalType: "DefaultModal",
      modalProps: {
        message : ( <FileUpload  mulit ={false} parentCallBack={productParentCallBack}  accept={"image/*"}/>),
        title: "",

      }
    });
  };

  var fr = new FileReader();
  const [titleImg, setTitleImg] = useState("");
  fr.addEventListener("load", function(){
    // @ts-ignore
    setTitleImg(this.result);
  });

  function productParentCallBack(files:IFileTypes[]){
    if(files.length > 0){
      fr.readAsDataURL(files[0].object)
    }else{
      setTitleImg("");
    }

    setImgFiles(files)
  }


  const productDelFilterFile = useCallback(
      (id: number): void => {

        setTitleImg("");
        setImgFiles(imgFiles.filter((file: IFileTypes) => file.id !== id));
      },
      [imgFiles]
  );

  const editorRef =  useRef<Editor>(null);


  const handleSubmit = (event: React.FormEvent<HTMLFormElement>)  => {
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
    if( titleImg == ''){

      showModal({
        modalType: "AlertModal",
        modalProps: {
          message: "대표이미지를 등록해야 합니다."
        }
      });
      return
    }





    try {
      window.scrollTo(0,0)
      setLoading(true);



      let formData = new FormData();
      const config = {
        headers: {
          "content-type": "multipart/form-data"
        }
      };

      formData.append('file', imgFiles[0].object)
      formData.append('type', 'Products')
      formData.append('type_detail', 'image')
      formData.append('ymd', Time.getYmd() )
      formData.append('origin_name', imgFiles[0].object.name)
      formData.append('file_type',  imgFiles[0].object.name.split('.')[1] )
      formData.append('size', String(imgFiles[0].object.size))


      axios.post( process.env.REACT_APP_SERVER_HOST + '//fileService/tuiHook/Products',formData ,config)
          .then(res => {


            const params = {
              product_nm      : data.get('product_nm'),
              product_type    : data.get('product_type'),
              price           : data.get('price'),
              content         : editorRef.current?.getInstance().getHTML(),
              cnt             : data.get('cnt'),
              rgstr_id        : user.user_id,
              mdfr_id         : user.user_id,
              title_img       : res.data.message
            }


            axios.post( process.env.REACT_APP_SERVER_HOST + "/Products" , params)
                .then(res=>{setLoading(false)})
               /* .then(res => {

                  axios.post( process.env.REACT_APP_SERVER_HOST + "/fileService/reallyChange" ,{
                    text : params.title_img+ params.content   //text 에는 이미지 전부 텍스트로 합쳐서 보낸다.
                    ,type : 'Products'

                  } )
                }) //tmp로 생성해둔 파일을 Products 로 변경하면서 파일위치도 변경해야함.*/
                .then(res => navigate(String("/ProductsList"))).catch(err=>console.log(err))
          })



    } catch (error) {
        setLoading(false);
        showModal({
          modalType: "AlertModal",
          modalProps: {
          message: "파일 등록에 실패했습니다."
        }
      });
    }

  };


  const onUploadImage = async (blob:any, callback:any) => {
    let formData = new FormData();
    const config = {
      headers: {
        "content-type": "multipart/form-data"
      }
    };

    formData.append('file', blob)
    formData.append('type', 'Products')
    formData.append('type_detail', 'image')
    formData.append('ymd', Time.getYmd() )
    formData.append('origin_name', blob.name)
    formData.append('file_type',  blob.name.split('.')[1] )
    formData.append('size', String(blob.size))


    axios.post( process.env.REACT_APP_SERVER_HOST + '//fileService/tuiHook/Products',formData ,config)
        .then(res => {
          callback(res.data.message ,'img')
        })

    return false;
  };

  return (

      <Container component="main" maxWidth="md">
      {loading ? <Loading/> : null}
        <Box>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} container justifyContent="center">

                <div style={{ height : '300px' , textAlign:'center'}}>
                  {
                    imgFiles.length > 0

                        ? imgFiles.map((file: IFileTypes) => {
                          const {id,object: { name }} = file;

                          return (
                              <div key={id}>
                                <CardMedia
                                    component="img"
                                    image={titleImg}
                                    style={{
                                      left : '0'
                                      ,right : '0'
                                    }}
                                    sx={{height : 280}}
                                />
                                <span style={{ cursor : 'pointer'}}

                                    onClick={() => productDelFilterFile(id)}
                                > X </span>
                              </div>
                          );
                        })

                        : <Button
                            variant="outlined"
                            sx={{ mr: 3 ,mt: 1 }}
                            onClick={fileUploadModal}
                            style={{ top : '110px' }}

                        >
                          대표 이미지
                        </Button>

                  }
                </div>



              </Grid>

                  <Grid item xs={12}>
                    <TextField
                        required
                        fullWidth
                        id="product_nm"
                        label="상품명"
                        name="product_nm"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                        required
                        fullWidth
                        id="product_type"
                        label="상품 종류"
                        name="product_type"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                        required
                        fullWidth
                        id="price"
                        label="가격"
                        name="price"
                    />
                  </Grid>
                <Grid item xs={12}>
                  <TextField
                      required
                      fullWidth
                      id="cnt"
                      label="갯수"
                      name="cnt"
                  />
                </Grid>


              <Grid item xs={12}>
                <Editor
                    initialValue=""
                    previewStyle="vertical"
                    height="600px"
                    ref={editorRef}
                    initialEditType="wysiwyg"
                    useCommandShortcut={false}
                    language="ko-KR"
                    autofocus={false}
                    toolbarItems={[
                      ['heading', 'bold', 'strike','image'],
                      ['hr', 'quote'],
                      ['ul', 'ol', 'task'],
                      ['table',  'link'],
                      ['code', 'codeblock'],
                    ]}
                    hooks={{
                      addImageBlobHook : onUploadImage
                    }}
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

export default  ProductAdd;