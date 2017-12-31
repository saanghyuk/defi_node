const os = require("os");
const fs = require("fs");

const userDate = require('./user.js');

console.log(userDate);


let user = os.userInfo();
let platform = os.platform();
let date = new Date();
let message = `User ${user.username} started app at ${date}\n`;

if(userDate.addLog()){
    fs.appendFile('hello.txt', message, (err)=>{
        if(err){
            console.log(err);
        }
    } );
};


