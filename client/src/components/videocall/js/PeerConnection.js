import Navigator from './navigator';
import Emitter from './Emitter';
import socket from './socket';

const PC_CONFIG = { iceServers: [{ urls: ['stun:stun.l.google.com:19302'] }] };
class PeerConnection extends Emitter {
  /**

     * @param {String} friendID
     */
  constructor(friendID,myID) {
    super();
    console.log("peer connection");
    this.pc = new RTCPeerConnection(PC_CONFIG);
    this.pc.onicecandidate =(event)=>{
    console.log("onicecandidate added"); 
    socket.emit('call', {
      to: this.friendID,
      candidate: event.candidate,
      id:this.myID
    });
    } 
    this.pc.ontrack = event => this.emit('peerStream', event.streams[0]);
    this.navigateDevice = new Navigator();
    this.friendID=friendID;
    this.myID=myID;
  }
  /**
   * 
   * @param {Boolean} isCaller
   * @param {Object} config 
   */
  start(isCaller, config) {
    this.navigateDevice
      .on('stream', (stream) => {
        console.log("adding tracks");
        stream.getTracks().forEach((track) => {
          this.pc.addTrack(track, stream);
        })
        this.emit('localStream', stream);
        if (isCaller) 
        {
          console.log("request sent");
          socket.emit('request', { to: this.friendID,id:this.myID});
        }
          else {
           console.log("create offer start");
            this.createOffer();
          }
          })
      .start(config);
    return this;
  }

  /**
   * 
   * @param {Boolean} isStarter
   */
  stop(isStarter) {
    if (isStarter) {
      socket.emit('end', { to: this.friendID });
    }
    this.navigateDevice.stop();
    this.pc.close();
    this.pc = null;
    this.off();
    return this;
  }

  createOffer() {
    console.log("create offer");
    this.pc.createOffer()
      .then(this.getDescription.bind(this))
      .catch(err => console.log(err));
    return this;
  }

  createAnswer() {
    console.log("creating answer");
    this.pc.createAnswer()
      .then(this.getDescription.bind(this))
      .catch(err => console.log(err));
    return this;
  }

  getDescription(desc) {
    console.log("set local description");
    this.pc.setLocalDescription(desc);
    console.log(this.friendID);
    socket.emit('call', { to: this.friendID, sdp: desc, id:this.myID });
    return this;
  }

  /**
   * @param {Object} sdp 
   */
  setRemoteDescription(sdp) {
    console.log("remote description set");
    const rtcSdp = new RTCSessionDescription(sdp);
    this.pc.setRemoteDescription(rtcSdp);
    return this;
  }

  /**
   * @param {Object} candidate 
   */
  addIceCandidate(candidate) {
    if (candidate) {
      console.log("addicecandidate added");
      const iceCandidate = new RTCIceCandidate(candidate);
      this.pc.addIceCandidate(iceCandidate);
    }
    return this;
  }
}

export default PeerConnection;
