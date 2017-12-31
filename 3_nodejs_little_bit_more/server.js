const event = require('events');

const eventEmitter = new event.EventEmitter();

const ringBell = () =>{
  console.log('ring ring ring');
};

eventEmitter.on('guestHere', ringBell);

///////////////////////////
const sayHello = ()=>{
    console.log("Hello, who's there")
};
eventEmitter.on('guestHere', sayHello);

///////////////////////////
eventEmitter.on('guestHere', (action1, action2)=>{
    console.log(action1);
    console.log(action2);
});



//////////////////////////
// 언젠가 쓰고 싶을때
eventEmitter.emit('guestHere', 'its me your guest', 'hi');

