const express = require('express');
const hbs = require('express-handlebars');

const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const moment = require('moment');

const config = require('./config/config').get(process.env.NODE_ENV);

const app = express();





// ############# HBS SETUP #############
app.engine('hbs', hbs({
    extname: 'hbs',
    defaultLayout:'main',
    layoutsDir: __dirname+'./../views/layouts',
    partialsDir: __dirname+'./../views/partials'
}));


app.set('view engine', 'hbs');

// ############# DB #############
mongoose.Promise=global.Promise;
mongoose.connect(config.DATABASE);

//Models
const {User} =require('./models/user');

//MIDDLEWARE
app.use('/css',express.static(__dirname + './../public/css'));
app.use('/js',express.static(__dirname + './../public/js'));



//GET
app.get('/', (req, res)=>{
   res.render('home');
});

app.get('/register', (req, res)=>{
    res.render('register')
});

app.get('/login', (req, res)=>{
    res.render('login')
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());


// POST
app.post('/api/register',(req,res)=>{
    // console.log(req.body);

    const user = new User(req.body);

    user.save((err,doc)=>{
        if(err) return res.status(400).send(err);
        user.generateToken((err, user)=>{
            if(err) return res.status(400).send(err);

            //token을 쿠키에 저장하기 why?
            res.cookie('auth', user.token).send('ok');

        })
    })
});


app.post('/api/login',(req,res)=>{

    User.findOne({'email':req.body.email},(err,user)=>{
        if(!user) return res.status(400).json({message:'Auth failed, wrong email'});

        user.comparePassword(req.body.password, function(err, isMatch){
            if(err) throw err;
            if(!isMatch) return res.status(400).json({message:'Auth failed, wrong password'});

            user.generateToken((er,user)=>{
                if(err) return res.status(400).send(err);
                res.cookie('auth',user.token).send('ok');
            })
        })
    })
});

app.listen(config.PORT, ()=>{
    console.log(`Started at port ${config.PORT}`)
});