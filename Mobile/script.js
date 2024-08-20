console.log("Spotify - Web Player Welcomes You");

let songIndex = 1;
let audio = new Audio("Assets/songs/1.mp3");

let isShuffleOn = false;
let isRepeatOn = false;

let masterPlay = document.getElementById("play");
let next = document.getElementById("next");
let previous = document.getElementById("previous");
let shuffle = document.getElementById("shuffle");
let repeat = document.getElementById("repeat");

let progressbar = document.getElementById("progressBar");
let volumeControl = document.getElementById("volumeControl");

let gif = document.getElementById("gif");

let songItems = Array.from(document.getElementsByClassName("songItem"));

let masterSongName = Array.from(document.getElementsByClassName("name-song"));
console.log(masterSongName);

let masterImage = Array.from(document.getElementsByClassName("masterImage"));

let closeNav = document.getElementById("closeNav");

let nowPlaying = document.getElementById("nowPlaying");

let songBanner = document.getElementById("songBanner");
console.log(songBanner);

let songList = document.getElementById("songList");
songList.style.display = "none"
console.log(songList);

let current_time = document.getElementById("current-time");
let song_duration = document.getElementById("song-duration");

let volume = document.getElementById("volume");
// console.log(current_time.innerText)

let playnow = Array.from(document.getElementsByClassName("playnow"));

let playfromcover = Array.from(
  document.getElementsByClassName("playfromcover")
);
console.log(playfromcover);

nowPlaying.addEventListener("click", () => {
  console.log("clicked on now playing");

  if (songBanner.style.visibility === "hidden") {
    songBanner.style.visibility = "visible";
    songBanner.style.display = "";

    songList.style.visibility = "hidden"
    songList.style.display = "none"
    

    nowPlaying.src = "Assets/Icons/nowplaying.svg";

    console.log(songBanner.style.visibility);
  } else {
    songBanner.style.visibility = "hidden";
    songBanner.style.display = "none";

    songList.style.visibility = "visible"
    songList.style.display = ""

    songList.style.marginLeft = "auto";
    songList.style.marginRight = "auto";

    nowPlaying.src = "Assets/Icons/notplaying.svg";

    console.log(songBanner.style.visibility);
  }
});

closeNav.addEventListener("click", () => {
  songBanner.style.visibility = "hidden";
  songBanner.style.display = "none";

  songList.style.visibility = "visible"
  songList.style.display =""

  nowPlaying.src = "Assets/Icons/notplaying.svg";
});

// console.log(masterImage);

// console.log(songItems);

let songs = [
  {
    songName: "Badra Bahaar",
    filePath: "Assets/songs/1.mp3",
    coverPath: "Assets/covers/1.jpg",
  },
  {
    songName: "Desi Girl",
    filePath: "Assets/songs/2.mp3",
    coverPath: "Assets/covers/2.jpg",
  },
  {
    songName: "Dholida",
    filePath: "Assets/songs/3.mp3",
    coverPath: "Assets/covers/3.jpg",
  },
  {
    songName: "Dilli-6",
    filePath: "Assets/songs/4.mp3",
    coverPath: "Assets/covers/4.jpg",
  },
  {
    songName: "Hey Shona",
    filePath: "Assets/songs/5.mp3",
    coverPath: "Assets/covers/5.jpg",
  },
  {
    songName: "Haan Tu Hai",
    filePath: "Assets/songs/6.mp3",
    coverPath: "Assets/covers/6.jpg",
  },
  {
    songName: "Happy Diwali",
    filePath: "Assets/songs/7.mp3",
    coverPath: "Assets/covers/7.jpg",
  },
  {
    songName: "Jugni",
    filePath: "Assets/songs/8.mp3",
    coverPath: "Assets/covers/8.jpg",
  },
  {
    songName: "Jugnu",
    filePath: "Assets/songs/9.mp3",
    coverPath: "Assets/covers/9.jpg",
  },
  {
    songName: "Mujhko Barsat Bana Lo",
    filePath: "Assets/songs/10.mp3",
    coverPath: "Assets/covers/10.jpg",
  },
  {
    songName: "Jimmiki Ponnu",
    filePath: "Assets/songs/11.mp3",
    coverPath: "Assets/covers/11.jpg",
  },
  {
    songName: "Chaleya",
    filePath: "Assets/songs/12.mp3",
    coverPath: "Assets/covers/12.jpg",
  },
];

// function to get the song duration with promise

function getAudioDuration(audioElement) {
  return new Promise((resolve) => {
    audioElement.onloadedmetadata = function () {
      let duration = Math.floor(audioElement.duration); // Get duration in seconds
      let minutes = Math.floor(duration / 60);
      let seconds = duration % 60;
      let formattedDuration = `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`; // Format as minutes:seconds
      resolve(formattedDuration);
    };
  });
}

// adding the individual song info using forEach on songItems array

songItems.forEach((element, i) => {
  // set the cover image, duration and song name
  element.getElementsByTagName("img")[0].src = songs[i].coverPath;
  element.getElementsByClassName("songName")[0].innerText = songs[i].songName;

  const audioElement = new Audio(songs[i].filePath);
  audioElement.preload = "metadata"; // Ensure metadata is loaded

  // Get the duration and set it to the timestamp
  getAudioDuration(audioElement).then((duration) => {
    element.getElementsByClassName("timestamp")[0].innerText = duration;
  });
});

function playSong() {
  audio.play();
  masterPlay.src = "Assets/Icons/pause.svg";
  gif.style.opacity = 1;
}

function pauseSong() {
  audio.pause();
  masterPlay.src = "Assets/Icons/play.svg";
  gif.style.opacity = 0;
}

// handle play/pause
masterPlay.addEventListener("click", () => {
  if (audio.paused || audio.currentTime <= 0) {
    playnow[songIndex - 1].classList.remove("fa-circle-play");
    playnow[songIndex - 1].classList.add("fa-circle-pause");

    playSong();
  } else {
    playnow[songIndex - 1].classList.remove("fa-circle-pause");
    playnow[songIndex - 1].classList.add("fa-circle-play");
    pauseSong();
  }
});

function getCurrentTime(audio) {
  let curtime = Math.floor(audio.currentTime); // Get duration in seconds
  let minutes = Math.floor(curtime / 60);
  let seconds = curtime % 60;
  let formattedTime = `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`; // Format as minutes:seconds

  return formattedTime;
}

getAudioDuration(audio).then((duration) => {
  song_duration.innerText = duration;
});

// update the progressbar using timeupdate event on audio

audio.addEventListener("timeupdate", () => {
  let progress = parseInt((audio.currentTime / audio.duration) * 100);
  progressbar.value = progress;

  current_time.innerText = getCurrentTime(audio);

  // console.log(getCurrentTime(audio))

  if (audio.currentTime == audio.duration) {
    switch (true) {
      case isShuffleOn:
        console.log("current status of shuffle ", isShuffleOn);

        songIndex = Math.floor(Math.random() * songs.length) + 1;

        audio.src = `Assets/songs/${songIndex}.mp3`;
        audio.currentTime = 0;
        progressbar.value = 0; // Reset progress bar

        getAudioDuration(audio).then((duration) => {
          song_duration.innerText = duration;
        });

        masterSongName.forEach((element) => {
          element.innerText = songs[songIndex - 1].songName;
        });

        masterImage.forEach((element) => {
          element.src = `Assets/covers/${songIndex}.jpg`;
        });

        makeAllPlays();

        playnow[songIndex - 1].classList.remove("fa-circle-play");
        playnow[songIndex - 1].classList.add("fa-circle-pause");

        console.log(songIndex);

        playSong();
        break;

      case isRepeatOn:
        console.log("Current status of repeat", isRepeatOn);

        songIndex = songIndex;

        audio.src = `Assets/songs/${songIndex}.mp3`;
        audio.currentTime = 0;
        progressbar.value = 0; // Reset progress bar

        getAudioDuration(audio).then((duration) => {
          song_duration.innerText = duration;
        });

        masterSongName.forEach((element) => {
          element.innerText = songs[songIndex - 1].songName;
        });

        masterImage.forEach((element) => {
          element.src = `Assets/covers/${songIndex}.jpg`;
        });

        makeAllPlays();

        playnow[songIndex - 1].classList.remove("fa-circle-play");
        playnow[songIndex - 1].classList.add("fa-circle-pause");

        console.log(songIndex);

        playSong();

        break;

      default:
        if (songIndex >= 12) {
          songIndex = 1;
        } else {
          songIndex += 1;
        }

        audio.src = `Assets/songs/${songIndex}.mp3`;
        audio.currentTime = 0;
        progressbar.value = 0; // Reset progress bar

        getAudioDuration(audio).then((duration) => {
          song_duration.innerText = duration;
        });

        masterSongName.forEach((element) => {
          element.innerText = songs[songIndex - 1].songName;
        });

        masterImage.forEach((element) => {
          element.src = `Assets/covers/${songIndex}.jpg`;
        });

        makeAllPlays();

        playnow[songIndex - 1].classList.remove("fa-circle-play");
        playnow[songIndex - 1].classList.add("fa-circle-pause");

        console.log(songIndex);

        playSong();
        break;
    }
  }
});

// seek the progressbar event
progressbar.addEventListener("input", () => {
  audio.currentTime = (progressbar.value * audio.duration) / 100;
});

const makeAllPlays = () => {
  playnow.forEach((element) => {
    element.classList.remove("fa-circle-pause");
    element.classList.add("fa-circle-play");
  });
};

// handle next/previous
next.addEventListener("click", () => {
  console.log("clicked next");

  switch (true) {
    case isShuffleOn:
      console.log("current status of shuffle ", isShuffleOn);

      songIndex = Math.floor(Math.random() * songs.length) + 1;

      audio.src = `Assets/songs/${songIndex}.mp3`;
      audio.currentTime = 0;
      progressbar.value = 0; // Reset progress bar

      getAudioDuration(audio).then((duration) => {
        song_duration.innerText = duration;
      });

      masterSongName.forEach((element) => {
        element.innerText = songs[songIndex - 1].songName;
      });

      masterImage.forEach((element) => {
        element.src = `Assets/covers/${songIndex}.jpg`;
      });

      makeAllPlays();

      playnow[songIndex - 1].classList.remove("fa-circle-play");
      playnow[songIndex - 1].classList.add("fa-circle-pause");

      console.log(songIndex);

      playSong();
      break;

    case isRepeatOn:
      console.log("Current status of repeat", isRepeatOn);

      songIndex = songIndex;

      audio.src = `Assets/songs/${songIndex}.mp3`;
      audio.currentTime = 0;
      progressbar.value = 0; // Reset progress bar

      getAudioDuration(audio).then((duration) => {
        song_duration.innerText = duration;
      });

      masterSongName.forEach((element) => {
        element.innerText = songs[songIndex - 1].songName;
      });

      masterImage.forEach((element) => {
        element.src = `Assets/covers/${songIndex}.jpg`;
      });

      makeAllPlays();

      playnow[songIndex - 1].classList.remove("fa-circle-play");
      playnow[songIndex - 1].classList.add("fa-circle-pause");

      console.log(songIndex);

      playSong();

      break;

    default:
      if (songIndex >= 12) {
        songIndex = 1;
      } else {
        songIndex += 1;
      }

      audio.src = `Assets/songs/${songIndex}.mp3`;
      audio.currentTime = 0;
      progressbar.value = 0; // Reset progress bar

      getAudioDuration(audio).then((duration) => {
        song_duration.innerText = duration;
      });

      masterSongName.forEach((element) => {
        element.innerText = songs[songIndex - 1].songName;
      });

      masterImage.forEach((element) => {
        element.src = `Assets/covers/${songIndex}.jpg`;
      });

      makeAllPlays();

      playnow[songIndex - 1].classList.remove("fa-circle-play");
      playnow[songIndex - 1].classList.add("fa-circle-pause");

      console.log(songIndex);

      playSong();
      break;
  }
});

previous.addEventListener("click", () => {
  console.log("clicked previous");

  if (songIndex <= 1) {
    songIndex = 12;
  } else {
    songIndex -= 1;
  }

  audio.src = `Assets/songs/${songIndex}.mp3`;
  audio.currentTime = 0;
  progressbar.value = 0; // Reset progress bar

  getAudioDuration(audio).then((duration) => {
    song_duration.innerText = duration;
  });

  masterSongName.forEach((element) => {
    element.innerText = songs[songIndex - 1].songName;
  });

  masterImage.forEach((element) => {
    element.src = `Assets/covers/${songIndex}.jpg`;
  });

  console.log(songIndex);

  makeAllPlays();

  playnow[songIndex - 1].classList.remove("fa-circle-play");
  playnow[songIndex - 1].classList.add("fa-circle-pause");

  console.log(songIndex);

  playSong();
});

// handle play/pause from songs list
playnow.forEach((element) => {
  element.addEventListener("click", (e) => {
    // Get the song index from the clicked element
    const newSongIndex = parseInt(e.target.id);

    // If a different song is selected, change the source and play the new song
    if (songIndex !== newSongIndex || audio.paused || audio.currentTime <= 0) {
      songIndex = newSongIndex;

      audio.src = `Assets/songs/${songIndex}.mp3`;
      audio.currentTime = 0;
      progressbar.value = 0; // Reset progress bar

      getAudioDuration(audio).then((duration) => {
        song_duration.innerText = duration;
      });

      masterSongName.forEach((element) => {
        element.innerText = songs[songIndex - 1].songName;
      });

      masterImage.forEach((element) => {
        element.src = `Assets/covers/${songIndex}.jpg`;
      });

      makeAllPlays();
      element.classList.remove("fa-circle-play");
      element.classList.add("fa-circle-pause");

      playSong();

      console.log("clicked on the play at", songIndex);
      console.log("song is playing");
    } else {
      // Pause the song if it's already playing
      element.classList.add("fa-circle-play");
      element.classList.remove("fa-circle-pause");

      pauseSong();

      console.log("clicked on the play at", songIndex);
      console.log("song is paused");
    }
  });
});

//  handle play from cover images
playfromcover.forEach((element) => {
  element.addEventListener("click", (e) => {
    // Get the song index from the clicked element
    const newSongIndex = parseInt(e.target.id);
    console.log(e.target);

    // If a different song is selected, change the source and play the new song
    if (songIndex !== newSongIndex || audio.paused || audio.currentTime <= 0) {
      songIndex = newSongIndex;

      audio.src = `Assets/songs/${songIndex}.mp3`;
      audio.currentTime = 0;
      progressbar.value = 0; // Reset progress bar

      getAudioDuration(audio).then((duration) => {
        song_duration.innerText = duration;
      });

      masterSongName.forEach((element) => {
        element.innerText = songs[songIndex - 1].songName;
      });

      masterImage.forEach((element) => {
        element.src = `Assets/covers/${songIndex}.jpg`;
      });

      makeAllPlays();

      playnow[newSongIndex - 1].classList.remove("fa-circle-play");
      playnow[newSongIndex - 1].classList.add("fa-circle-pause");

      playSong();

      console.log("clicked on the play at", songIndex);
      console.log("song is playing");
    } else {
      // Play the song if it's already playing from start

      audio.src = `Assets/songs/${songIndex}.mp3`;
      audio.currentTime = 0;
      progressbar.value = 0; // Reset progress bar

      playSong();

      console.log("clicked on the play at", songIndex);
      console.log("song is playing");

    }
  });
});

// shuffle,repeat logic

shuffle.addEventListener("click", () => {
  if (shuffle.id === "shuffle") {
    shuffle.src = "Assets/Icons/shuffleon.svg";
    isShuffleOn = true;
    console.log("Shuffle On", isShuffleOn);
    shuffle.id = "shuffleoff";
  } else {
    shuffle.src = "Assets/Icons/shuffleoff.svg";
    isShuffleOn = false;
    console.log("Shuffle Off", isShuffleOn);
    shuffle.id = "shuffle";
  }
});

repeat.addEventListener("click", () => {
  if (repeat.id === "repeat") {
    repeat.src = "Assets/Icons/repeaton.svg";
    isRepeatOn = true;
    console.log("repeat On", isRepeatOn);
    repeat.id = "repeatoff";
  } else {
    repeat.src = "Assets/Icons/repeatoff.svg";
    isRepeatOn = false;
    console.log("repeat Off", isRepeatOn);
    repeat.id = "repeat";
  }
});

let mute = false;
let lastVolume = 0.25; // Store the last volume before muting

volume.addEventListener("click", () => {
  if (mute) {
    volume.src = "Assets/Icons/volume.svg";
    volumeControl.value = lastVolume * 100; // Restore the previous volume level
    audio.volume = lastVolume;
    mute = false;
  } else {
    volume.src = "Assets/Icons/mute.svg";
    lastVolume = audio.volume; // Save the current volume before muting
    volumeControl.value = 0;
    audio.volume = 0.0;
    mute = true;
  }
});

volumeControl.addEventListener("input", () => {
  audio.volume = volumeControl.value / 100;
  if (audio.volume === 0) {
    volume.src = "Assets/Icons/mute.svg";
    mute = true;
  } else {
    volume.src = "Assets/Icons/volume.svg";
    mute = false;
    lastVolume = audio.volume; // Update the last volume whenever the slider is changed
  }
});