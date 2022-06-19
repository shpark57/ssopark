
import * as express from "express";
import {Request, Response} from "express";
const router = express.Router();
import path from "path";
import url from "url";

import axios from 'axios';
import multer from "multer";
const fs=require('fs')
const Minio=require('minio')

let today = new Date();   
let year = today.getFullYear()
let month = ('0' + (today.getMonth()+1)).slice(-2); 
let day = ('0' + today.getDate()).slice(-2); 
let ymd = year+'/'+month+'/'+day+'/'



router.get('/movie/read/', function(req: Request, res: Response) {

  const {pathname} = url.parse(req.url, true)
  const readStream =fs.createReadStream("C:/react/workspaces/files/movie/2022/06/19/64a2751f28a357b5c0175f9cab43f41c.mp4");
  readStream.pipe(res);

});

let storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'C:/react/workspaces/files/movie/'+ymd);
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