const btnNo = document.querySelector("#btn-random");

function moverAleatoriamente(btn) {
    btn.style.position = "absolute";
    btn.style.fontWeight = "bolder";
    btn.style.top = Math.floor(Math.random() * 90 + 5) + "%";
    btn.style.left = Math.floor(Math.random() * 90 + 5) + "%";
}

if (btnNo) {
    btnNo.addEventListener("mouseenter", function (e) {
        moverAleatoriamente(e.target);
    });

    btnNo.addEventListener("touchstart", function (e) {
        e.preventDefault();
        moverAleatoriamente(e.target);
    }, { passive: false });

    btnNo.addEventListener("click", function (e) {
        e.preventDefault();
        moverAleatoriamente(e.currentTarget);
    });
}

const music = document.getElementById("bg-music");
const musicBtn = document.getElementById("music-toggle");

if (music && musicBtn) {
    const label = musicBtn.querySelector(".label");
    let blocked = false;

    function updateMusicUI() {
        const playing = !music.paused && !music.ended;
        musicBtn.classList.toggle("playing", playing);
        musicBtn.setAttribute("aria-label", playing ? "Pausar música de fondo" : (blocked ? "Activar música de fondo" : "Reproducir música de fondo"));
        if (label) label.textContent = playing ? "Pausar" : (blocked ? "Activar música" : "Música");
    }

    function playMusic() {
        const attempt = music.play();
        if (attempt && typeof attempt.then === "function") {
            attempt.then(function () {
                blocked = false;
                updateMusicUI();
            }).catch(function () {
                if (music.paused) blocked = true;
                updateMusicUI();
            });
        }
    }

    musicBtn.addEventListener("click", function () {
        if (music.paused) {
            playMusic();
        } else {
            music.pause();
        }
    });

    music.addEventListener("play", function () {
        blocked = false;
        updateMusicUI();
    });
    music.addEventListener("pause", updateMusicUI);

    window.addEventListener("load", playMusic);

    ["pointerdown", "keydown", "touchstart"].forEach(function (eventName) {
        window.addEventListener(eventName, function (event) {
            if (event.target.closest && event.target.closest("#music-toggle")) return;
            if (music.paused) playMusic();
        }, { once: true, passive: true });
    });

    updateMusicUI();
}
