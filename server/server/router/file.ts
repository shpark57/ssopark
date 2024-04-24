
import * as express from "express";
import {Request, Response} from "express";
const router = express.Router();
import path from "path";
import url from "url";

import axios from 'axios';
import multer from "multer";
const fs=require('fs')
import  mkdirp from 'mkdirp'
require("dotenv").config({ path: "/server/.env" })

const dir = path.join(__dirname, '../../../files/')
let storage = multer.diskStorage({
    destination: async function  (req, file, cb) {
      let today = new Date();
      let year = today.getFullYear()
      let month = ('0' + (today.getMonth()+1)).slice(-2);
      let day = ('0' + today.getDate()).slice(-2);
      let ymd = year+'/'+month+'/'+day+'/'

      const type = req.params.type
      if(!fs.existsSync(dir+type+'/'+ymd)){
        await mkdirp(dir+type+'/'+ymd).then((res) => console.log(res)).catch(err=>console.log(err))
      }
      await cb(null, dir+type+'/'+ymd);
    },
    filename: function (req, file, cb) {
      cb(
        null,
        file.fieldname + "-" + Date.now() + path.extname(file.originalname)
      );
    },
  });
  let fileUpload = multer({
    storage:storage
  });


  router.get('/read/:id', async function(req: Request, res: Response) {
    const file = await axios.get('/Files/'+req.params.id)
    if(file.data){
      const url = dir +file.data.type+'/'+ file.data.ymd + file.data.change_name + '.' +file.data.file_type
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
  


router.post("/upload/:type", fileUpload.array('files',10) , async function(req: Request, res: Response) {
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

            let origin = req.headers.origin
            origin = origin.charAt(origin.length - 1) == '/' ? origin : origin+'/'

            axios.post( '/Files',params)
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


router.post("/tuiHook/:type", fileUpload.single('file') , async function(req: Request, res: Response) {
    try {


        let params = {
            parent_id       : ''
            ,type           : req.body['type']
            ,type_detail    : req.body['type_detail']
            ,ymd            : req.body['ymd']
            ,origin_name    : req.body['origin_name']
            ,change_name    : req.file.filename.replace('.'+req.body['file_type' ] , '')
            ,file_type      : req.body['file_type' ]
            ,size           : req.body['size' ]
        }

        let origin = req.headers.origin
        origin = origin.charAt(origin.length - 1) == '/' ? origin : origin+'/'

        axios.post( '/Files',params)
            .then(entity =>{
                res.status(201).send({
                    message: 'https://db.sh2.site/api/fileService/read/' + entity.data.id
                })
            })

    } catch (error) {
        res.status(500).send({
            message: "파일저장 실패"
        })
    }


});

router.post('/reallyChange', async function(req: Request, res: Response) {
    try {

    let regex = /\/fileService\/read\/(\d+)/g;
    let text = req.body['text'];
    let ids = [];
    let match;
    let origin = req.headers.origin
    origin = origin.charAt(origin.length - 1) == '/' ? origin : origin+'/'


    while ((match = regex.exec(text)) !== null) {
        ids.push(match[1]);
    }


    for(let i in ids){
        axios.get("https://db.sh2.site/api/Files/"+  ids[i] ).then(res =>{
            const sourceFolder = dir +res.data.type+'/'+ res.data.ymd + res.data.change_name + '.' +res.data.file_type
            const destinationFolder = dir +req.body['type']+'/'+ res.data.ymd + res.data.change_name + '.' +res.data.file_type

            // 폴더 내 파일 목록 가져오기
            fs.readdir(sourceFolder, (err, files) => {
                if (err) {
                    console.error('Error reading directory:', err);
                    return;
                }

                // 각 파일에 대해 복사 및 삭제 작업 수행
                files.forEach(file => {
                    const sourceFile = path.join(sourceFolder, file);
                    const destinationFile = path.join(destinationFolder, file);

                    // 파일 복사
                    fs.copyFile(sourceFile, destinationFile, err => {
                        if (err) {
                            console.error('Error copying file:', err);
                        } else {
                            console.log('File copied successfully:', file);

                            // 복사가 완료된 경우, 원본 파일 삭제
                            fs.unlink(sourceFile, err => {
                                if (err) {
                                    console.error('Error deleting file:', err);
                                } else {
                                    console.log('File deleted successfully:', file);
                                }
                            });
                        }
                    });
                });
            })

        }).then(res=>{
            axios.patch("/Files/"+  ids[i]  ,  { type :req.body['type'] } )
        })

        res.status(201).send({
            message: "파일복제 성공"
        })
    }} catch (error) {
        res.status(500).send({
            message: "복제 실패"
        })
    }
});


module.exports = router;