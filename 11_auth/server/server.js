const express = require('express');
const bodyParser=require('body-parser');
const mongoose=require('mongoose');
const bcrypt = require('bcrypt');

//heroku면 자동으로 production으로 옴
const config=require('./config/config').get(process.env.NODE_ENV);


const app =express();



//DB
mongoose.Promise=global.Promise;
mongoose.connect(config.DATABASE);

const {User} = require('./models/user');

//MIDDLEWARE
const {auth}=require('./middleware/auth');


app.use(bodyParser.json());


//POST
app.post('/api/user', (req, res)=>{
    const user = new User({
        email: req.body.email,
        password: req.body.password
    });

    user.save((err, doc)=>{
        if(err) res.status(400).send(err);
        user.generateToken((err, user)=>{
            if(err) res.status(400).send(err);
            res.header('x-token', user.token).send(user);
        })
    });
});

//POST Login
app.post('/api/user/login', (req, res)=>{

    User.findOne({'email': req.body.email }, (err, user)=>{
        if(!user) res.json({"message": "Auth failed. User not found"});

        user.comparePassword(req.body.password, function(err, isMatch){
            if(err) throw err;
            if(!isMatch){
                return res.json({message: 'wrong password'})
            }

            user.generateToken((err, user)=>{
                res.header('x-token', user.token).send(user);
            });

        })
    });
});



app.get('/user/profile', auth ,(req, res)=>{
    res.status(200).send(req.token);
});

app.delete('/user/logout', auth , (req, res)=>{
    req.user.deleteToken(req.token, (err, user)=>{
        if(err) return res.status(400).send(err);
        res.status(200).send('Success!');
    });
});


app.listen(config.PORT, ()=>{
    console.log(`Starting on port ${config.PORT}`)
});