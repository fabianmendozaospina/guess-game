'use strict';

/*
I wanted to do this way only to practice the toSorted() method:
a. Create an array of the quantity of GUESS_LIMMIT integer.
b. Shuffled the numbers in the array.
c. Get the number from the index GUESSES_COUNTER
(as the array is shuffled, always get a different number in each game)
*/

const GUESSES_LIMMIT = 10;
const GUESSES_COUNTER = 5;
const playObj = select('.play');
const guessesValueObj = select('.guesses-value');
const numberUserObj = select('.number-user');
const approachObj = select('.approach');
const numbers = [...Array(GUESSES_LIMMIT).keys()].map(n => n + 1);
const shuffledNumbers = getShuffledNumbers();
const numberToGuess = shuffledNumbers[GUESSES_COUNTER];
let counter = 0;

function listen(event, scope, callback) {
    return scope.addEventListener(event, callback);
}

function select(scope, parent = document) {
    return parent.querySelector(scope);
}

function getShuffledNumbers() {
    return numbers.toSorted(() => Math.random() - 0.5);
}

function play() {
    numberUserObj.disabled = false;
    numberUserObj.value = '';
    numberUserObj.focus();
    counter = GUESSES_COUNTER;
    guessesValueObj.innerText = `${counter}`;
    approachObj.innerText = '';
}

listen('input', numberUserObj, (event) => {
    numberUserObj.value = numberUserObj.value.replace(/[^0-9]/g, ''); 
})

listen('keydown', numberUserObj, (event) => {
    if (event.key !== 'Enter') {
        return;
    }

    const numberUser = parseInt(numberUserObj.value);
    
    if (numberToGuess === numberUser) {
        approachObj.innerText = "You guessed it!";
        numberUserObj.disabled = true;
        return;
    }

    counter--;    
    guessesValueObj.innerText = `${counter}`;    

    if (numberToGuess < numberUser) approachObj.innerText = "My number is smaller";
    
    if (numberToGuess > numberUser) approachObj.innerText = "My number is bigger";
    
    if (counter === 0) {
        approachObj.innerText = "Game Over!";
        numberUserObj.disabled = true;
    }
});

listen('click', playObj, () => play());

play();
