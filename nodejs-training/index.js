const http = require('http');

function greet(req,res){
    res.write("<h1>Hello </h1>")
    res.end()
}
http.createServer((req,res)=>{
greet
}).listen(5000)