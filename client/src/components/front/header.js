import React from 'react';
import '../../css/style.css'
import image from '../images/support.png';

class FrontHeader extends React.Component {
constructor(props){
  super(props);
  this.leaveRoom = this.leaveRoom.bind(this);
  this.searchforStranger = this.searchforStranger.bind(this);
}

leaveRoom(){
  //text and button disable
  var sex=this.props.sex;
  var text=document.getElementById('comment');
  text.setAttribute('disabled',true);
  var buton=document.getElementById('btn1');
  buton.setAttribute('disabled',true);

  //cancel and videocall disable
  var cancel=document.getElementById('leave');
  cancel.setAttribute('disabled', true);
  if(sex!='public'){
    var video=document.getElementById('video');
    video.setAttribute('disabled',true);
  }

  //search enable
  var search=document.getElementById('search');
  search.removeAttribute('disabled',true);

  //this is for 'the user is disconnect..'
  var maindis=document.getElementById('mainMess');
  var disconnect=document.getElementById('strangerDisconnect');
  var div=document.createElement('div');
  div.setAttribute('id','disconnectTextWarn');
  var disconnectText=document.createElement('P');
  disconnectText.innerText='You are disconnected!';
  div.style.display='flex';
  div.style.justifyContent='center';
  disconnectText.style.fontSize='x-large';
  disconnectText.style.color='white';
  disconnectText.style.textShadow='2px 2px 4px #000000'
  div.appendChild(disconnectText);
  disconnect.appendChild(div);
  maindis.appendChild(disconnect);

  console.log('inside leave room');
  const socket=this.props.socket;
  const room=this.props.room;
  const opponent=this.props.opponent;
  socket.emit('leaveroom',{room,opponent})
}

searchforStranger(){
  //search disable
  var search=document.getElementById('search');
  search.setAttribute('disabled',true);

  //removal of 'the user is disconnect'
  document.getElementById('disconnectTextWarn').remove();

  //this is for the image on the div
  var mainMess=document.getElementById('mainMess');
  var mainDiv=document.getElementById('scrollable');
  mainDiv.innerHTML='';
  var div=document.createElement('div');
  div.setAttribute('id','forImage');
  var imag=document.createElement('img');
  imag.src=image;
  div.style.display='flex';
  div.style.marginTop='20%';
  div.style.justifyContent='center';
  imag.style.height='200px';
  imag.style.width='200px';
  imag.style.opacity='0.8';
  div.appendChild(imag);
  mainDiv.appendChild(div);

  //this is for the text on the div
  var connect=document.createElement('div');
  connect.setAttribute('id','connecting');
  var connectText=document.createElement('P');
  connectText.setAttribute('id','connectText');
  connectText.innerText='Connecting to Stranger..';
  connect.style.display='flex';
  connectText.style.marginBottom='100px';
  connect.style.justifyContent='center';
  connectText.style.fontSize='x-large';
  connectText.style.color='white';
  connectText.style.fontStyle='italic'
  connectText.style.textShadow='2px 2px 4px #000000'
  connect.appendChild(connectText);
  mainMess.appendChild(connect);

  const socket=this.props.socket;
  const socketid=this.props.socketid;
  const sex=this.props.sex
  socket.emit('mydetails',{socketid,sex});    

}
render() {
      return (

      <div className=" container row ">    
          <div className="col-2 col-md-1" id='parent'>
              <button type="button" className=" btn-action fa fa-times fa-2x ml-3 font" id='leave' onClick={()=>{this.leaveRoom
              this.props.endCall(true) 
            }}></button>
          </div>
          <div className="col-3 offset-1 col-md-1">
              <button type="button" className="btn-action fa fa-play fa-2x ml-5 pl-2 font" id='search' onClick={this.searchforStranger}></button>
          </div>
          <div className="col-5 col-md-5">    
          </div>
       </div>           
      );
    }
}
export default FrontHeader;