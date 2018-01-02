const express = require("express");

const app = express();


app.use("/css", express.static( __dirname + '/public/css'));

app.use("/", (req, res, next)=>{
    console.log('Someone made a request from'+req.url);
    res.cookie("cookieName", "cookieValue");
    next()
});

app.get("/", (req, res) => {
  res.send(`
        <html>
            <head>
                <link type="text/css" rel="stylesheet" href="/css/style.css">    
            </head>
            <body>
                <h1>My Node App</h1>
            </body>
        </html>
    `);
});


app.get('/api/user', (req, res)=>{
    res.send({
        name: "Sanghyuk",
        age: 26
    })
});

///PARAMS
app.get('/api/:user/:id', (req, res)=>{
    let id = req.params.id;
    let username= req.params.user;
    res.send(`
        <html>
            <body>
                <h1>This user id is ${id}, and username is ${username}</h1>
            </body>
        </html>
    `);
});

/// /cars?brand=ford&year=2017 >> query string
//http://localhost:8080/api/car?brand=ford&year=2017
app.get('/api/car', (req, res)=>{
    let brand=req.query.brand;
    let year= req.query.year;

    res.send({
        brand,
        year
    })
});

const port= process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Server is Running on ${port}`);
});
