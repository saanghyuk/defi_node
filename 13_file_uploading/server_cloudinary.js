const express = require('express');
const hbs = require('express-handlebars');

const formidable = require('express-formidable');
const cloudinary = require('cloudinary');

const path = require('path');
const multer = require('multer');
const bodyParser = require('body-parser');
const port = process.env.PORT || 3000;

cloudinary.config({
   cloud_name: 'dcamoxasa',
   api_key: '355974995529124',
    api_secret: 'Z-jZLR0zHVldKfliq8nsFqa-8bg'
});


const app = express();

////######### HBS SETUP ############/////
app.engine('hbs', hbs({
    extname: 'hbs',
    defaultLayout: 'main',
    layoutsDir: __dirname + '/views/layouts/'
}));
app.set('view engine', 'hbs');

app.use(bodyParser.json());
app.use(formidable({
    multiples: true
}));

// GET
app.get('/', (req, res) => {
    res.render('home')
});



app.post('/api/uploads',(req, res) =>{
    console.log(req.fields);
    console.log(req.files);


    cloudinary.uploader.upload(req.files.image.path, (result)=>{
        console.log(result);
    }, {
        public_id: `${Date.now()}_${path.parse(req.files.image.name).name}`,
        transformation:[
            {width: 400, height: 400, gravity: "face", crop: "crop"}
        ],

        resource_type: 'auto',
    });

    res.status(200).send('ok');
});


app.listen(port,()=>{
    console.log(`Started on port ${port}`)
});