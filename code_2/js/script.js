var lastPos = document.body.scrollTop || document.documentElement.scrollTop,
    perspective = 300,
    zSpacing = -1000;
    zVals = [],
    $frames = $(".frame"),
    frames = $frames.toArray(),
    scrollMsg = document.getElementById("instructions-overlay");
    numFrames = $frames.length;
    playing = false;

for(var i=0; i<numFrames;i++) { zVals.push((numFrames-i)*zSpacing);}

$(window).scroll(function(d,e) {
  var top = document.body.scrollTop || document.documentElement.scrollTop,
      delta = lastPos - top;
  lastPos = top;
  for(var i=0;i<numFrames;i++){
    var newZVal = (zVals[i]+=(delta*-1.5)),
        frame = frames[i],
        transform = "translateZ("+newZVal+"px)",
        opacity = newZVal < 200 ? 1 : 1 - parseInt((newZVal-200)/(perspective-200)*10)/10,
        display = newZVal > perspective ? "none" : "block";
    frame.setAttribute("style",
      "-webkit-transform:"+transform+";-moz-transform:"+transform+";display:"+display+";opacity:"+opacity);
    if(scrollMsg && zVals[numFrames-1] > 200) {
      scrollMsg.parentNode.removeChild(scrollMsg);
      scrollMsg = null;
    }

    if(frame.classList.contains("video")){

    // console.log(i);
    // console.log(newZVal);
    // console.log(frame.childNodes[1]);
    currentVideo = frame.childNodes[1];

      if(newZVal > -350 && newZVal < 300){
        console.log("Autoplay Video" + i);
        playVideo(currentVideo);
      }

      if(newZVal > 300 && newZVal < 400){
        console.log("Stop Video" + i);
        stopVideo(currentVideo);
      }
      
      if(newZVal < -350 && newZVal > -400){
        console.log("Stop Video" + i);
        stopVideo(currentVideo);
      }
    };
  }
});


function playVideo(video){
  if(!playing){
    video.play();
    playing = true;
  }
}

function stopVideo(video){
  if(playing){
    video.pause();
    video.currentTime = 0;
    playing = false;
  }
}