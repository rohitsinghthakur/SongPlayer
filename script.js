let song1 = new Audio("song2.mp3");
let song2 = new Audio("song3.mp3");
let song3 = new Audio("song4.mp3");
let song4 = new Audio("song5.mp3");
let song5 = new Audio("song6.mp3");
let song6 = new Audio("song7.mp3");

let songArr = [
  { el: song2, name: "Tere Hawale ", songImage: "song3.jpg" },
  { el: song1, name: "Баяноммай Ты моя ", songImage: "song2.jpg" },
  { el: song3, name: "Haniya ", songImage: "song4.jpg" },
  { el: song4, name: "Ram Ayenge ", songImage: "song5.jpg" },
  { el: song5, name: "O Mahi ", songImage: "song6.jpg" },
  { el: song6, name: "Tange Wale ", songImage: "song7.jpg" },
];

let backgroundContainer = document.querySelector(".background-container");
for (const song of songArr) {
  song.el.addEventListener("ended", () => {

      playNextSong();
  });
}
let current = 0;

let currentSong = songArr[current].el;

let playBtn = document.querySelector("#playBtn");

playBtn.addEventListener("click", () => {
  if (currentSong.paused) {
    currentSong.play();
  } else {
    currentSong.pause();
  }
  checkPlaySymbol();
});

let nextBtn = document.querySelector("#nextBtn");
nextBtn.addEventListener("click", () => {
  playNextSong();
  checkPlaySymbol();
});
function playNextSong() {
  unSelectQueueSongs();
  current++;
  if (current >= songArr.length) {
    current = 0;
  }
  selectQueueSongs();
  currentSong.pause();
  currentSong.currentTime = 0;
  currentSong = songArr[current].el;
  currentSong.play();
  updateInfo();
}
let prevBtn = document.querySelector("#prevBtn");
prevBtn.addEventListener("click", () => {
  prevSong();
  checkPlaySymbol();
});
function prevSong() {
  unSelectQueueSongs();
  current--;
  if (current < 0) {
    current = songArr.length - 1;
  }
  selectQueueSongs();
  currentSong.pause();
  currentSong.currentTime = 0;
  currentSong = songArr[current].el;
  currentSong.play();
}

function checkPlaySymbol() {
  rangeInput.max = currentSong.duration;
  updateInfo();
  if (currentSong.played) {
    playBtn.classList.remove("ri-play-circle-line");
    playBtn.classList.add("ri-pause-circle-line");
    playBtn.style.color = "#00ccff";
  }
  if (currentSong.paused) {
    playBtn.classList.remove("ri-pause-circle-line");
    playBtn.classList.add("ri-play-circle-line");
    playBtn.style.color = "white";
  }
}

let rangeInput = document.querySelector("#rangeBar");

setInterval(() => {
  rangeInput.value = currentSong.currentTime;
}, 100);

rangeInput.addEventListener("input", () => {
  currentSong.currentTime = rangeInput.value;
  currentSong.play();

    playBtn.classList.add("ri-pause-circle-line");
    playBtn.classList.remove("ri-play-circle-line");
    playBtn.style.color = "#00ccff";
  
  
  
});
function updateInfo() {
  let songName = document.querySelector("#songName");
  songName.innerHTML = songArr[current].name;

  let songImage = document.querySelector(".song-image img");
  songImage.src = songArr[current].songImage;

  updateBackgroundImage();
}
updateInfo();

backgroundContainer.style.setProperty(
  "--after-background-image",
  'url("song3.jpg")'
);

function updateBackgroundImage() {
  let currentSongImage = songArr[current].songImage;
  backgroundContainer.style.setProperty(
    "--after-background-image",
    `url("${currentSongImage}")`
  );
}
updateBackgroundImage();

let queueSongs = document.querySelectorAll(".song-logo img");
let queueName = document.querySelectorAll(".songs p");
let queueDiv = document.querySelector(".songs-queue");

for (let i = 0; i < songArr.length; i++) {
  let songDiv = document.createElement("div");
  songDiv.className = "songs";

  let songImg = document.createElement("div");
  songImg.className = "song-logo";

  let myImg = document.createElement("img");
  myImg.src = `${songArr[i].songImage}`;

  songImg.appendChild(myImg);
  songDiv.append(i + 1);
  songDiv.appendChild(songImg);
  let mySongName = document.createElement("p");

  mySongName.innerText = songArr[i].name;
  songDiv.appendChild(mySongName);
  queueDiv.appendChild(songDiv);

  songDiv.addEventListener("click",(e)=>{
    let index = e.currentTarget.textContent;
   index = parseInt(index,10)
   currentSong.pause();
   unSelectQueueSongs();
   current = index-1;
   currentSong = songArr[current].el;
   currentSong.currentTime = 0;
    currentSong.play();
   updateInfo();
   checkPlaySymbol();
   selectQueueSongs();

  
  
    
  })
}
let myQueueSongs = document.querySelectorAll(".songs-queue .songs");
function selectQueueSongs() {
  myQueueSongs[current].style.backgroundColor = "#00ccff";
}
function unSelectQueueSongs() {
  myQueueSongs[current].style.backgroundColor = "#213043";
}
selectQueueSongs();

let menuBtn = document.querySelector(".ri-menu-2-line");

menuBtn.addEventListener("click", () => {
  if (queueDiv.style.left == "-300px") {
    queueDiv.style.left = 0;
  } else {
    queueDiv.style.left = "-300px";
  }
});
