
import * as express from "express";
import {Request, Response} from "express";
const router = express.Router();
import {createConnection , IsNull  , Not, MoreThan, Equal , LessThanOrEqual  , MoreThanOrEqual ,Like  } from "typeorm";
import crypto from 'crypto'


import {Users} from "../src/entity/Users";
import { Menu } from "../src/entity/Menu";
import { Files } from "../src/entity/Files";
import { Comment } from "../src/entity/Comment";
import { Movies } from "../src/entity/Movies";
import { Likes } from "../src/entity/Likes";
import { Products } from "../src/entity/Products";
import { Cart } from "../src/entity/Cart";
import {Orders} from "../src/entity/Orders";
import {OrderDetails} from "../src/entity/OrderDetails";



createConnection().then(connection => {

    const dinamicRepository = (table : string) => {
        table = table.toLowerCase()
        let repository;
        if(table == 'users'){
            repository =  connection.getRepository(Users)
        }else if(table == 'menu'){
            repository =  connection.getRepository(Menu)
        }else if(table == 'files'){
            repository =  connection.getRepository(Files)
        }else if(table == 'comment'){
            repository =  connection.getRepository(Comment)
        }else if(table == 'movies'){
            repository =  connection.getRepository(Movies)
        }else if(table == 'likes'){
            repository =  connection.getRepository(Likes)
        }else if(table == 'products'){
            repository =  connection.getRepository(Products)
        }else if(table == 'cart'){
            repository =  connection.getRepository(Cart)
        }else if(table == 'orders'){
            repository =  connection.getRepository(Orders)
        }else if(table == 'orderdetails'){
            repository =  connection.getRepository(OrderDetails)
        }
        
        return repository;
    }
   
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
        let tmpWhere =[]
        for(const [paramKey ,ParamValue] of Object.entries(req.query)){
            let key = `${paramKey}`.toLowerCase()
            let value = `${ParamValue}`.toLowerCase()

            if(key.indexOf('_limit') !== -1){
                params['take'] = value
            }else if(key.indexOf('_page') !== -1){
                params['skip'] = (Number(  value   )-1) * (params['take']?params['take']:10)
            }else if(key.indexOf('_sort') !== -1){
                paramSort = value
            }else if(key.indexOf('_order') !== -1){
                paramOrder = value
            }else if(key.indexOf('_gte') !== -1 ){
                 whereObj[key.replace('_gte','')] =  MoreThanOrEqual(value)    // >= 
            }else if(key.indexOf('_lte') !== -1){
                whereObj[key.replace('_lte','')] =  LessThanOrEqual(value)     // <=
            }else if(key.indexOf('_like') !== -1){
                whereObj[key.replace('_like','')] =  Like("%" + value+ "%")     // <=
            }else if(key.indexOf('_ne') !== -1 ){
                if(value == 'null'){
                whereObj[key.replace('_ne','')] =  Not(IsNull())     // is not null
                }else{
                    whereObj[key.replace('_ne','')] =  Not(value)     //  != 
                }
            }else if(key.indexOf('_join') !== -1 ){
                    //미구현 고민중
            }else if(key.indexOf('_on') !== -1 ){
                    //미구현 고민중
            }else if(key.indexOf('_rel') !== -1 ){
                params['relations'] =  value.split(',')
            }else if(key.indexOf('_exceptcols') !== -1 ){
                params['exceptcols'] = value
            }else if(key.indexOf('_or') !== -1 ){
                let tmpObj ={}
                for(const [orParamKey ,orParamValue] of Object.entries( JSON.parse(value))){
                    let orKey = `${orParamKey}`.toLowerCase()
                    let orValue = `${orParamValue}`.toLowerCase()

                    if(orKey.indexOf('_gte') !== -1 ){
                        tmpObj[orKey.replace('_gte','')] =  MoreThanOrEqual(orValue)    // >=
                    }else if(orKey.indexOf('_lte') !== -1){
                        tmpObj[orKey.replace('_lte','')] =  LessThanOrEqual(orValue)     // <=
                    }else if(orKey.indexOf('_like') !== -1){
                        tmpObj[orKey.replace('_like','')] =  Like("%" + orValue+ "%")     // <=
                    }else if(orKey.indexOf('_ne') !== -1 ){
                        if(orValue == 'null'){
                            tmpObj[orKey.replace('_ne','')] =  Not(IsNull())     // is not null
                        }else{
                            tmpObj[orKey.replace('_ne','')] =  Not(orValue)     //  !=
                        }
                    }
                    else{
                        if(orValue == 'null'){
                            tmpObj[orKey] = IsNull()
                        }else{
                            tmpObj[orKey] = orValue
                        }
                    }
                }

                tmpWhere.push( tmpObj )

            }
            else{
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
        where = [...where , ...tmpWhere]

        if( Object.keys(where[0]).length != 0 ){
            params['where'] =  where
        }
        if(Object.keys(orderObj).length ){
            params['order'] =  orderObj
        }


        return params
    }

    const findOneByRepository = async (table : string , req: Request, res: Response)  => {

        const entity = await  dinamicRepository(table).findOneBy({id: Number(req.params.id)})
        return entity
    }  

    const findByRepository =  async (table : string , req: Request, res: Response)  => {
        //usersRepository 를 동적으로 사용하기 위한 함수. 
        //테이블 추가하면 선언은 계속 해주어야한다..
        const params = findObjectSetting(req)
        
        const entity = await dinamicRepository(table).find(params)


        if(params['exceptcols']){
            let exceptcol = params['exceptcols'].split(',')
            for(var i in exceptcol){
                entity.map(obj => {
                    delete obj[exceptcol[i]]
                })
            }
        }

        return entity

    }  

    const saveRepository =  async (table : string , req: Request, res: Response)  => {
        const entity = await  dinamicRepository(table).save(req.body)
        return entity
        
    }  

    
    const patchRepository =  async (table : string , req: Request, res: Response)  => {

        const post = await dinamicRepository(table).findOneById(req.body.id);

        for(let key in req.body){
            if(key.indexOf('++') !== -1 ){
                let value = req.body[key]
                key = key.replace('++','')
                post[key]  =   post[key] + value
            }else if(key.indexOf('--') !== -1 ){
                let value = req.body[key]
                key = key.replace('--','')
                post[key]  =   post[key] + value
            }else if(req.body[key] == null){
                delete req.body[key]
            }else{
                post[key] = req.body[key]
            }
        }
        const entity = await  dinamicRepository(table).save(post)
        return entity
        
    }  

    const deleteOneByRepository =  async(table : string , req: Request, res: Response)  => {
        req.query['id'] = req.params.id
        const remove = await dinamicRepository(table).findOneBy(req.query)
        for(let key in remove){
            if(remove[key] == null){
                delete remove[key]
            }
        }
        const entity = await dinamicRepository(table).delete(remove)
        return entity
   
    }  

    const deleteRepository = async(table : string , req: Request, res: Response)  => {
        const params = findObjectSetting(req)
        let remove = await dinamicRepository(table).find(params)
        for(let key in remove){
            if(remove[key] == null){
                delete remove[key]
            }
        }
        const entity = await  dinamicRepository(table).remove(remove)
        return entity

    
    }  
    



    router.get("/:id", function(req: Request, res: Response) {
        // /테이블명/:id 의 형태의 url은 이곳으로 온다.

        let table = req.baseUrl.substr(1)
        findOneByRepository(table , req , res)
        .then(entity => {
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
            res.send(entity);
        })
        .catch(err => {
            console.log(`query error : ${err}`);
            res.status(500).send(err);
        });

    });


    router.post("",  function(req: Request, res: Response) {
        let table = req.baseUrl.substr(1)
        const entity =  saveRepository(table , req , res)
        .then(entity => {
            res.send(entity);
        })
        .catch(err => {
            console.log(`query error : ${err}`);
            res.status(500).send(err);
        });

    
    });


    router.put("/:id",  function(req: Request, res: Response) {

        let table = req.baseUrl.substr(1)
        
        req.body['id'] = Number(req.params.id)
        const entity =  saveRepository(table , req , res)
        .then(entity => {
            res.send(entity);
        })
        .catch(err => {
            console.log(`query error : ${err}`);
            res.status(500).send(err);
        });

    });
    

    router.patch("/:id",  function(req: Request, res: Response) {
        /*
            patch 사용시 '변수명++'로 param을 보내명 현재값 + value 
        */

        let table = req.baseUrl.substr(1)
        req.body['id'] = isNaN(Number(req.params.id)) ? req.params.id : Number(req.params.id)
        const entity =  patchRepository(table , req , res)
        .then(entity => {
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
        deleteRepository(table , req , res)        
        .then(entity => {
            //console.log(entity)
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
        router.post("/check",  function(req: Request, res: Response) {
            // /테이블명/1 의 형태의 url은 이곳으로 온다.
    
            let user_id = req.body.user_id
            let password = req.body.password
    
            connection.getRepository(Users).findOneBy({user_id : user_id})
            .then((response) => {
                const salt = response.salt 
                password = crypto.pbkdf2Sync(password, salt, 1, 32, 'sha512').toString('hex');
            }).then((response) => {
                connection.getRepository(Users).findOneBy({user_id : user_id , password : password})
                .then((response) => {
                    if(response){
                        let params = {
                            check : true,
                            id : response.id,
                            user_id : response.user_id,
                            user_name : response.user_name,
                            email : response.email,
                            phone_number : response.phone_number,
                            auth : response.auth,
                            addr : response.addr,
                            addrDetail : response.addrDetail,
                            zipNo : response.zipNo
                        }
                        res.send(params);
                    }else{
                        let params = {
                            check : false,
                            id : 0,
                            user_id : '',
                            user_name : '',
                            email : '',
                            phone_number : '',
                            auth : '',
                            addr : '',
                            addrDetail : '',
                            zipNo : ''
                        }
                        res.send(params);
                    }
                })
            }) .catch(err => {
                console.log(`query error : ${err}`);
                res.status(500).send(err);
            });
        });
    
        //패스워드 변경
        router.patch("/change/:id", function(req: Request, res: Response) {
            // /테이블명/1 의 형태의 url은 이곳으로 온다.
    
            req.body['id'] = isNaN(Number(req.params.id)) ? req.params.id :Number(req.params.id)
            const salt = crypto.randomBytes(32).toString('hex');
            req.body['salt'] = salt
            req.body['password'] = crypto.pbkdf2Sync(req.body.password, salt, 1, 32, 'sha512').toString('hex');
            const response = connection.getRepository(Users).save(req.body)
            .then(response => {
                res.send(response);
            })
            .catch(err => {
                console.log(`query error : ${err}`);
                res.status(500).send(err);
            });
        });


        router.post("/direct",   function(req: Request, res: Response) {
            let query = req.body.params.query
            const queryRunner = connection.createQueryRunner();

            // 직접 SQL 쿼리 실행
            queryRunner.query(query)
                .then(entity => {
                    res.send(entity);
                })
                .catch(err => {
                    console.log(`query error : ${err}`);
                    res.status(500).send(err);
                });

        });



}).catch(error => console.log("TypeORM connection error: ", error));

module.exports = router;