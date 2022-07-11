
import * as express from "express";
import {Request, Response} from "express";
const router = express.Router();
import path from "path";
import url from "url";

import axios from 'axios';
import multer from "multer";
const fs=require('fs')
import  mkdirp from 'mkdirp'

let today = new Date();   
let year = today.getFullYear()
let month = ('0' + (today.getMonth()+1)).slice(-2); 
let day = ('0' + today.getDate()).slice(-2); 
let ymd = year+'/'+month+'/'+day+'/'







const dir = path.join(__dirname, '../../../files/movie/')
let storage = multer.diskStorage({
    destination: async function  (req, file, cb) {
      if(!fs.existsSync(dir+ymd)){
        await mkdirp(dir+ymd).then((res) => console.log(res)).catch(err=>console.log(err))
      }
      await cb(null, dir+ymd);
    },
    filename: function (req, file, cb) {
      cb(
        null,
        file.fieldname + "-" + Date.now() + path.extname(file.originalname)
      );
    },
  });
  let movieUpload = multer({
    storage:storage
  });


  router.get('/read/:id', async function(req: Request, res: Response) {
    const file = await axios.get('http://'+req.headers.host+'/Files/'+req.params.id)
    if(file.data){
      const url = dir + file.data.ymd + file.data.change_name + '.' +file.data.file_type
      if(fs.existsSync(url)){
        const readStream = fs.createReadStream(url)

        readStream.pipe(res)
        readStream.on('error',(error) =>{
          res.status(500).send(error)
        })
      }else{
        res.status(500).send({
          message: "파일없음"
        })
      }
    }else{
      res.status(500).send({
        message: "파일없음"
      })
    }
  });
  


router.post("/movie/upload", movieUpload.array('files',10) , async function(req: Request, res: Response) {
    /************************* */
    /*
        필요한 값,
        parent_id
        type
        ymd
        origin_name
        change_name
        file_type
        size

    */
    /************************ */
    try {

        for(let i  in req.files){
            let params = {
                 parent_id      : req.body['files_params['+i+'].parent_id'] 
                ,type           : req.body['files_params['+i+'].type']
                ,type_detail    : req.body['files_params['+i+'].type_detail']
                ,ymd            : req.body['files_params['+i+'].ymd']
                ,origin_name    : req.body['files_params['+i+'].origin_name']
                ,change_name    : req.files[i].filename.replace('.'+req.body['files_params['+i+'].file_type' ] , '')
                ,file_type      : req.body['files_params['+i+'].file_type' ]
                ,size           : req.body['files_params['+i+'].size' ]
            }
           axios.post(req.headers.origin+'Files',params)
        }     
        
        res.status(201).send({
            message: "파일저장 성공"
        })
    } catch (error) {
        res.status(500).send({
            message: "파일저장 실패"
        })
    }

    
});


module.exports = router;