// Initialize the Variables
let songIndex = 0;
let audioElement = new Audio("songs/1.mp3");
let masterPlay = document.getElementById("masterPlay");
let myProgressBar = document.getElementById("myProgressBar");
let gif = document.getElementById("gif");
let masterSongName = document.getElementById("masterSongName");
let songItems = Array.from(document.getElementsByClassName("songItem"));
let cover = document.getElementById("songBanner");

let songs = [
  {
    songName: "Butter Bts",
    filePath: "songs/1.mp3",
    coverPath: "covers/1.jpg",
  },
  {
    songName: "Dirty Little Secret Zack Knight",
    filePath: "songs/2.mp3",
    coverPath: "covers/2.jpg",
  },
  {
    songName: "Fake A Smile Alan Walker",
    filePath: "songs/3.mp3",
    coverPath: "covers/3.jpg",
  },
  {
    songName: "Go Down Deh Spice",
    filePath: "songs/4.mp3",
    coverPath: "covers/4.jpg",
  },
  {
    songName: "Lil Mama See Road Runner",
    filePath: "songs/5.mp3",
    coverPath: "covers/5.jpg",
  },
  { songName: "Paro Nej", filePath: "songs/2.mp3", coverPath: "covers/6.jpg" },
  {
    songName: "Play Date Lilly Brooks",
    filePath: "songs/2.mp3",
    coverPath: "covers/7.jpg",
  },
  {
    songName: "Too Much Dimitri Vegas Like Mike",
    filePath: "songs/2.mp3",
    coverPath: "covers/8.jpg",
  },
  {
    songName: "Up Cardi B",
    filePath: "songs/2.mp3",
    coverPath: "covers/9.jpg",
  },
  {
    songName: "Your Power Billie Eilish",
    filePath: "songs/4.mp3",
    coverPath: "covers/10.jpg",
  },
];

songItems.forEach((element, i) => {
  element.getElementsByTagName("img")[0].src = songs[i].coverPath;
  element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
  cover.getElementsByTagName("img")[0].src = songs[0].coverPath;
});

// Handle play/pause click
masterPlay.addEventListener("click", () => {
  if (audioElement.paused || audioElement.currentTime <= 0) {
    audioElement.play();
    masterPlay.classList.remove("fa-play-circle");
    masterPlay.classList.add("fa-pause-circle");
    gif.style.opacity = 1;
    songItems[songIndex]
      .getElementsByClassName("songItemPlay")[0]
      .classList.remove("fa-play-circle");
    songItems[songIndex]
      .getElementsByClassName("songItemPlay")[0]
      .classList.add("fa-pause-circle");
    console.log(cover);
    cover.getElementsByTagName("img")[0].src = songs[songIndex].coverPath;
  } else {
    audioElement.pause();
    masterPlay.classList.remove("fa-pause-circle");
    masterPlay.classList.add("fa-play-circle");
    gif.style.opacity = 0;
    songItems[songIndex]
      .getElementsByClassName("songItemPlay")[0]
      .classList.remove("fa-pause-circle");
    songItems[songIndex]
      .getElementsByClassName("songItemPlay")[0]
      .classList.add("fa-play-circle");
    cover.getElementsByTagName("img")[0].src = songs[songIndex].coverPath;
  }
});
// Listen to Events
audioElement.addEventListener("timeupdate", () => {
  // Update Seekbar
  progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
  myProgressBar.value = progress;
  if (progress === 100) {
    gif.style.opacity = 0;
    makeAllPlays();
    masterPlay.classList.remove("fa-pause-circle");
    masterPlay.classList.add("fa-play-circle");
  }
});

myProgressBar.addEventListener("change", () => {
  audioElement.currentTime =
    (myProgressBar.value * audioElement.duration) / 100;
});

const makeAllPlays = () => {
  Array.from(document.getElementsByClassName("songItemPlay")).forEach(
    (element) => {
      element.classList.remove("fa-pause-circle");
      element.classList.add("fa-play-circle");
    }
  );
};

Array.from(document.getElementsByClassName("songItemPlay")).forEach(
  (element) => {
    element.addEventListener("click", (e) => {
      if (audioElement.paused || audioElement.currentTime <= 0) {
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove("fa-play-circle");
        e.target.classList.add("fa-pause-circle");
        if (songs[songIndex].songName !== masterSongName.innerText) {
          audioElement.src = `songs/${songIndex + 1}.mp3`;
          masterSongName.innerText = songs[songIndex].songName;
          audioElement.currentTime = 0;
          audioElement.play();
          gif.style.opacity = 1;
          masterPlay.classList.remove("fa-play-circle");
          masterPlay.classList.add("fa-pause-circle");
          cover.getElementsByTagName("img")[0].src = songs[songIndex].coverPath;
          return;
        }
        audioElement.play();
        gif.style.opacity = 1;
        masterPlay.classList.remove("fa-play-circle");
        masterPlay.classList.add("fa-pause-circle");
        cover.getElementsByTagName("img")[0].src = songs[songIndex].coverPath;
      } else {
        songIndex = parseInt(e.target.id);
        e.target.classList.remove("fa-pause-circle");
        e.target.classList.add("fa-play-circle");
        if (songs[songIndex].songName !== masterSongName.innerText) {
          makeAllPlays();
          e.target.classList.remove("fa-play-circle");
          e.target.classList.add("fa-pause-circle");
          audioElement.src = `songs/${songIndex + 1}.mp3`;
          masterSongName.innerText = songs[songIndex].songName;
          audioElement.currentTime = 0;
          audioElement.play();
          gif.style.opacity = 1;
          masterPlay.classList.remove("fa-play-circle");
          masterPlay.classList.add("fa-pause-circle");
          cover.getElementsByTagName("img")[0].src = songs[songIndex].coverPath;
          return;
        }
        audioElement.pause();
        gif.style.opacity = 0;
        masterPlay.classList.remove("fa-pause-circle");
        masterPlay.classList.add("fa-play-circle");
        cover.getElementsByTagName("img")[0].src = songs[songIndex].coverPath;
      }
    });
  }
);

document.getElementById("next").addEventListener("click", () => {
  if (songIndex >= 9) {
    songIndex = 0;
  } else {
    songIndex += 1;
  }

  audioElement.src = `songs/${songIndex + 1}.mp3`;
  masterSongName.innerText = songs[songIndex].songName;
  audioElement.currentTime = 0;
  audioElement.play();
  masterPlay.classList.remove("fa-play-circle");
  masterPlay.classList.add("fa-pause-circle");
  makeAllPlays();
  gif.style.opacity = 1;
  songItems[songIndex]
    .getElementsByClassName("songItemPlay")[0]
    .classList.remove("fa-play-circle");
  songItems[songIndex]
    .getElementsByClassName("songItemPlay")[0]
    .classList.add("fa-pause-circle");
  cover.getElementsByTagName("img")[0].src = songs[songIndex].coverPath;
});

document.getElementById("previous").addEventListener("click", () => {
  if (songIndex <= 0) {
    songIndex = 0;
  } else {
    songIndex -= 1;
  }
  audioElement.src = `songs/${songIndex + 1}.mp3`;
  masterSongName.innerText = songs[songIndex].songName;
  audioElement.currentTime = 0;
  audioElement.play();
  masterPlay.classList.remove("fa-play-circle");
  masterPlay.classList.add("fa-pause-circle");
  makeAllPlays();
  gif.style.opacity = 1;
  songItems[songIndex]
    .getElementsByClassName("songItemPlay")[0]
    .classList.remove("fa-play-circle");
  songItems[songIndex]
    .getElementsByClassName("songItemPlay")[0]
    .classList.add("fa-pause-circle");
  cover.getElementsByTagName("img")[0].src = songs[songIndex].coverPath;
});
