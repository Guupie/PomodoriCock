const startButton = document.getElementById('start');
const pauseButton = document.getElementById('pause');
const resetButton = document.getElementById('reset');
const workTimeInput = document.getElementById('work-time');
const breakTimeInput = document.getElementById('break-time');
const timeElement = document.querySelector('.time');
const statusElement = document.getElementById('status');
const darkModeToggle = document.getElementById('dark-mode-toggle');
const body = document.body;

let isPaused = true;
let isWorkTime = true;
let time = workTimeInput.value * 60;
let timerInterval;

function updateTimeElement() {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    timeElement.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

function updateStatus() {
    if(!isWorkTime)
    {
        setTimeout(() => {
            const explosion = document.querySelector(".explosion");
            explosion.style.opacity = "1";
            setTimeout(() => {
                explosion.style.opacity = "0";
            }, 1500);
        }, 100);
    }
    statusElement.textContent = isWorkTime ? 'Arbeitszeit' : 'Pausenzeit';
}

function updateTimer() {
    if (time > 0) {
        time--;
    } else {
        isWorkTime = !isWorkTime;
        updateStatus();
        if (isWorkTime) {
            time = workTimeInput.value * 60;
        } else {
            time = breakTimeInput.value * 60;
        }
    }
    updateTimeElement();
}

function startTimer() {
    if (isPaused) {
        isPaused = false;
        timerInterval = setInterval(updateTimer, 1000);
    }
}

function pauseTimer() {
    if (!isPaused) {
        clearInterval(timerInterval);
        isPaused = true;
    }
}

function resetTimer() {
    if (isPaused) {
        isWorkTime = true;
        updateStatus();
        time = workTimeInput.value * 60;
        updateTimeElement();
    }
}

startButton.addEventListener('click', startTimer);

pauseButton.addEventListener('click', pauseTimer);

resetButton.addEventListener('click', resetTimer);

workTimeInput.addEventListener('change', () => {
    if (isPaused && isWorkTime) {
        time = workTimeInput.value * 60;
        updateTimeElement();
    }
});

breakTimeInput.addEventListener('change', () => {
    if (isPaused && !isWorkTime) {
        time = breakTimeInput.value * 60;
        updateTimeElement();
    }
});

updateTimeElement();

darkModeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
});

document.addEventListener("DOMContentLoaded", () => {
    setTimeout(() => {
        const explosion = document.querySelector(".curtain");
        explosion.style.opacity = "1";
        setTimeout(() => {
            explosion.style.opacity = "0";
        }, 3000);
    }, 100);
});
