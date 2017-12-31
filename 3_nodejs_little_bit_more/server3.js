
const EventEmitter= require('events');

class Message extends EventEmitter{
    constructor(){
        super(); //상속한 친구들 쓰게 해줌
        this.message = 'Hey, Jude';
        this.showMessage=()=>{
            this.emit('showIt', this.message)
        }
    }
}
const message= new Message();

message.on('showIt', (data)=>{
    console.log(data);
});

message.showMessage();

