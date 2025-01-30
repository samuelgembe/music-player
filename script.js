const audio = document.querySelector("#audio");
const title = document.querySelector(".title");
const artist = document.querySelector(".artist");
const playPauseButton = document.querySelector("#play-pause-button");
const rangeSong = document.getElementById("range-song");
const progressCurrent = document.querySelector('#current-time');
const progressRemaining = document.querySelector('#remaining-time');
const likeButton = document.querySelector(".like-button");
const mainCover = document.getElementById('main-cover');

let isPlaying = false;
let currentSongIndex = 0;

// Audio event listeners
audio.addEventListener("timeupdate", updateProgress);
audio.addEventListener('loadedmetadata', updateDuration);

// Like button functionality
function toggleLike() {
    likeButton.querySelector('i').classList.toggle('bi-heart-fill');
    likeButton.querySelector('i').classList.toggle('bi-heart');
}

likeButton.addEventListener("click", toggleLike);

// Song loading
function loadSong(song) {
    mainCover.src = song.cover;
    title.textContent = song.title;
    artist.textContent = song.artist;
    audio.src = song.src;
    
    audio.load();
    if(isPlaying) audio.play().catch(console.error);
    updateProgress({ srcElement: audio });
}

// Navigation functions
function nextSong() {
    currentSongIndex = (currentSongIndex + 1) % songList.length;
    loadSong(songList[currentSongIndex]);
}

function prevSong() {
    currentSongIndex = (currentSongIndex - 1 + songList.length) % songList.length;
    loadSong(songList[currentSongIndex]);
}

// Progress handling
function updateProgress(e) {
    const { duration, currentTime } = e.srcElement;
    if (!duration) return;

    const progressPercent = (currentTime / duration) * 100;
    rangeSong.value = currentTime;
    rangeSong.max = duration;
    rangeSong.style.setProperty('--progress', `${progressPercent}%`);

    progressCurrent.textContent = formatTime(currentTime);
    progressRemaining.textContent = `-${formatTime(duration - currentTime)}`;
}

function updateDuration() {
    rangeSong.max = audio.duration;
    progressRemaining.textContent = `-${formatTime(audio.duration)}`;
}

// Time formatting
function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
}

// Seek functionality
rangeSong.addEventListener('input', () => {
    audio.currentTime = rangeSong.value;
});

// Play/pause toggle
function togglePlayPause() {
    if (isPlaying) {
        audio.pause();
        playPauseButton.innerHTML = '<i class="bi bi-play-circle-fill"></i>';
    } else {
        audio.play();
        playPauseButton.innerHTML = '<i class="bi bi-pause-circle-fill"></i>';
    }
    isPlaying = !isPlaying;
}

// Song list
const songList = [
    {
        id: 0,
        title: "Ayonha",
        artist: "Hamid El Shaeri",
        src: "music/ayonha-hamid.mp3",
        cover: "img/ayonha.jpg"
    },
    {
        id: 1,
        title: "Matar Al Sabah",
        artist: "Ferkat Al Ard",
        src: "music/Matar_Al_Sabah.mp3",
        cover: "img/matar-al-sabah.jpg"
    },
    {
        id: 2,
        title: "Maya",
        artist: "Ahmed Malek",
        src: "music/Maya.mp3",
        cover: "img/maya.jpg"
    }
];

// Event listeners
document.querySelector(".play-button").addEventListener("click", togglePlayPause);
document.querySelector(".skip-right-button").addEventListener('click', nextSong);
document.querySelector(".skip-left-button").addEventListener('click', prevSong);

// Initialization
window.addEventListener('DOMContentLoaded', () => {
    loadSong(songList[0]);
});