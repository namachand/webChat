const express=require('express');
const http=require('http');
const bodyParser  = require('body-parser');
const cors = require('cors');
const path=require('path');
var app =express();
const server=http.createServer(app);
var io=require('socket.io')(server);
const PORT=process.env.PORT || 3231;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors()); 
var m=[];
var f=[];
var p=[];

if(process.env.NODE_ENV === 'production'){
  app.use(express.static('client/build'));
  app.get('*', (req,res)=>{
    res.sendFile(path.join(__dirname,'client','build','index.html'));
  });
}
io.on('connection',(socket)=>{
console.log("user Connected");
socket.emit('socketid',socket.id);
socket.on('mydetails',(data)=>{

  console.log(data.socketid);
  console.log(data.sex);
if(data.sex=="male"){
    if(f.length!=0){
        forMale(data.socketid);
    }
    else{
        m.push(data.socketid);
    }
}
if(data.sex=="female"){
if(m.length!=0){
forFemale(data.socketid);
}
else{
    f.push(data.socketid);
}
}

if(data.sex=="public"){
  if(p.length!=0){
  forPublic(data.socketid);
  }
  else{
      p.push(data.socketid);
}
}
  
console.log(m.length);
console.log(f.length);
console.log(m);
console.log(f);

socket.on('disconnect', function(){

  console.log('user disconnected');
  if(data.sex=="male"){
  var index=m.indexOf(data.id);
  m.splice(index,1);
  console.log(m);
}
if(data.sex=="female"){
  var index=f.indexOf(data.id);
  f.splice(index,1);
  console.log(f);
} 

if(data.sex=="public"){
  var index=p.indexOf(data.id);
  p.splice(index,1);
  console.log(p);
  // delete socket.id;
} 

});
});

function forMale(data){
var x;
x=Math.floor(Math.random()*f.length);
var me=data;
var opponent=f[x];

socket.emit('opponentdetails',opponent);
socket.to(opponent).emit('opponentdetails',me);

var index=f.indexOf(opponent);
f.splice(index,1);
console.log(m.length);
console.log(f.lengtgh);
console.log(m);
console.log(f);
roomid=me+opponent;
console.log(roomid); 
socket.emit('roomid',roomid);     
}


function forFemale(data){
var x;
x=Math.floor(Math.random()*m.length);
var me=data;
var opponent=m[x];

socket.emit('opponentdetails',opponent);
socket.to(opponent).emit('opponentdetails',me);

var index=m.indexOf(opponent);
m.splice(index,1);
console.log(m.length);
console.log(f.length);
console.log(m);
console.log(f);
var roomid=me+opponent;
console.log(roomid); 
socket.emit('roomid',roomid);     
}

function forPublic(data){
  var x;
  x=Math.floor(Math.random()*p.length);
  var me=data;
  var opponent=p[x];
  socket.emit('opponentdetails',opponent);
  socket.to(opponent).emit('opponentdetails',me);
  socket.emit('forVideocall','host');
  var index=p.indexOf(opponent);
  p.splice(index,1);
  console.log(p.length);
  console.log(p);
  roomid=me+opponent;
  console.log(roomid); 
  socket.emit('roomid',roomid);     
  }

socket.on('room',(data)=>{
var roomid=data.room;
opponentid=data.opponent;
console.log(roomid);
socket.join(roomid);
socket.on('messages',(data)=>{
    console.log(data.message);
    console.log(data.opponent);
    var message=data.message;
    var opponent=data.opponent;
    io.sockets.to(roomid).emit('receiverMessage',{message,opponent});
});

socket.on('typing',function(mess){
  console.log(mess);
  socket.to(roomid).emit('typing',mess);
});

var x=io.sockets.adapter.rooms[roomid];
console.log(x);
if(x.length<2){
socket.to(opponentid).emit('roomid',roomid);
}     
})
socket.on('leaveroom',(data)=>{
    socket.leave(data.room);
    socket.removeAllListeners('messages');
    var x=io.sockets.adapter.rooms[data.room];
        console.log(x);
        if(x!=undefined){
          socket.to(data.opponent).emit("leaveroomtoo");
        }     
    });



    //for videocall
  socket.on('call', (data) => {
    const receiver = data.to;
    const id=data.id;
    console.log("called" + receiver);
    console.log("from"+ id);
    socket.to(receiver).emit('call', { ...data, from:id});
  });
  socket.on('disconnect', () => {
    console.log('disconnected');
  });
  socket.on('request', (data) =>{
    const receiver = data.to;
    const id=data.id;
    console.log("received" + receiver);
    console.log("from"+ id);
    socket.to(receiver).emit('request', { from: id });
  })
  socket.on('end', (data) => {
    const receiver = data.to;
    if (receiver) {
      socket.to(receiver).emit('end');
    }
  })
    
});

server.listen(PORT,()=>{
    console.log("Connected to port:"  + PORT);
});