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
router.post('', (req: any, res: any) => {


    
    let query = req.body.params.query

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




module.exports = router;