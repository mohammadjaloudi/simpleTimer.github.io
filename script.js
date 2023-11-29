const timeDis = document.querySelector("#timeDis");
const start = document.querySelector("#start");
const pause = document.querySelector("#pause");
const reset = document.querySelector("#reset");
const audioStartTimeInput = document.querySelector("#audioStartTime");

let startTime = 0;
let elapsedTime = 0;
let paused = true;
let animationFrameId;
let audio;

start.addEventListener("click", () => {
    if (paused) {
        paused = false;
        startTime = Date.now() - elapsedTime;
        requestAnimationFrame(updateTime);
    }
});

pause.addEventListener("click", () => {
    if (!paused) {
        paused = true;
        elapsedTime = Date.now() - startTime;

        if (audio) {
            audio.pause();
            audio = null;
        }
    }
});

reset.addEventListener("click", () => {
    paused = true;
    cancelAnimationFrame(animationFrameId);
    startTime = 0;
    elapsedTime = 0;
    timeDis.textContent = "00:00:00";

    if (audio) {
        audio.pause();
        audio = null;
    }
});

function updateTime() {
    if (!paused) {
        elapsedTime = Date.now() - startTime;

        const totalSeconds = Math.floor(elapsedTime / 1000);
        const secs = totalSeconds % 60;
        const mins = Math.floor(totalSeconds / 60) % 60;
        const hrs = Math.floor(totalSeconds / 3600);

        timeDis.textContent = `${pad(hrs)}:${pad(mins)}:${pad(secs)}`;

        const audioStartTime = parseInt(audioStartTimeInput.value, 10);

        if (totalSeconds === audioStartTime && !audio) {
            audio = playAudio("LND.mp3");
        } else if (totalSeconds === 0 && audio) {
            audio.pause();
            audio = null;
        }

        animationFrameId = requestAnimationFrame(updateTime);
    }
}

function playAudio(audioFileName) {
    const newAudio = new Audio(audioFileName);
    newAudio.volume = 0.5;
    newAudio.play();
    return newAudio;
}

function pad(unit) {
    return unit < 10 ? `0${unit}` : unit;
}

audioStartTimeInput.addEventListener("input", () => {
    if (!paused) {
        paused = true;
        elapsedTime = Date.now() - startTime;

        if (audio) {
            audio.pause();
            audio = null;
        }
    }
});