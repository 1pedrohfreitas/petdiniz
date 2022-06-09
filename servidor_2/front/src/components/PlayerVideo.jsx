import Hls from 'hls.js';
import React, { useEffect, useRef } from 'react';

function PlayerVideo(props) {
  const playerRef = useRef();
  // return (
  //   <ReactHlsPlayer
  //     src={props.urlVideo}
  //     autoPlay={true}
  //     playerRef={playerRef}
  //     controls={true}
  //     
  //   />
  // );
  useEffect(() => {
    var video = document.getElementById('video');
    if (Hls.isSupported()) {
      var hls = new Hls();
      hls.loadSource(props.urlVideo);
      hls.attachMedia(video);
    } else {
      video.src = props.urlVideo;
    }
  }, []);

  return (
    <React.Fragment>
      <video id="video"
      controls
      autoPlay
      playsInline
      muted
      width="100%"
      height="auto"></video>
    </React.Fragment>
  );
}

export default PlayerVideo
