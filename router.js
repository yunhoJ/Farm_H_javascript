const express = require("express");
const router = express.Router();
const conn = require("위치수정필요");
const ejs = require("ejs");
const fs = require('fs');

router.get("/diary", function(request, response){

    let sea = request.query.sea;

    conn.connect(); //mysql 연결
    let cdate = sea;

    let sql = "select * from FFARMDIARIES where R_DATE like ?";
    conn.query(sql, [cdate], function (err, row) {
        // console.log(row);
        response.send(row);
    })

})