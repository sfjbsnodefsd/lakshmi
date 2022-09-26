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
    database:'employeedb',
  multipleStatements:true
})

mysqlConnection.connect((err)=>{
    if(!err){
        console.log("successful connection")

    }else console.log("DB Connection failed ",JSON.stringify(err,undefined,2));
})

app.listen(8085, () => console.log('server started at port 8085'))

app.get('/getemployees',(req,res)=>{
    mysqlConnection.query('select * from employee',(err,rows,fields)=>{
        if(!err){
            res.send(JSON.stringify(rows))
            console.log(rows)
        }else{
            res.send(err)
            console.log(err)
        } 
    })
})


app.get('/getemployee/:id',(req,res)=>{
    mysqlConnection.query("select * from employee where EmpId = ?",[req.params.id],(err,rows,fields)=>{
        if(!err){
            res.send(JSON.stringify(rows))
            console.log('Rows : ',rows)
        }else {
            res.send(err)
            console.log(err)}
    })
})

app.delete('/deleteemployee/:id',(req,res)=>{
    mysqlConnection.query("delete from employeedb.employee where EmpId=?",[req.params.id],(err,rows,fields)=>{
        if(!err){
            res.send('Successfully deleted employee')
        }else res.status(500).send(err)
    })
})

app.post("/addemployee" , (req, res) => {
    let emp = req.body;
    var sql = "SET @EmpId = ?; SET @Name = ?; SET @EmpCode = ?; SET @Salary = ?; \
    CALL employeeAddorDelete(@EmpId,@Name,@EmpCode,@Salary);";
     mysqlConnection.query(sql,[emp.EmpId, emp.Name, emp.EmpCode, emp.Salary] , (err,rows,fields) => {
        if(!err) {
          rows.forEach(element => {
            if(element.constructor == Array){
                res.status(200).send("Employee added successfully "+element[0].EmpId)
            }
          })
        } else res.status(500).send(err)
    })
});


app.put("/updateemployee" , (req, res) => {
    let emp = req.body;
    var sql = "SET @EmpId = ?; SET @Name = ?; SET @EmpCode = ?; SET @Salary = ?; \
    CALL employeeAddorDelete(@EmpId,@Name,@EmpCode,@Salary);";
     mysqlConnection.query(sql,[emp.EmpId, emp.Name, emp.EmpCode, emp.Salary] , (err,rows,fields) => {
        if(!err) {
                res.send("Employee updated successfully ")
            
          
        } else res.status(500).send(err)
    })
});