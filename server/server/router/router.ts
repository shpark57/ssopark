const express = require("express");
const router = express.Router();
import * as db from '../mariaDB'


/*
구현 된것.
GET , POST , PUT , PATCH
*/

const whereAnd = (whereAnd:string) =>{
    // where 가 와야하는지 and 가 와야하는지 구분
    return  (whereAnd == '' ? ' WHERE ' : ' AND ')
}
/*
get
*/
router.get('', (req: any, res: any) => {
    /* 구현해야 할것 */
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

        2022-06-16 일단 완료 추가사항있으면 그때 추가하면될듯.

    */
    let limit = ''
    let sort = ''
    let paramOrder= ''
    let paramSort= ''
    let page = ''
    let where = ''

    let query = 'SELECT * FROM '
    let table = req.baseUrl.substr(1)
    let currentPage  = 10;  //page 조회시 선언 limit 선언 안하면 기본 10

    query += table

    
    if(req.query){
        for(const [paramKey ,ParamValue] of Object.entries(req.query)){
            let key = `${paramKey}`.toLowerCase()
            let value = `${ParamValue}`.toLowerCase()

            if(key.indexOf('_limit') !== -1){
                limit = value
            }else if(key.indexOf('_page') !== -1){
                page =  String(Number(value) - 1 )
            }else if(key.indexOf('_sort') !== -1){
                paramSort = value
            }else if(key.indexOf('_order') !== -1){
                paramOrder = value
            }else if(key.indexOf('_gte') !== -1 ){
                where +=  whereAnd(where) + key.replace('_gte','') + ' >= ' + '\'' + value + '\''
            }else if(key.indexOf('_lte') !== -1){
                where +=  whereAnd(where) + key.replace('_lte','') + ' <= ' + '\'' + value + '\''
            }else if(key.indexOf('_ne') !== -1 ){
                if(value == 'null'){
                    where +=  whereAnd(where) + key.replace('_ne','') + ' IS NOT NULL ' 
                }else{
                    where +=  whereAnd(where) + key.replace('_ne','')  + ' != ' + '\'' + value + '\''
                }
            }else{
                if(value == 'null'){
                    where +=  whereAnd(where) + key + ' IS NULL ' 
                }else{
                    where +=  whereAnd(where) + key + ' = ' + '\'' + value + '\''
                }
            }

        }
        if(paramSort != ''){
            for(let i = 0; i< paramSort.split(',').length; i ++){
                //sort 처리..
                if(i == 0){
                    sort = ' ORDER BY '
                }else{
                    sort += ', '
                }
    
                sort += paramSort.split(',')[i] + ' ' +  (paramOrder.split(',')[i] ? paramOrder.split(',')[i] : '')
            }
        }

        query += where
    }

    query += sort

    if(page != ''){
        limit = limit == '' ? String(currentPage) : limit
        limit = ' LIMIT ' + Number(page) * Number(limit)  + ',' + limit
    }else{
        limit =  limit == '' ? '' :  ' LIMIT ' + limit
    }

    query += limit


    console.log(query)
    db.execute(query, (err:Error, rows:any) => {
    if (!err) {
        res.send(rows);
    } else {
        console.log(`query error : ${err}`);
        res.status(500).send(err);
    }
    });
});


router.get('/:id', (req: any, res: any) => {
    /* 구현해야 할것 */
    /*
        특정 아이디 조회
    */
    let query = 'SELECT * FROM '
    let table = req.baseUrl.substr(1)
    query = query + table
    let where = ' WHERE id = ' + '\''+req.params.id +'\''
    query+= where
    console.log(query)
    db.execute(query, (err:Error, rows:any) => {
    if (!err) {
        res.send(rows[0]?rows[0]:{});
    } else {
        console.log(`query error : ${err}`);
        res.status(500).send(err);
    }
    });
});


/*
post
*/
router.post('', (req: any, res: any) => {  
    
    /* 구현해야 할것 */
    /*
        insert 
        ps ) user/:id  <이런건 구현 안할것임.
    */ 
    let params = ''
    let values = ''
    let table = req.baseUrl.substr(1)
    for(let key in req.body){
        params += key + ','
        values += '\''+ req.body[key] + '\'' + ','
    }
    params = params.slice(0,-1)
    values = values.slice(0,-1)
    let query = 'INSERT INTO ' + table +'  (' + params +') VALUES ( ' + values +' )'

    console.log(query)
    db.execute(query, (err:Error, rows:any) => {
    if (!err) {
        res.send(rows);
    } else {
        console.log(`query error : ${err}`);
        res.status(500).send(err);
    }
    });
});


/*
put
*/
router.put('/:id', (req: any, res: any) => {
    /* 구현해야 할것 */
    /*
        특정 id 업데이트 
        어떻게 전부 업데이트 할지 몰라서.. patch 랑 같게 될듯..
    */
    let table = req.baseUrl.substr(1)
    let query = 'UPDATE  ' +table+ ' SET ' 

    let where = ' WHERE id = ' + '\''+req.params.id +'\''
    var params= ''

    for(let key in req.body){
        params +=  key + ' = ' + '\''+req.body[key]+'\'' +',' 
    }

    query += params.slice(0,-1)

    query+= where

    console.log(query)
    db.execute(query, (err:Error, rows:any) => {
        if (!err) {
            res.send(rows[0]?rows[0]:{});
        } else {
            console.log(`query error : ${err}`);

            res.status(500).send(err);
        }
    });
    
});


/*
patch
*/
router.patch('/:id', (req: any, res: any) => {
    /* 구현해야 할것 */
    /*
        특정 id 업데이트 
        어떻게 전부 업데이트 할지 몰라서.. patch 랑 같게 될듯..
    */
    let table = req.baseUrl.substr(1)
    let query = 'UPDATE  ' +table+ ' SET ' 

    let where = ' WHERE id = ' + '\''+req.params.id +'\''
    var params= ''

    for(let key in req.body){
        params +=  key + ' = ' + '\''+req.body[key]+'\'' +',' 
    }

    query += params.slice(0,-1)

    query+= where

    console.log(query)
    db.execute(query, (err:Error, rows:any) => {
        if (!err) {
            res.send(rows[0]?rows[0]:{});
        } else {
            console.log(`query error : ${err}`);

            res.status(500).send(err);
        }
    });
    
});

/*
delete
*/

router.delete('', (req: any, res: any) => {
    /* 구현해야 할것 */
    /*
        
    */
    let where = ''

    let query = 'DELETE FROM '
    let table = req.baseUrl.substr(1)

    query += table

    
    if(req.query){
        for(const [paramKey ,ParamValue] of Object.entries(req.query)){
            let key = `${paramKey}`.toLowerCase()
            let value = `${ParamValue}`.toLowerCase()

            if(key.indexOf('_gte') !== -1 ){
                where +=  whereAnd(where) + key.replace('_gte','') + ' >= ' + '\'' + value + '\''
            }else if(key.indexOf('_lte') !== -1){
                where +=  whereAnd(where) + key.replace('_lte','') + ' <= ' + '\'' + value + '\''
            }else if(key.indexOf('_ne') !== -1 ){
                if(value == 'null'){
                    where +=  whereAnd(where) + key.replace('_ne','') + ' IS NOT NULL ' 
                }else{
                    where +=  whereAnd(where) + key.replace('_ne','')  + ' != ' + '\'' + value + '\''
                }
            }else{
                if(value == 'null'){
                    where +=  whereAnd(where) + key + ' IS NULL ' 
                }else{
                    where +=  whereAnd(where) + key + ' = ' + '\'' + value + '\''
                }
            }

        }

        query += where
    }


    console.log(query)
    db.execute(query, (err:Error, rows:any) => {
    if (!err) {
        res.send(rows);
    } else {
        console.log(`query error : ${err}`);
        res.status(500).send(err);
    }
    });
});



router.delete('/:id', (req: any, res: any) => {
    /* 구현해야 할것 */
    /*
        특정 아이디 조회
    */
    let query = 'DELETE FROM '
    let table = req.baseUrl.substr(1)
    query = query + table
    let where = ' WHERE id = ' + '\''+req.params.id +'\''
    query+= where
    console.log(query)
    db.execute(query, (err:Error, rows:any) => {
    if (!err) {
        res.send(rows[0]?rows[0]:{});
    } else {
        console.log(`query error : ${err}`);
        res.status(500).send(err);
    }
    });
});



module.exports = router;