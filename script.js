const video = document.getElementById('video');
const bar = document.getElementById('bar');
const handleLeft = document.getElementById('handle-left');
const handleRight = document.getElementById('handle-right');

let isDraggingLeft = false;
let isDraggingRight = false;
let barAngle = 0;
let animationFrameId;

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

    // Calculate speed based on angle
    const speed = (barAngle / 180) * 2; // Adjust multiplier for desired speed

    // Cancel any previous animation frame
    if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
    }

    // Update video time based on speed
    function updateVideoTime() {
        video.currentTime = Math.max(0, Math.min(video.currentTime + speed, video.duration));
        const progressWidth = (video.currentTime / video.duration) * 100;
        bar.style.background = `linear-gradient(to right, blue 0%, blue ${progressWidth}%, #333 ${progressWidth}%, #333 100%)`;

        // Continue updating if the bar is still tilted
        if (isDraggingLeft || isDraggingRight) {
            animationFrameId = requestAnimationFrame(updateVideoTime);
        }
    }

    // Start updating video time
    updateVideoTime();
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
