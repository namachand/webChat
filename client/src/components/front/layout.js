import React from 'react'
import openSocket from 'socket.io-client';
import FrontHeader from './header';
import Messaging from './messagingPortion';
import '../videocall/css/main-window.css';
import '../videocall/css/videocallScreen.css';
import '../videocall/css/callingRequest.css'
import _ from 'lodash';
import '../../css/style.css';
import '../../css/forMobile.css';
import PeerConnection from '../videocall/js/PeerConnection';
import MainWindow from '../videocall/js/MainWindow';
import VideocallScreen from '../videocall/js/videocallScreen';
import CallingRequest from '../videocall/js/callingRequest';

class Layout extends React.Component {
    constructor(props){
    super(props);
    this.state={
      socket:null,
      opponent:'abc',
      room:'',
      socketid:'',
      sex:'',
      callWindow: '',
      callModal: '',
      callFrom: '',
      localSrc: null,
      peerSrc: null,
      message:'message'
    };
    this.pc = {};
    this.config = null;
    this.startCallHandler = this.startCall.bind(this);
    this.endCallHandler = this.endCall.bind(this);
    this.rejectCallHandler = this.rejectCall.bind(this);
    }
    componentDidMount(){
        this.initSocket();
        if(window.performance){
          console.log('here window is working');
        }
        if (performance.navigation.type == 1) {
          console.info( "This page is reloaded" );
          window.location.href='/'
        } else {
          console.info( "This page is not reloaded");
      }
    }
    
    initSocket=()=>{
      const socket=openSocket("/");
      
      var cancel=document.getElementById('leave');
      cancel.setAttribute('disabled', true);
      
      var search=document.getElementById('search');
      search.setAttribute('disabled',true);
      
      var video=document.getElementById('video');
      video.setAttribute('disabled',true);

      socket.on('connect',()=>{

      var text=document.getElementById('comment');
      text.setAttribute('disabled',true);
      var buton=document.getElementById('btn1');
      buton.setAttribute('disabled',true);

      
        console.log("connection made");
        socket.on('socketid',(data)=>{
        console.log("myid");
        console.log(data);
        this.setState({socketid:data});
        this.setState({sex:this.props.gender});
        const socketid=this.state.socketid;
        const sex=this.state.sex
        socket.emit('mydetails',{socketid,sex});    
    });
    socket.on('opponentdetails',(data)=>{
        this.setState({opponent:data});
        console.log(this.state.opponent);
    });
        socket.on('roomid',(data)=>{
          var text=document.getElementById('comment');
          text.removeAttribute('disabled',true);
         
          var buton=document.getElementById('btn1');
          buton.removeAttribute('disabled',true);

          var cancel=document.getElementById('leave');
          cancel.removeAttribute('disabled', true);
          
          // var search=document.getElementById('search');
          // search.removeAttribute('disabled',true);
          
          var video=document.getElementById('video');
          video.removeAttribute('disabled',true);
          
          document.getElementById('forImage').remove();
          document.getElementById('connectText').remove();
          this.setState({room:data});
          var opponent=this.state.opponent;
          const room=this.state.room;
          socket.emit('room',{room,opponent});
        });
       

        socket.on('typing',function(mess){
          let timer = setTimeout(makeNoTypingState, 1000);
          var feedback=document.getElementById('feedback');
          var random=mess;
            feedback.innerHTML='<p><em>'+random+'<p><em>';
            clearTimeout(timer);
            timer = setTimeout(makeNoTypingState, 500);
        });
        function makeNoTypingState() {
          var feedback=document.getElementById('feedback');
          feedback.innerHTML = "";
         }  

        socket.on('receiverMessage', (data)=>{
        var out = document.getElementById("scrollable");
          console.log(data.message);
          console.log(data.opponent);
          //for left right combination
          if(data.opponent==this.state.socketid){
          console.log('inside',this.state.socketid);
          console.log(out.scrollHeight,out.clientHeight,out.scrollTop);
          var isScrolledToBottom = out.scrollHeight - out.clientHeight <= out.scrollTop + 1;
          console.log(out.scrollHeight - out.clientHeight,  out.scrollTop + 1);
          var newElement = document.createElement("div");
          var anotherElement = document.createElement("div");
          var next=document.createElement('br');
          newElement.innerHTML = data.message;
          newElement.style.border='solid 0px pink';
          newElement.style.backgroundColor='pink';
          newElement.style.padding='10px';
          newElement.style.minWidth='50px';
          newElement.style.maxWidth='500px';
          newElement.style.wordBreak='break-all'
          newElement.style.borderRadius='20px';
          newElement.style.display='block';
          newElement.style.cssFloat='right';
          newElement.style.clear='right';
          anotherElement.style.marginTop='17px'
          anotherElement.style.padding='15px';
          anotherElement.appendChild(newElement);
          anotherElement.appendChild(next);
          out.appendChild(anotherElement);
          if(isScrolledToBottom)
          out.scrollTop = out.scrollHeight - out.clientHeight;
          }
        else{
        console.log('inside inside',this.state.socketid);
        console.log(out.scrollHeight,out.clientHeight,out.scrollTop);
        var isScrolledToBottom = out.scrollHeight - out.clientHeight <= out.scrollTop + 1;
        console.log(out.scrollHeight - out.clientHeight,  out.scrollTop + 1);
        var newElement = document.createElement("div");
        var anotherElement = document.createElement("div");
        var next=document.createElement('br');
        newElement.innerHTML = data.message ;
        newElement.style.border='solid 0px white';
        newElement.style.backgroundColor='white';
        newElement.style.padding='10px';
        newElement.style.minWidth='50px';
        newElement.style.maxWidth='500px';
        newElement.style.wordBreak='break-all';
        newElement.style.borderRadius='20px';
        newElement.style.display='block';
        newElement.style.cssFloat='left';
        newElement.style.clear='left';
        anotherElement.style.marginTop='17px';
        anotherElement.style.padding='15px';
        anotherElement.appendChild(newElement);
        anotherElement.appendChild(next);
        out.appendChild(anotherElement);
        if(isScrolledToBottom)
        out.scrollTop = out.scrollHeight - out.clientHeight;
        }          
        }); 
        socket.on('leaveroomtoo',()=>{
        var text=document.getElementById('comment');
        text.setAttribute('disabled',true);
        var buton=document.getElementById('btn1');
        buton.setAttribute('disabled',true);

        var cancel=document.getElementById('leave');
        cancel.setAttribute('disabled', true);
        var video=document.getElementById('video');
        video.setAttribute('disabled',true);
      
        var search=document.getElementById('search');
        search.removeAttribute('disabled',true);

        var maindis=document.getElementById('mainMess');
        var disconnect=document.getElementById('strangerDisconnect');
        var div=document.createElement('div');
        div.setAttribute('id','disconnectTextWarn');
        var disconnectText=document.createElement('P');
        disconnectText.innerText='You are disconnected!';
        div.style.display='flex';
        div.style.justifyContent='center';
        disconnectText.style.fontSize='x-large';
        disconnectText.style.opacity='0.8'
        disconnectText.style.color='white';
        disconnectText.style.fontStyle='italic'
        disconnectText.style.textShadow='2px 2px 4px #000000'
        div.appendChild(disconnectText);
        disconnect.appendChild(div);
        maindis.appendChild(disconnect);

        const room=this.state.room;
        const opponent=this.state.opponent;
        socket.emit('leaveroom',{room,opponent});
        });
        socket
        .on('request', ({ from: callFrom }) => {
          console.log("call window activate");
          this.setState({ callModal: 'active', callFrom });
          
          // var hideHead=document.getElementById('frontHead');
          // var hideMessage=document.getElementById('frontMessage');
          // hideHead.style.visibility='hidden';
          // hideMessage.style.visibility='hidden';
        })
        .on('call', (data) => {
          console.log("i received data");
          if (data.sdp) {
            console.log("ab");
            this.pc.setRemoteDescription(data.sdp);
            if (data.sdp.type === 'offer') this.pc.createAnswer();
          } else 
          {
            console.log("abc");
            this.pc.addIceCandidate(data.candidate);
          
          }
          })
        .on('end', this.endCall.bind(this, false))

    });
    this.setState({socket});
    }

    startCall(isCaller, friendID,config,myID) {
    // var hideHead=document.getElementById('frontHead');
    // var hideMessage=document.getElementById('frontMessage');
    // hideHead.style.visibility='hidden';
    // hideMessage.style.visibility='hidden';
    
    //for videocall image
    // var mainMess=document.getElementById('mainMess');
    // var vidDiv=document.getElementById('videoWindow');
    // var imag=document.createElement('img');
    // imag.src=signalImage;
    // vidDiv.appendChild(imag);
    // mainMess.appendChild(vidDiv); 
    //end

        console.log('i am inside startCall');
        console.log(friendID)
        console.log(myID)
        console.log("start call");
        this.config = config;
        this.pc = new PeerConnection(friendID,myID)
          .on('localStream', (src) => {
            console.log('localstream');
            const newState = { callWindow: 'active', localSrc: src };
            if (!isCaller) newState.callModal = '';
            this.setState(newState);
          })
          .on('peerStream', (src) => {
          console.log("peerstream added");
            this.setState({ peerSrc: src })
          
          }
            )
        .start(isCaller, config);
      }
    
      rejectCall() {
        const { callFrom } = this.state;
        const {socket}=this.state;
        socket.emit('end', { to: callFrom });
        this.setState({ callModal: '' });

        // var showHead=document.getElementById('frontHead');
        // var showMessage=document.getElementById('frontMessage');
        // showHead.style.visibility='visible';
        // showMessage.style.visibility='visible';
        

      }
    
      endCall(isStarter) {
        if (_.isFunction(this.pc.stop)) {
        this.pc.stop(isStarter);
      }
    // var showHead=document.getElementById('frontHead');
    // var showMessage=document.getElementById('frontMessage');
    // showHead.style.visibility='visible';
    // showMessage.style.visibility='visible';
    
      this.pc = {};
        this.config = null;
        this.setState({
          callWindow: '',
          callModal: '',
          localSrc: null,
          peerSrc: null
        });
      }
    
    render() {
    const { callFrom, callModal, callWindow, localSrc, peerSrc} = this.state;
    const {socket}=this.state;
    console.log(this.state.socket)
    return (
    <div className='wholeContent'>
    {/* <div id='forModal'> */}
    <div className='row head' id='frontHead'>
    <div className='col-8 col-md-10' >
    <FrontHeader 
    socket={socket} 
    opponent={this.state.opponent} 
    room={this.state.room} 
    socketid={this.state.socketid} 
    sex={this.state.sex}
    endCall={this.endCallHandler}/>
  
    </div>
    <div className='mainwindow col-4 col-md-2'>
    <MainWindow
    clientId={this.state.socketid}
    opponent={this.state.opponent}
    startCall={this.startCallHandler}
    />
    </div>
    </div>
   {/* creating row for the message and viceocall */}
  <div className='row mymess '>
  <div className='col-xs-12 col-lg-4 ' id='videoWindow'>
    {!_.isEmpty(this.config) && (
      <VideocallScreen
        status={callWindow}
        localSrc={localSrc}
        peerSrc={peerSrc}
        config={this.config}
        mediaDevice={this.pc.mediaDevice}
        endCall={this.endCallHandler}
      />
    )}
    <hr  className='videoSeperate'></hr>
    </div>
   <div id='frontMessage'
   className='col-xs-12 col-lg-8 '>
    <Messaging socket={socket} message={this.state.message} opponent={this.state.opponent}/>   
   </div>
    </div>
    <CallingRequest
      status={callModal}
      startCall={this.startCallHandler}
      rejectCall={this.rejectCallHandler}
      callFrom={callFrom}
    />
    </div>
    );
    }
  }
export default Layout;

