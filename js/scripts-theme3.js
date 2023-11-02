let videos = document.querySelectorAll(".full-page-video");
let currentIndex = 0;

// Initialize videos: only the first video is playable at first.
for (let i = 1; i < videos.length; i++) {
  videos[i].style.display = "none";
}

function unlockNextVideo() {
  if (currentIndex < videos.length - 1) {
    // Hide the current video
    videos[currentIndex].style.display = "none";

    // Increment the index
    currentIndex++;

    // Display the next video
    videos[currentIndex].style.display = "block";

    alert("The next video is unlocked! Click To watch it");
  }
}
