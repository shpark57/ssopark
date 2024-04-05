
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

const ProductAdd = () => {


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
        message : ( <FileUpload  mulit ={true} parentCallBack={productParentCallBack}  accept={"image/*"}/>),
        title: "",

      }
    });
  };
  function productParentCallBack(files:IFileTypes[]){
    var fr = new FileReader();
    if(files.length > 0){
      console.log(fr.readAsBinaryString(files[0].object))
    }

    setImgFiles(files)
  }

  const productDelFilterFile = useCallback(
    (id: number): void => {
      setImgFiles(imgFiles.filter((file: IFileTypes) => file.id !== id));
    },
    [imgFiles]
  );

  const [subtitleFiles, setSubtitleFiles] = useState<IFileTypes[]>([]);   //file 변수

  const subtitleUploadModal = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    showModal({
      modalType: "DefaultModal",
      modalProps: {
        message : ( <FileUpload  mulit ={false} parentCallBack={subtitleParentCallBack}  accept={"image/*"}/>),
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


  const editorRef =  useRef<Editor>(null)  ;
  const onChange = () => {
    const data = editorRef.current?.getInstance().getHTML();
    console.log(data);
  };
  class getEditorHtml{
    html = editorRef.current?.getInstance().getHTML();
    markdown = editorRef.current?.getInstance().getMarkdown();
  }
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>)  => {

    let editData = new getEditorHtml();


    console.log(editData.html)
    console.log(editData.markdown)
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
      product_nm     : data.get('product_nm'),
      product_type   : data.get('product_type'),
      price     : data.get('price'),
      content       : editData.html,
      cnt       : data.get('cnt'),
      rgstr_id  : user.user_id,
      mdfr_id   : user.user_id,
    }



    try {
    setLoading(true);
    const resProducts = await axios.post("/Products" , params)

    let formData = new FormData();
    const config = {
      headers: {
        "content-type": "multipart/form-data"
      }
    };
    for(let i  in imgFiles){
      formData.append('files', imgFiles[i].object)

      formData.append('files_params['+i+'].parent_id', resProducts.data.id)
      formData.append('files_params['+i+'].type', 'Products')
      formData.append('files_params['+i+'].type_detail', 'poto')
      formData.append('files_params['+i+'].ymd', Time.getYmd() )
      formData.append('files_params['+i+'].origin_name', imgFiles[i].object.name.split('.')[0])
      formData.append('files_params['+i+'].change_name', '')
      formData.append('files_params['+i+'].file_type', imgFiles[i].object.name.split('.')[1])
      formData.append('files_params['+i+'].size', String(imgFiles[i].object.size))
    }


    axios.post('/fileService/upload/Products',formData ,config) // Products 타입은 테이블명. 이게 폴더명으로 변경 됨
    .then(res=>{

      let formData = new FormData();
      for(let i  in subtitleFiles){
        formData.append('files', subtitleFiles[i].object )

        formData.append('files_params['+i+'].parent_id', resProducts.data.id)
        formData.append('files_params['+i+'].type', 'Products')
        formData.append('files_params['+i+'].type_detail', 'poto')
        formData.append('files_params['+i+'].ymd', Time.getYmd() )
        formData.append('files_params['+i+'].origin_name', subtitleFiles[i].object.name.split('.')[0])
        formData.append('files_params['+i+'].change_name', '')
        formData.append('files_params['+i+'].file_type', subtitleFiles[i].object.name.split('.')[1])
        formData.append('files_params['+i+'].size', String(subtitleFiles[i].object.size))
      }

      axios.post('/fileService/upload/Products',formData ,config) // Products 타입은 테이블명. 이게 폴더명으로 변경 됨
      .then(res=>{setLoading(false)})
      .then(res => navigate(String("/ProductsList")))
      .catch(err=>console.log(err))
    }) .catch(err=>console.log(err)) // 영상등록

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


  return (

      <Container component="main" maxWidth="md">
      {loading ? <Loading/> : null}
        <Box>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>

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
                  id="content"
                  label="내용"
                  name="content"
                  variant="outlined"
                  multiline
                  minRows={10}
                />
              </Grid>
              <Grid item xs={12}>
                <Editor
                    initialValue="hello react editor world!"
                    previewStyle="vertical"
                    height="600px"
                    ref={editorRef}
                    onChange={onChange}
                    initialEditType="wysiwyg"
                    useCommandShortcut={true}
                    language="ko-KR"
                />
              </Grid>
              <Grid item xs={12} sm={8}>
                <div className="FileUpload-Files">
                    {imgFiles.length > 0 &&
                      imgFiles.map((file: IFileTypes) => {
                        const {
                          id,
                          object: { name }
                        } = file;

                        return (
                          <div key={id}>
                            <div>{name}</div>
                            <div
                              className="FileUpload-Files-Filter"
                              onClick={() => productDelFilterFile(id)}
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
                    onClick={fileUploadModal}
                    style={{height : '40px' }}
                  >
                    이미지
                  </Button>
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