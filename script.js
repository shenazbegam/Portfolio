// Sample data for playlists
const recentlyPlayed = [
    {
        title: "Daily Mix 1",
        description: "Made for you",
        imageUrl: "https://placehold.co/300/1DB954/FFFFFF?text=Daily+Mix+1",
        tracks: [
            { title: "Track 1", artist: "Artist A", duration: "3:45", url: "audio/sample1.mp3" },
            { title: "Track 2", artist: "Artist B", duration: "4:12", url: "audio/sample2.mp3" }
        ]
    },
    {
        title: "Discover Weekly",
        description: "Your weekly mixtapes",
        imageUrl: "https://placehold.co/300/1DB954/FFFFFF?text=Discover+Weekly",
        tracks: [
            { title: "Track 3", artist: "Artist C", duration: "2:30", url: "audio/sample3.mp3" },
            { title: "Track 4", artist: "Artist D", duration: "3:15", url: "audio/sample4.mp3" }
        ]
    },
    // Add more playlists as needed
];

const madeForYou = [
    {
        title: "Release Radar",
        description: "New releases from artists you follow",
        imageUrl: "https://placehold.co/300/1DB954/FFFFFF?text=Release+Radar",
        tracks: [
            { title: "Track 5", artist: "Artist E", duration: "3:50", url: "audio/sample5.mp3" },
            { title: "Track 6", artist: "Artist F", duration: "4:05", url: "audio/sample6.mp3" }
        ]
    },
    // Add more playlists as needed
];

// Function to create playlist cards
function createPlaylistCard(playlist) {
    return `
        <div class="playlist-card" onclick="loadPlaylist('${playlist.title}')">
            <div class="playlist-card-img">
                <img src="${playlist.imageUrl}" alt="${playlist.title} playlist cover">
            </div>
            <h3>${playlist.title}</h3>
            <p>${playlist.description}</p>
        </div>
    `;
}

// Function to render playlists
function renderPlaylists(containerId, playlists) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    container.innerHTML = playlists.map(createPlaylistCard).join('');
}

// Load selected playlist
function loadPlaylist(playlistTitle) {
    const playlist = [...recentlyPlayed, ...madeForYou].find(p => p.title === playlistTitle);
    if (playlist) {
        currentPlaylist = playlist.tracks;
        currentTrackIndex = 0;
        loadTrack(currentPlaylist[currentTrackIndex]);
        playTrack();
    }
}

// Load track details
function loadTrack(track) {
    const audioPlayer = document.querySelector('audio');
    audioPlayer.src = track.url;
    document.querySelector('.song-details h4').textContent = track.title;
    document.querySelector('.song-details p').textContent = track.artist;
    document.querySelector('.time:last-child').textContent = track.duration;
}

// Play track
function playTrack() {
    const audioPlayer = document.querySelector('audio');
    audioPlayer.play();
    isPlaying = true;
    document.querySelector('.play-button').innerHTML = '<i class="fas fa-pause"></i>';
    startProgressTimer();
}

// Pause track
function pauseTrack() {
    const audioPlayer = document.querySelector('audio');
    audioPlayer.pause();
    isPlaying = false;
    document.querySelector('.play-button').innerHTML = '<i class="fas fa-play"></i>';
    clearInterval(progressInterval);
}

// Update progress bar
function updateProgress() {
    const audioPlayer = document.querySelector('audio');
    const progress = (audioPlayer.currentTime / audioPlayer.duration) * 100;
    document.querySelector('.progress').style.width = `${progress}%`;
    document.querySelector('.time:first-child').textContent = formatTime(audioPlayer.currentTime);
}

// Format time
function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
}

// Start progress timer
function startProgressTimer() {
    clearInterval(progressInterval);
    progressInterval = setInterval(updateProgress, 1000);
}

// Initialize the app
document.addEventListener('DOMContentLoaded', function() {
    // Render playlists
    renderPlaylists('recently-played', recentlyPlayed);
    renderPlaylists('made-for-you', madeForYou);
    
    // Player controls functionality
    const playButton = document.querySelector('.play-button');
    const audioPlayer = document.createElement('audio');

    playButton.addEventListener('click', function() {
        if (isPlaying) {
            pauseTrack();
        } else {
            playTrack();
        }
    });
});
