const http = require("http");
const fs = require("fs");

console.log(__dirname);

const server = http.createServer((req, res) => {
  if (req.url === "/") {
    res.writeHead(200, { "Content-Type": "text/html" });
    const HTML = fs.readFileSync(`${__dirname}/index.html`);
    res.end(HTML);
  } else if (req.url === "/api/user") {
    res.writeHead(200, { "Content-Type": "application/json" });
    const user = JSON.stringify({
      name: "Sanghyuk",
      lastname: "SON"
    });
    res.end(user);
  }else{
    res.writeHead(400);
    res.end('Page Not Found')
  }
});

server.listen(8080, "127.0.0.1");
console.log("Server is running");
