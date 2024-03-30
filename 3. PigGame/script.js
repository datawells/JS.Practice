'use strict';

// Selecting elements
const player0E = document.getElementById('section--0');
const player1E = document.getElementById('section--1');
const score0E = document.getElementById('score--0');
const score1E = document.getElementById('score--1');
const currentScore0E = document.getElementById('current--0');
const currentScore1E = document.getElementById('current--1');
const diceE = document.getElementById('dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

let scores, playing, currentScore, activePlayer

const initialize = function () {
    diceE.classList.add('hidden');
    scores = [0, 0];
    playing = true;
    currentScore = 0;
    activePlayer = 0;
    score0E.textContent = 0;
    score1E.textContent = 0;
    currentScore0E.textContent = 0;
    currentScore1E.textContent = 0;
    player0E.classList.add('player--active');
    player1E.classList.remove('player--active');
    document.getElementById(`section--0`).classList.remove('player--winner')
    document.getElementById(`section--1`).classList.remove('player--winner')
}
const switchPlayer = function () {
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    player0E.classList.toggle('player--active')
    player1E.classList.toggle('player--active')
    currentScore = 0;
}

initialize();
// Dice Rolling
btnRoll.addEventListener('click', function () {
    if (playing) {
        // 1. Generate random dice roll
        const dice = Math.trunc(Math.random() * 6) + 1;
        // 2. Display Dice
        diceE.classList.remove('hidden');
        diceE.src = `dice-${dice}.png`;

        // 3. Check if rolled 1: if true switch to next player
        if (dice !== 1) {
            currentScore += dice;
            document.getElementById(`current--${activePlayer}`).textContent = currentScore;
        } else {
            switchPlayer()
        }
    }
})

btnHold.addEventListener('click', function () {
    if (playing) {
        // 1. Add current score to Active Players
        scores[activePlayer] += currentScore;
        document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];
        if (scores[activePlayer] >= 100) {
            // 2. If >= 100 
            document.getElementById(`section--${activePlayer}`).classList.add('player--winner')
            document.getElementById(`section--${activePlayer}`).classList.remove('player--active')
            playing = false;
            // Finish
        } else if (currentScore !== 0) {
            switchPlayer();
            // Switch
        }
    }
})

btnNew.addEventListener('click', function () {
    initialize()

})