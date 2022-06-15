const express = require("express");
const router = express.Router();
import * as db from '../mariaDB'


/*
get
*/
router.get('', (req: any, res: any) => {            //all 전체 조회
    let query = 'SELECT * FROM '
    let table = req.baseUrl.substr(1)
    let limit = ''
    let sort = ''

    query += table
    if(req._parsedUrl.query){
        let where = ' WHERE 1=1'
        let params = decodeURIComponent(req._parsedUrl.query)
        for(const param of params.split('&')){
            let key = param.split('=')[0]
            let value = param.split('=')[1]
            if(key == '_limit'){
                limit += ' limit ' + param.split('=')[1]
            }else if(key == '_sort'){
                sort += ' order by ' + param.split('=')[1]
            }else if(key == '_order'){
                if(sort != ''){
                    sort += ' ' + param.split('=')[1]
                }
            }else{
                where = where + ' AND ' + key + ' = ' + '\'' + value + '\''
            }
        }
        query += where
    }

    query += sort
    query += limit


    console.log(query)
    db.execute(query, (err:Error, rows:any) => {
    if (!err) {
        res.send(rows);
    } else {
        console.log(`query error : ${err}`);
        res.send(err);
    }
    });
});


router.get('/:id', (req: any, res: any) => {        // id
    let query = 'SELECT * FROM '
    let table = req.baseUrl.substr(1)
    query = query + table
    let where = ' where id = ' + '\''+req.params.id +'\''
    db.execute(query, (err:Error, rows:any) => {
    if (!err) {
        res.send(rows);
    } else {
        console.log(`query error : ${err}`);
        res.send(err);
    }
    });
});


/*
post
*/







module.exports = router;