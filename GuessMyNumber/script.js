'use strict';

const chckBtn = document.querySelector('.check')
const againBtn = document.querySelector('.again')
const messageTxt = document.querySelector('.message')
const highScoreTxt = document.querySelector('.highscore')
const scoreTxt = document.querySelector('.score')
const numberTxt = document.querySelector('.number')
let score = 20;
let highScore = 0;
let secretNumber = Math.trunc(Math.random() * 20) + 1;
console.log(secretNumber);


function updateScore(message, success) {
    if (score == 0) {
        messageTxt.textContent = "You lost!"
        chckBtn.disabled = true;
        numberTxt.textContent = secretNumber;
        return
    }

    messageTxt.textContent = message;
    if (success && highScore < score) {
        console.log(highScore);
        numberTxt.textContent = secretNumber;
        document.querySelector('body').style.backgroundColor = '#60b347';
        document.querySelector('.number').style.width = '30rem';
        highScore = score;
        highScoreTxt.textContent = highScore;
        chckBtn.disabled = true;
    }
    else {
        score--;
        scoreTxt.textContent = score;
    }
}

function getValueHandler() {
    const guessValue = Number(document.querySelector('.guess').value);
    console.log(`Guess: ${guessValue}`)
    if (!guessValue) {
        messageTxt.textContent = 'No Number!';
    }
    else if (guessValue == secretNumber) {
        updateScore('Correct Number!', true);
    }
    else if (guessValue > secretNumber) { updateScore('Too High!', false) }
    else if (guessValue < secretNumber) { updateScore('Too Low!', false) }
};

function resetGameHandler() {
    messageTxt.textContent = "Start guessing...";
    scoreTxt.textContent = score = 20;
    document.querySelector('body').style.backgroundColor = "#222";
    document.querySelector('.number').style.width = '15rem'
    numberTxt.textContent = '?';
    document.querySelector('.guess').value = '';
    secretNumber = Math.trunc(Math.random() * 20) + 1;
    chckBtn.disabled = false;
}

chckBtn.addEventListener('click', getValueHandler)
againBtn.addEventListener('click', resetGameHandler)