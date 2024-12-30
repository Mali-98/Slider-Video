const video = document.getElementById('video');
const bar = document.getElementById('bar');
const handleLeft = document.getElementById('handle-left');
const handleRight = document.getElementById('handle-right');

let isDraggingLeft = false;
let isDraggingRight = false;
let barAngle = 0;

function updateBarRotation(event, handle) {
    const barRect = bar.getBoundingClientRect();
    const centerX = barRect.left + barRect.width / 2;
    const centerY = barRect.top + barRect.height / 2;

    const deltaX = event.clientX - centerX;
    const deltaY = event.clientY - centerY;

    // Calculate angle in degrees
    const angle = Math.atan2(deltaY, deltaX) * (180 / Math.PI);
    barAngle = angle;

    bar.style.transform = `rotate(${barAngle}deg)`;

    // Adjust video playback position based on bar angle
    const videoDuration = video.duration;
    const newTime = ((barAngle + 180) / 360) * videoDuration;
    video.currentTime = Math.max(0, Math.min(newTime, videoDuration));
}

// Left handle drag events
handleLeft.addEventListener('mousedown', () => {
    isDraggingLeft = true;
});

handleRight.addEventListener('mousedown', () => {
    isDraggingRight = true;
});

document.addEventListener('mousemove', (event) => {
    if (isDraggingLeft || isDraggingRight) {
        updateBarRotation(event, isDraggingLeft ? handleLeft : handleRight);
    }
});

document.addEventListener('mouseup', () => {
    isDraggingLeft = false;
    isDraggingRight = false;
});
