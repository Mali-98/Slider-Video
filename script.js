const video = document.getElementById('video');
const slider = document.getElementById('slider');

slider.addEventListener('input', function() {
    const value = slider.value;
    const duration = video.duration;
    video.currentTime = (value / 100) * duration;
});

video.addEventListener('timeupdate', function() {
    const currentTime = video.currentTime;
    const duration = video.duration;
    slider.value = (currentTime / duration) * 100;
});
