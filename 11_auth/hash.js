const bcrypt= require('bcrypt');

const jwt = require('jsonwebtoken');

let id = "100000";
const secret = 'supersecret';

const token = jwt.sign(id, secret);
console.log(secret.toHexString());

// const receiveToken="asdkljfkasdf";
// const decodeToken = jwt.verify(receiveToken, secret);
//



// bcrypt.genSalt(10, (err, salt)=>{
//
//     if(err) return next(err);
//
//     bcrypt.hash('password123', salt, (err, hash)=>{
//         if(err) return next(err);
//         console.log(hash);
//     });
// });
// const secret = 'supersecret';
// const secretSalt='alskdjfasdjkfljadsfalsf';
//
//
// const user={
//     id: 1,
//     token: MD5('password123').toString()+secretSalt
// };
//
// console.log(user.token);
//
//
// const receivedToken= '';
// if(receivedToken ===user.token){
//     console.log('Move forward')
// }