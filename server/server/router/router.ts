
import * as express from "express";
import {Request, Response} from "express";
const router = express.Router();
import {createConnection , IsNull  , Not, MoreThan, Equal , LessThanOrEqual  , MoreThanOrEqual , } from "typeorm";

import {Users} from "../src/entity/Users";
import crypto from 'crypto'
import { Menu } from "../src/entity/Menu";



createConnection().then(connection => {
    const usersRepository = connection.getRepository(Users)
    
    const menuRepository = connection.getRepository(Menu)

    const findObjectSetting = ( req: Request) => { 
        /* rest api 규칙을 동적으로 사용하기위한 함수 */
        /*
            테이블 전체 조회 O
            where 특정 칼럼 한개 조회 O
            where 특정 칼럼 여러개 조회 O
            order by 한개 O
            order by 여러개 O
            order by desc asc 추가 O
            limit O
            where 조건 >= <= != 조회 O
            where null 비교 O
            page 추가

            조인 구현해야함.

        */
        let params = {}
        let where = []
        let whereObj = {}
        let orderObj = {}
        let paramOrder= ''
        let paramSort= ''
        for(const [paramKey ,ParamValue] of Object.entries(req.query)){
            let key = `${paramKey}`.toLowerCase()
            let value = `${ParamValue}`.toLowerCase()
            
            if(key.indexOf('_limit') !== -1){
                params['take'] = value
            }else if(key.indexOf('_page') !== -1){
                params['skip'] = (Number(value)-1) * (params['take']?params['take']:10)
            }else if(key.indexOf('_sort') !== -1){
                paramSort = value
            }else if(key.indexOf('_order') !== -1){
                paramOrder = value
            }else if(key.indexOf('_gte') !== -1 ){
                 whereObj[key.replace('_gte','')] =  MoreThanOrEqual(value)    // >= 
            }else if(key.indexOf('_lte') !== -1){
                whereObj[key.replace('_lte','')] =  LessThanOrEqual(value)     // <=
            }else if(key.indexOf('_ne') !== -1 ){
                if(value == 'null'){
                whereObj[key.replace('_ne','')] =  Not(IsNull())     // is not null
                }else{
                    whereObj[key.replace('_ne','')] =  Not(value)     //  != 
                }
            }else if(key.indexOf('_join') !== -1 ){

                    '_join='

            }else if(key.indexOf('_on') !== -1 ){

                    

            }else{
                if(value == 'null'){
                    whereObj[key] = IsNull()
                }else{
                    whereObj[key] = value
                }
            }
        }
        
        if(paramSort != ''){
            for(let i = 0; i< paramSort.split(',').length; i ++){
                orderObj[paramSort.split(',')[i]] = (paramOrder.split(',')[i] ? paramOrder.split(',')[i] : 'ASC')
            }
        }
        where.push(whereObj)

        if( Object.keys(where[0]).length != 0 ){
            params['where'] =  where
        }
        if(Object.keys(orderObj).length ){
            params['order'] =  orderObj
        }

        return params
    }

    const findOneByRepository =  (table : string , req: Request, res: Response)  => {
        if(table.toLowerCase() == 'users'){
            const entity = usersRepository.findOneBy({id: Number(req.params.id)})
            return entity
        }
    }  

    const findByRepository =  (table : string , req: Request, res: Response)  => {
        //usersRepository 를 동적으로 사용하기 위한 함수. 
        //테이블 추가하면 선언은 계속 해주어야한다..
        const params = findObjectSetting(req)
        
        if(table.toLowerCase() == 'users'){
            
            const entity = usersRepository.find(params)
            return entity
        }else if(table.toLowerCase() == 'menu'){
            params['children']=  ['parent_id']
            const entity = menuRepository.find(params)
            return entity
        }
    
    }  

    const saveRepository =  (table : string , req: Request, res: Response)  => {
        
        if(table.toLowerCase() == 'users'){
            console.log(req.body)
            const entity =   usersRepository.save(req.body)
            return entity
        }
    }  

    const deleteOneByRepository =  async(table : string , req: Request, res: Response)  => {
        if(table.toLowerCase() == 'users'){
            const remove = await usersRepository.findOneBy(req.query)
            const entity = await usersRepository.delete(remove)
            return entity
        }
    }  

    const deleteRepository = async(table : string , req: Request, res: Response)  => {
    
        const params = findObjectSetting(req)
        if(table.toLowerCase() == 'users'){
            let remove = await usersRepository.find(params)
            const entity = await  usersRepository.remove(remove)
            return entity
        }
    
    }  
    



    router.get("/:id", function(req: Request, res: Response) {
        // /테이블명/1 의 형태의 url은 이곳으로 온다.

        let table = req.baseUrl.substr(1)
        findOneByRepository(table , req , res)
        .then(entity => {
            console.log(entity)
            res.send(entity);
        })
        .catch(err => {
            console.log(`query error : ${err}`);
            res.status(500).send(err);
        });

    });


    router.get("", function(req: Request, res: Response) {
        // /테이블명 또는 /테이블명?id=1  이런 형태의 url 은 이곳에 온다
        let table = req.baseUrl.substr(1)
        findByRepository(table , req , res)        
        .then(entity => {
            console.log(entity)
            res.send(entity);
        })
        .catch(err => {
            console.log(`query error : ${err}`);
            res.status(500).send(err);
        });

    });


    router.post("", async function(req: Request, res: Response) {
        let table = req.baseUrl.substr(1)
        const entity = await saveRepository(table , req , res)
        .then(entity => {
            console.log(entity)
            res.send(entity);
        })
        .catch(err => {
            console.log(`query error : ${err}`);
            res.status(500).send(err);
        });

    
    });


    router.put("/:id", async function(req: Request, res: Response) {

        let table = req.baseUrl.substr(1)
        
        req.body['id'] = Number(req.params.id)
        const entity = await saveRepository(table , req , res)
        .then(entity => {
            console.log(entity)
            res.send(entity);
        })
        .catch(err => {
            console.log(`query error : ${err}`);
            res.status(500).send(err);
        });

    });
    

    router.patch("/:id", async function(req: Request, res: Response) {
        let table = req.baseUrl.substr(1)

        
        req.body['id'] = Number(req.params.id)
        const entity = await saveRepository(table , req , res)
        .then(entity => {
            console.log(entity)
            res.send(entity);
        })
        .catch(err => {
            console.log(`query error : ${err}`);
            res.status(500).send(err);
        });

    });
    

    router.delete("/:id", function(req: Request, res: Response) {
        // /테이블명/1 의 형태의 url은 이곳으로 온다.

        let table = req.baseUrl.substr(1)
        deleteOneByRepository(table , req , res)
        .then(entity => {
            console.log(entity)
            res.send(entity);
        })
        .catch(err => {
            console.log(`query error : ${err}`);
            res.status(500).send(err);
        });

    });


    router.delete("", function(req: Request, res: Response) {
        // /테이블명 또는 /테이블명?id=1  이런 형태의 url 은 이곳에 온다

        let table = req.baseUrl.substr(1)
        findByRepository(table , req , res)        
        .then(entity => {
            console.log(entity)
            res.send(entity);
        })
        .catch(err => {
            console.log(`query error : ${err}`);
            res.status(500).send(err);
        });

    });


    /*
        페스워드 
    */
        router.post("/passwordCheck", async function(req: Request, res: Response) {
            // /테이블명/1 의 형태의 url은 이곳으로 온다.
    
            let user_id = req.body.user_id
            let password = req.body.password
    
            usersRepository.findOneBy({user_id : user_id})
            .then((response) => {
                const salt = response.salt 
                password = crypto.pbkdf2Sync(password, salt, 1, 32, 'sha512').toString('hex');
            }).then((response) => {
                usersRepository.findOneBy({user_id : user_id , password : password})
                .then((response) => {
                    if(response){
                        let params = {
                            check : true,
                            id : response.id,
                            user_id : response.user_id,
                            user_name : response.user_name,
                            avatar : response.avatar,
                            email : response.email,
                            phone_number : response.phone_number
                        }
                        res.send(params);
                    }else{
                        let params = {
                            check : false,
                            id : 0,
                            user_id : '',
                            user_name : '',
                            avatar : '',
                            email : '',
                            phone_number : ''
                        }
                        res.send(params);
                    }
                })
            }) .catch(err => {
                console.log(`query error : ${err}`);
                res.status(500).send(err);
            });
        });
    
    
        router.patch("passwordChange/:id", async function(req: Request, res: Response) {
            // /테이블명/1 의 형태의 url은 이곳으로 온다.
    
            req.body['id'] = Number(req.params.id)
            const salt = crypto.randomBytes(32).toString('hex');
            req.body['salt'] = salt
            req.body['password'] = crypto.pbkdf2Sync(req.body.password, salt, 1, 32, 'sha512').toString('hex');
            const response = await usersRepository.save(req.body)
            .then(response => {
                console.log(response)
                res.send(response);
            })
            .catch(err => {
                console.log(`query error : ${err}`);
                res.status(500).send(err);
            });
        });






}).catch(error => console.log("TypeORM connection error: ", error));

module.exports = router;