import React, { useState, useEffect, useRef } from 'react';
import classnames from 'classnames';

const getButtonClass = (icon, enabled) => classnames(`btn-action fa ${icon}`, { disable: !enabled });

function VideocallScreen({ peerSrc, localSrc, config, mediaDevice, status, endCall ,sex}) {
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

        <video id="peerVideo" className='videocall  col-lg-4 ml-2' ref={peerVideo} autoPlay /> 
        <video id="localVideo" className='videocall  col-lg-4 ml-2' ref={localVideo} autoPlay />

   
      <div className="video-control d-none d-md-block" >
        <button
          key="btnVideo"
          type="button"
          className={getButtonClass('fa-video-camera', video)}
          onClick={() => toggleMediaDevice('video')}
          id='btnvideo'
        />
        <button
          key="btnAudio"
          type="button"
          className={getButtonClass('fa-microphone', audio)}
          onClick={() => toggleMediaDevice('audio')}
          id='btnaudio'
        />
        <button
          type="button"
          className="btn-action hangup fa fa-phone"
          onClick={() => endCall(true)}
          id='btnend'
        />
      </div>
      
    </div>
  );
};

export default VideocallScreen;
