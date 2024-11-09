// *-------------------------------- Constants --------------------------------*
const cardImages = [
    'images/bubble.png', 'images/bubble.png',
    'images/drill.png', 'images/drill.png',
    'images/elephant.png', 'images/elephant.png',
    'images/fire.png', 'images/fire.png',
    'images/mushroom.png', 'images/mushroom.png',
    'images/star.png', 'images/star.png',
];

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
    scoreDisplay.textContent = `Score: ${matchedPairs}`;
    
    shuffle(cardImages);
    
    gameBoard.innerHTML = '';
    cardImages.forEach((image, index) => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.image = image;
        card.dataset.index = index;
        card.style.backgroundImage = "url('images/card-back.png')"; 
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
    const card = event.target;
    if (card === firstCard || card.classList.contains('matched') || secondCard) return;

    card.style.backgroundImage = `url('${card.dataset.image}')`;

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
        resetSelections();
    } else {
        setTimeout(() => {
            firstCard.style.backgroundImage = "url('images/card-back.png')";
            secondCard.style.backgroundImage = "url('images/card-back.png')";
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
        setTimeout(() => alert("Wahoo! You've matched all blocks!"), 500);
    }
}

function resetGame() {
    init();
}

// *----------------------------- Event Listeners -----------------------------*
resetButton.addEventListener('click', resetGame);

init();
