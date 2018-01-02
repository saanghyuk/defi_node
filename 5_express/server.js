const express = require("express");
const hbs = require("express-handlebars");
const bodyParser= require('body-parser');

const app = express();

app.engine(
  "hbs",
  hbs({
    extname: "hbs",
    defaultLayout: "layout",
    layoutsDir: __dirname + "/views/layouts"
  })
);
app.set("view engine", "hbs");

const urlencodeParser=bodyParser.urlencoded({extended:false}); //일반적인 form
const jsonParser = bodyParser.json(); //json으로 오는 body를 파싱

app.use("/css", express.static(__dirname + "/public/css"));

app.use("/", (req, res, next) => {
  console.log("Someone made a request from" + req.url);
  res.cookie("cookieName", "cookieValue");
  next();
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

app.get("/api/user", (req, res) => {
  res.send({
    name: "Sanghyuk",
    age: 26
  });
});

app.get("/user", (req, res) => {
  res.render("user", {
    title: "User profile",
    name: "Sanghyuk",
    lastname: "SON",
    valid: false,
    pets: ["dogs", "cats", "fish"],
    parents: [{ dad: "Mario", mother: " Martha" }]
  });
});


app.get("/enteruser", (req, res)=>{
    res.render('enteruser');
});

//POST
app.post("/enteruser", urlencodeParser,(req, res)=>{
     const firstName = req.body.firstname;
     const lastName = req.body.lastname;
     console.log(firstName);
     console.log(lastName);
});



app.get("/enteruserjson", (req, res)=>{
    res.render('enteruserjson');
});

app.post("/enteruserjson", jsonParser, (req, res)=>{
    console.log(req.body);
    const firstName = req.body.firstname;
    const lastName = req.body.lastname;

    console.log(firstName);
    console.log(lastName);
});

///PARAMS
app.get("/api/:user/:id", (req, res) => {
  let id = req.params.id;
  let username = req.params.user;
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
app.get("/api/car", (req, res) => {
  let brand = req.query.brand;
  let year = req.query.year;

  res.send({
    brand,
    year
  });
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Server is Running on ${port}`);
});
