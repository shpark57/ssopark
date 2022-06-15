const express = require("express");
const router = express.Router();

import * as db from '../mariaDB'





router.post("/:id", (req: any, res: any) => {
    res.send({id:'post'});
    console.log(res)
})
router.put("/", (req: any, res: any) => {
    res.send({id:'put'});
    console.log(res)
})
router.patch("/", (req: any, res: any) => {
    res.send({id:'patch'});
    console.log(res)
})
router.delete("/", (req: any, res: any) => {
    res.send({id:'delete'});
    console.log(res)
})

router.get("/", (req: any, res: any) => {
    res.send({id:'get'});
    console.log(res)
})

/*
router.get('/getData', (req: any, res: any) => {
    db.execute("select * from `users`", (err:Error, rows:any) => {
    if (!err) {
        res.send(rows);
    } else {
        console.log(`query error : ${err}`);
        res.send(err);
    }
    });
});

*/

module.exports = router;