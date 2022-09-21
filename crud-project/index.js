const { application } = require('express');
const mysql = require('mysql');
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
app.use(bodyParser.json())

var mysqlConnection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'root',
    database:'employeedb'
})

mysqlConnection.connect((err)=>{
    if(!err){
        console.log("successful connection")

    }else console.log("DB Connection failed ",JSON.stringify(err,undefined,2));
})

app.listen(8085, () => console.log('server started at port 8080'))

app.get('/getemployees',(req,res)=>{
    mysqlConnection.query('select * from employees',(err,rows,fields)=>{
        if(!err){
            console.log(rows)
        }else console.log(err)
    })
})