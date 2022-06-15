const express = require("express");
const router = express.Router();

import * as db from '../mariaDB'

router.get("/", (req: any, res: any) => {
    res.send({id:'test'});
})

router.get('/getData', (req: any, res: any) => {
    db.init()
    db.execute("select * from `users`", (err:Error, rows:any) => {
    if (!err) {
        res.send(rows);
    } else {
        console.log(`query error : ${err}`);
        res.send(err);
    }
    });
});


module.exports = router;