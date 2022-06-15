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
                sort += ' ORDER BY ' + param.split('=')[1]
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
    let where = ' WHERE id = ' + '\''+req.params.id +'\''
    query+= where
    db.execute(query, (err:Error, rows:any) => {
    if (!err) {
        res.send(rows[0]?rows[0]:{});
    } else {
        console.log(`query error : ${err}`);
        res.send(err);
    }
    });
});


/*
post
*/

router.post('', (req: any, res: any) => {        // id
    let params = ''
    let values = ''
    let table = req.baseUrl.substr(1)
    let where = ' where id = ' + '\''+req.params +'\''
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
        res.send(err);
    }
    });
});






module.exports = router;