import React from 'react';
function MainWindow({ startCall, clientId,opponent}) {
  /**
   * Start the call with or without video
   * @param {Boolean} video
   */
  const callWithVideo = (video,friendID,myID) => {
    const config = { audio: true, video };
    return () => {
      console.log('i m returning');
      friendID && startCall(true, friendID, config,myID)};  
  };
  
  return (
    <div className=" main-window">
        <div className='callVideoButt ' >
          <button
            type="button"
            className=" font btn-action fa fa-video-camera fa-2x"
            onClick={callWithVideo(true,opponent,clientId)}
            id='video'
          >
          </button>
        </div>
        
      </div>       
    
  );
}

export default MainWindow;
