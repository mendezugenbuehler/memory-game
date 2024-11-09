// *-------------------------------- Constants --------------------------------*
const cardImages = [
    'images/bubble.png', 'images/bubble.png',
    'images/drill.png', 'images/drill.png',
    'images/elephant.png', 'images/elephant.png',
    'images/fire.png', 'images/fire.png',
    'images/mushroom.png', 'images/mushroom.png',
    'images/star.png', 'images/star.png',
];

const cardAltText = {
    'images/bubble.png': 'Front of card showing a bubble flower',
    'images/drill.png': 'Front of card showing a drill',
    'images/elephant.png': 'Front of card showing an elephant',
    'images/fire.png': 'Front of card showing fire flower',
    'images/mushroom.png': 'Front of card showing a mushroom',
    'images/star.png': 'Front of card showing a star',
};

const sound = new Audio('super-mario-coin-sound.mp3');

// *---------------------------- Variables (state) ----------------------------*
let firstCard = null;
let secondCard = null;
let matchedPairs = 0;

// *------------------------ Cached Element References ------------------------*
const gameBoard = document.getElementById('game-board');
const resetButton = document.getElementById('reset-button');
const scoreDisplay = document.getElementById('score');

// *-------------------------------- Functions --------------------------------*/
function init() {
    matchedPairs = 0;
    firstCard = null;
    secondCard = null;
    scoreDisplay.textContent = `Coins: ${matchedPairs}`;

    shuffle(cardImages);

    gameBoard.innerHTML = '';
    cardImages.forEach((image, index) => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.image = image;
        card.dataset.index = index;

     
        const backImage = document.createElement('img');
        backImage.src = 'images/card-back.png';
        backImage.alt = 'Back of card showing a question mark box'; 
        backImage.classList.add('card-back');

        const frontImage = document.createElement('img');
        frontImage.src = image;
        frontImage.alt = cardAltText[image]; 
        frontImage.classList.add('card-front');
        frontImage.style.display = 'none'; 

        card.appendChild(backImage);
        card.appendChild(frontImage);
        card.addEventListener('click', handleCardClick);
        gameBoard.appendChild(card);
    });
}

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function handleCardClick(event) {
    const card = event.currentTarget;
    if (card === firstCard || card.classList.contains('matched') || secondCard) return;

    const backImage = card.querySelector('.card-back');
    const frontImage = card.querySelector('.card-front');
    backImage.style.display = 'none';
    frontImage.style.display = 'block';

    if (!firstCard) {
        firstCard = card;
    } else {
        secondCard = card;
        checkForMatch();
    }
}

function checkForMatch() {
    if (firstCard.dataset.image === secondCard.dataset.image) {
        firstCard.classList.add('matched');
        secondCard.classList.add('matched');
        matchedPairs++;
        scoreDisplay.textContent = `Score: ${matchedPairs}`;
        sound.play(); 
        resetSelections();
    } else {
        setTimeout(() => {
            const firstBack = firstCard.querySelector('.card-back');
            const firstFront = firstCard.querySelector('.card-front');
            const secondBack = secondCard.querySelector('.card-back');
            const secondFront = secondCard.querySelector('.card-front');

            firstBack.style.display = 'block';
            firstFront.style.display = 'none';
            secondBack.style.display = 'block';
            secondFront.style.display = 'none';
            
            resetSelections();
        }, 1000);
    }
    checkWinCondition();
}

function resetSelections() {
    firstCard = null;
    secondCard = null;
}

function checkWinCondition() {
    if (matchedPairs === cardImages.length / 2) {
        setTimeout(() => alert("Wahoo! You've matched all of the blocks!"), 500);
    }
}

function resetGame() {
    init();
}

// *----------------------------- Event Listeners -----------------------------*
resetButton.addEventListener('click', resetGame);

init();
