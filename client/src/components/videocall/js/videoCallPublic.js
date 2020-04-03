import React, { useState, useEffect, useRef } from 'react';
import classnames from 'classnames';

function VideoCallPublic({ peerSrc, localSrc, config, mediaDevice, status, endCall ,sex}) {
  const peerVideo = useRef(null);
  const localVideo = useRef(null);
  const [video, setVideo] = useState(config.video);
  const [audio, setAudio] = useState(config.audio);

  useEffect(() => {
    console.log('i am here peer');
    if(!peerSrc){
      var peervideo=document.getElementById('peerVideo');
      peervideo.style.backgroundColor='rgb(192,192,192,0.3)';
    }
    if (peerVideo.current && peerSrc) 
    {
    console.log(peerVideo.current);
    console.log('peer true');
    peerVideo.current.srcObject = peerSrc;
    }
    if (localVideo.current && localSrc) 
    {
      console.log(localVideo.current);
      console.log('peeer true');
      localVideo.current.srcObject = localSrc;
    }
    });

  useEffect(() => {
    if (mediaDevice) {
      mediaDevice.toggle('Video', video);
      mediaDevice.toggle('Audio', audio);
    }
  });

  /**
   * 
   * @param {String} deviceType - Type of the device eg: Video, Audio
   */
  const toggleMediaDevice = (deviceType) => {
    if (deviceType === 'video') {
      setVideo(!video);
      mediaDevice.toggle('Video');
    }
    if (deviceType === 'audio') {
      setAudio(!audio);
      mediaDevice.toggle('Audio');
    }
  };
  
  return (
    <div className={classnames('call-window', status)}>
        <video id="localVideo" className='videocall' ref={localVideo} autoPlay />
        <video id="peerVideo" className='videocall' ref={peerVideo} autoPlay /> 
    </div>
  );
};

export default VideoCallPublic;
