const http = require('http');
const fs= require('fs');


console.log(__dirname);

const server=http.createServer((req, res)=>{
    res.writeHead(200, {'Content-Type':'application/json' });

    const names = ["Francis", "James", "Rob"];
    const cars = {
        name: "Ford",
        model: "Fiesta"
    };
    const json=JSON.stringify({
        names,
        cars
    });


    res.end(json); //Close the connection
});

server.listen(8080, '127.0.0.1');
console.log('Server is running');
