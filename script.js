const video = document.getElementById('video');
const slider = document.getElementById('slider');
const sliderContainer = document.getElementById('slider-container');

slider.addEventListener('input', function() {
    const value = slider.value;
    const angle = (value / 100) * 360;
    const speedFactor = 1 + (angle / 360); // Speed factor from 1 to 2
    video.playbackRate = speedFactor;
});

sliderContainer.addEventListener('click', function(event) {
    const rect = sliderContainer.getBoundingClientRect();
    const x = event.clientX - rect.left - rect.width / 2;
    const y = event.clientY - rect.top - rect.height / 2;
    const angle = Math.atan2(y, x) * (180 / Math.PI) + 90;
    const value = ((angle + 360) % 360) / 360 * 100;
    slider.value = value;
    const speedFactor = 1 + (value / 100);
    video.playbackRate = speedFactor;
});
