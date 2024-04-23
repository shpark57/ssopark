
import React, {useState, useEffect, useContext, useCallback, useRef} from 'react';
import { LoginContext } from 'src/contexts/login'
import {useNavigate, useParams} from 'react-router-dom';
import axios from 'axios';
import * as Time from 'src/types/time'

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

import useModal from "src/components/modal/hooks/useModal";

import Loading from 'src/components/loding/Loding';


import 'src/pages/producrs/add/ProductAdd.css'

import FileUpload from 'src/components/fileUpload/FileUpload';

import '@toast-ui/editor/dist/toastui-editor.css';
import {Editor,  EditorProps} from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/i18n/ko-kr';
import CardMedia from "@mui/material/CardMedia";
import {CardActionArea} from "@mui/material";
import {ProductProps} from 'src/pages/producrs/props/ProductProps'
import TuiEditor from "src/components/Tui/TuiEditor";
import TuiViewer from "../../../components/Tui/TuiViewer";

export default function ProductsModify() {

  window.scrollTo(0,0)

  const [loading, setLoading] = useState(false);


  const {id} = useParams();
  const [product , setProduct] = useState(

      {
        id : 0
        ,product_nm : ""
        ,product_type :""
        ,price :0
        ,content :""
        ,use_yn : ""
        ,like : 0
        ,dis_like : 0
        ,rgstr_id : ""
        ,rgstr_time : ""
        ,mdfr_id : ""
        ,mdfr_time : ""
        ,cnt : 0
        ,title_img : ""
        ,visits : 0
      }
  )
  const [rerend,setRerend] = useState(false)
  const getProduct = () => {
    axios.get( process.env.REACT_APP_SERVER_HOST + '/Products/'+id+'?use_yn=Y')
        .then(res =>{
          setProduct(res.data)
        })
  }
  useEffect(() => {
    getProduct()
  },[])



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
  fr.addEventListener("load", function(){
    // @ts-ignore

    setProduct( (prevProduct: ProductProps) => ({
      ...prevProduct ,
      title_img : this.result
    }))

  });

  function productParentCallBack(files:IFileTypes[]){
    if(files.length > 0){
      fr.readAsDataURL(files[0].object)
    }else{

      setProduct( (prevProduct: ProductProps) => ({
        ...prevProduct ,
        title_img : ""
      }))
    }

    setImgFiles(files)
  }

  const productDelFilterFile = useCallback(
      (id: number): void => {


        setProduct( (prevProduct: ProductProps) => ({
          ...prevProduct ,
          title_img :   ""
        }))


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


  const editorRef =  useRef<Editor>(null);
  // Toast-UI Editor 에 HTML 표시

  useEffect(() => {
    // @ts-ignore
    editorRef.current.getInstance().setHTML(product.content)
  }, [editorRef.current]);


  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>)  => {
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

    if( product.title_img == ''){

      showModal({
        modalType: "AlertModal",
        modalProps: {
          message: "대표이미지를 등록해야 합니다."
        }
      });
      return
    }



    const params = {
      id              : id,
      product_nm      : data.get('product_nm'),
      product_type    : data.get('product_type'),
      price           : data.get('price'),
      content         : editorRef.current?.getInstance().getHTML(),
      cnt             : data.get('cnt'),
      rgstr_id        : user.user_id,
      mdfr_id         : user.user_id,
      title_img       : product.title_img
    }

    try {
      window.scrollTo(0,0)
      setLoading(true);

      if(imgFiles.length > 0){
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




         let res = await axios.post( process.env.REACT_APP_SERVER_HOST + '//fileService/tuiHook/Products',formData ,config)
         params.title_img =res.data.message


      }

      await axios.put( process.env.REACT_APP_SERVER_HOST + "/Products/"+ id , params)
          .then(res=>{setLoading(false)}).then(res => navigate(String("/ProductsView/"+id))).catch(err=>console.log(err))


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
  const inputFromHandler = (e:React.ChangeEvent<HTMLInputElement>) =>{

    setProduct( (prevProduct: ProductProps) => ({
      ...prevProduct ,
      [e.target.id] : e.target.value
    }))

  }


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
                    product.title_img != ''

                        ?
                        <div key='0'>
                          <CardMedia
                              component="img"
                              image={product.title_img}
                              style={{
                                left : '0'
                                ,right : '0'
                              }}
                              sx={{height : 280}}
                          />
                          <span style={{ cursor : 'pointer'}}

                                onClick={() => productDelFilterFile(0)}
                          > X </span>
                        </div>

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
                    value={product?.product_nm}
                    label="상품명"
                    name="product_nm"
                    onChange={(e:React.ChangeEvent<HTMLInputElement >) => inputFromHandler(e)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                    required
                    fullWidth
                    id="product_type"
                    value={product?.product_type}
                    label="상품 종류"
                    name="product_type"
                    onChange={(e:React.ChangeEvent<HTMLInputElement >) => inputFromHandler(e)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                    required
                    fullWidth
                    id="price"
                    value={product?.price}
                    label="가격"
                    name="price"
                    onChange={(e:React.ChangeEvent<HTMLInputElement>) => inputFromHandler(e)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                    required
                    fullWidth
                    id="cnt"
                    value={product?.cnt}
                    label="갯수"
                    name="cnt"
                    onChange={(e:React.ChangeEvent<HTMLInputElement>) => inputFromHandler(e)}
                />
              </Grid>


              <Grid item xs={12}>
                <Editor
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
  )
}