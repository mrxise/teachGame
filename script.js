'use strict';
const roll = document.querySelector(".btn--roll")
const hold = document.querySelector(".btn--hold")
const newG = document.querySelector(".btn--new")
const dice = document.querySelector(".dice")
const currentScore = document.getElementById("current--0")
const currentScore2 = document.getElementById("current--1")
const score = document.getElementById("score--0")
const score2 = document.getElementById("score--1")
const player = document.querySelector(".player--0")
const player2 = document.querySelector(".player--1")

const players = [player, player2]
const buttons = [roll, hold, dice]
////// START
let cur = 0
let currentPlayer = true
score.textContent = 0
score2.textContent = 0
dice.classList.add("hidden")

/////FIRST
roll.addEventListener("click", function () {
    let ran = Number(Math.trunc(Math.random() * 6) + 1)
    dice.src = `dice-${ran}.png`;
    dice.classList.remove("hidden")

    if (currentPlayer) {
        if (ran !== 1) { cur += ran }
        else {
            player.classList.remove("player--active")
            player2.classList.add("player--active")
            cur = 0
            currentPlayer = false
        }
        currentScore.textContent = cur
    }

    else {
        player.classList.remove("player-active")
        if (ran !== 1) { cur += ran }
        else {
            cur = 0
            currentPlayer = true;

            player2.classList.remove("player--active")
            player.classList.add("player--active")
        }
        currentScore2.textContent = cur
    }

})
hold.addEventListener("click", function () {
    // cur = 0
    let sce = 0
    let sce2 = 0
    if (currentPlayer) {
        if (currentScore.textContent > 0) {
            sce = Number(currentScore.textContent) + Number(score.textContent)
            score.textContent = sce
            winner(currentPlayer, sce)
            currentPlayer = false;
            player.classList.remove("player--active")
            player2.classList.add("player--active")
        }
    }
    else {
        sce2 = Number(currentScore2.textContent) + Number(score2.textContent)
        score2.textContent = sce2
        winner(currentPlayer, sce2)
        currentPlayer = true;
        player2.classList.remove("player--active")
        player.classList.add("player--active")
    }
    cur = 0;
    currentScore.textContent = 0
    currentScore2.textContent = 0
})


function winner(currentPlayer, score) {
    if (currentPlayer) {
        if (score >= 100) {
            player.classList.add("player--winner")
            setTimeout(resetG, 5000)
            for (let i = 0; i < buttons.length; i++) {
                buttons[i].classList.add("hidden")
            }
        }
    }
    else {
        if (score >= 100) {
            player2.classList.add("player--winner")
            setTimeout(resetG, 5000)
            for (let i = 0; i < buttons.length; i++) {
                buttons[i].classList.add("hidden")
            }
        }
    }

}

function resetG() {
    player2.classList.remove("player--active")
    player.classList.add("player--active")
    player.classList.remove("player--winner")
    player2.classList.remove("player--winner")
    cur = 0
    currentPlayer = true
    score.textContent = 0
    score2.textContent = 0
    dice.classList.add("hidden")
    currentScore.textContent = 0
    currentScore2.textContent = 0
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].classList.remove("hidden")
    }
}
newG.addEventListener("click", resetG)