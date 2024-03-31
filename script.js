const GAME_BOARD = document.getElementById("gameBoard");
const SCORE = document.getElementById("score");
const TIMER = document.getElementById("timer");
const MESSAGE = document.getElementById("message");

const STARTMUSIC = document.getElementById("SS")
const OFFMUSIC = document.getElementById("OS")

// URL 에서 난이도 정보 빼오기
const urlParams = new URLSearchParams(window.location.search);
const difficulty = urlParams.get('difficulty');

// 음악 파일 로딩
const BACKGROUND_MUSIC = new Audio("./resources/background.flac");
const DIE_MUSIC = new Audio("./resources/sound.flac");


let moleLocation = -1;
let score = 0;
let timeLeft = 60;
let timerId;


function createBoard() {
    for (let i = 0; i < 9; i++) {
        const hole = document.createElement("div");
        hole.classList.add("hole");
        GAME_BOARD.appendChild(hole);
    }
}


function randomMole() {
    const holes = document.querySelectorAll(".hole");

    if (moleLocation !== -1) {
        holes[moleLocation].classList.remove("mole");
    }

    const newmoleLocation = Math.floor(Math.random() * 9);
    holes[newmoleLocation].classList.add("mole");
    moleLocation = newmoleLocation
}


function checkClick(event) {
    // 유저가 마우스 클릭을 했는데, 두더지를 눌렀다면
    if (event.target.classList.contains('mole')) {
        // 스코어 +1 증가
        score = score + 1
        SCORE.innerText = `score: ${score}`
        // 두더지를 없앤다
        event.target.classList.remove("mole")
        DIE_MUSIC.currentTime = 0;
        DIE_MUSIC.play()
    }
}

function setDifficulty() {
    if (difficulty === "easy") {
        setInterval(randomMole, 1500);
    } else if (difficulty === "normal") {
        setInterval(randomMole, 1000)
    }
    else {
        setInterval(randomMole, 500)
    }
}

function offmusic() {
    BACKGROUND_MUSIC.pause()
}

function startmusic() {
    BACKGROUND_MUSIC.play()
}

function decreaseTime() {
    if (timeLeft === 0) {
        endGame()
    }
    timeLeft = timeLeft - 1;
    TIMER.innerText = `Time: 00:${timeLeft}`
}

function startTimer() {
    timerId = setInterval(decreaseTime, 1000)
}

function endGame() {
    clearInterval(timerId);
    alert(`Your time is up! Your score is ${score}`)
}

// function ready(){
//     alert("ready");
//     alert("set");
//     alert("go"); 
// }


function startGame() {
    MESSAGE.innerText = "Ready";
    setTimeout(() => {
        MESSAGE.innerText = "Set";
        setTimeout(() => {
            MESSAGE.innerText = "Go!";
            createBoard();
            randomMole();
            startTimer();
        }, 1000);
    }, 1000);
}

startGame()
setDifficulty();

GAME_BOARD.addEventListener("click", checkClick);