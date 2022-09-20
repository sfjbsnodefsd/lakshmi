const http = require('http');

function greet(req,res){
    res.writeHead(200,{'Content-Type':'application/json'})
    res.write(JSON.stringify({
        id:1,
        name:'xys',
        age:'2'
    }))
    res.end()
}
http.createServer(
greet
).listen(5000)