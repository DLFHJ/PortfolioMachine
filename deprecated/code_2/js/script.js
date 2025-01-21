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







// Create a performance observer to monitor loading metrics
const performanceObserver = new PerformanceObserver((list) => {
  list.getEntries().forEach((entry) => {
      console.log(`${entry.name}: ${entry.duration.toFixed(2)}ms`);
  });
});

// Start observing different types of performance metrics
performanceObserver.observe({ entryTypes: ['resource', 'element'] });

// Function to measure loading time for specific elements
function measureLoadTime(selector) {
  const elements = document.querySelectorAll(selector);

  elements.forEach((element, index) => {
      const startTime = performance.now();

      // Handle different types of media
      if (element instanceof HTMLVideoElement) {
          element.addEventListener('loadeddata', () => {
              const loadTime = performance.now() - startTime;
              console.log(`Video ${index + 1} load time: ${loadTime.toFixed(2)}ms`);
          });
      } else if (element instanceof HTMLImageElement) {
          if (element.complete) {
              const loadTime = performance.now() - startTime;
              console.log(`Image ${index + 1} load time: ${loadTime.toFixed(2)}ms`);
          } else {
              element.addEventListener('load', () => {
                  const loadTime = performance.now() - startTime;
                  console.log(`Image ${index + 1} load time: ${loadTime.toFixed(2)}ms`);
              });
          }
      } else if (element instanceof HTMLIFrameElement) {
          element.addEventListener('load', () => {
              const loadTime = performance.now() - startTime;
              console.log(`IFrame ${index + 1} load time: ${loadTime.toFixed(2)}ms`);
          });
      }

      // Add error handling
      element.addEventListener('error', () => {
          console.error(`Error loading element ${index + 1}`);
      });
  });
}

// Function to measure total page load metrics
function measurePageMetrics() {
  window.addEventListener('load', () => {
      // Navigation timing metrics
      const pageNav = performance.getEntriesByType('navigation')[0];
      console.log({
          'Total Page Load Time': `${pageNav.duration.toFixed(2)}ms`,
          'DOM Content Loaded': `${pageNav.domContentLoadedEventEnd - pageNav.domContentLoadedEventStart}ms`,
          'First Contentful Paint': `${performance.getEntriesByType('paint')[0].startTime.toFixed(2)}ms`
      });

      // Resource timing for all resources
      const resources = performance.getEntriesByType('resource');
      resources.forEach(resource => {
          console.log(`${resource.name}: ${resource.duration.toFixed(2)}ms`);
      });
  });
}

/* --- */

// Measure specific types of media
measureLoadTime('video');  // for videos
measureLoadTime('img');    // for images
measureLoadTime('iframe'); // for iframes

// Measure overall page metrics
measurePageMetrics();

//var loadTime = window.performance.timing.domContentLoadedEventEnd- window.performance.timing.navigationStart;
//console.log("load time: " + loadTime);
console.log(window.performance);

