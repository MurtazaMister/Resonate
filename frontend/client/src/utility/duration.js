var uploadMax = 31457280; //bytes  //30MP

//for seconds to time
function secondsToTime(in_seconds) {

  var time = '';
  in_seconds = parseFloat(in_seconds.toFixed(2));

  var hours = Math.floor(in_seconds / 3600);
  var minutes = Math.floor((in_seconds - (hours * 3600)) / 60);
  var seconds = in_seconds - (hours * 3600) - (minutes * 60);
  //seconds = Math.floor( seconds );
  seconds = seconds.toFixed(0);

  if (hours < 10) {
    hours = "0" + hours;
  }
  if (minutes < 10) {
    minutes = "0" + minutes;
  }
  if (seconds < 10) {
    seconds = "0" + seconds;
  }
  time = minutes + ':' + seconds;

  return time;

}

function checkFileDuration(file,setDuration) {
  var reader = new FileReader();
  var fileSize = file.size;

  if (fileSize > uploadMax) {
    alert('file too large');
  } else {
    reader.onload = function(e) {
        
        if (file.type == "audio/mpeg" || file.type == "audio/wav" || file.type == "audio/ogg") {

        var audioElement = document.createElement('audio');
        audioElement.src = e.target.result;
        var timer = setInterval(function() {
          if (audioElement.readyState === 4) {
            let getTime = secondsToTime(audioElement.duration);
            setDuration(getTime);
            clearInterval(timer);
          }
        }, 500)
      }

    };
    if (file) {
      reader.readAsDataURL(file);

    } else {
      alert('nofile');
    }

  }
}

export default checkFileDuration