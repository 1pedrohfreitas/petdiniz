import Hls from 'hls.js';
import React, { useEffect, useRef } from 'react';

function PlayerVideo(props) {
  const playerRef = useRef();

  const autoLoad = ()=>{
alert(1)
  }

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
      loop
      playsInline
      muted
      width="100%"
      height="auto"
      type='application/vnd.apple.mpegurl'
      onLoad={autoLoad}
      ></video>
    </React.Fragment>
  );
}

export default PlayerVideo
