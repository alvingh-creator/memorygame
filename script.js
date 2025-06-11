// script.js

// 1. Emoji/card values (each appears twice for matching)
const numbers = ['1', '2', '3', '4', '5', '6', '7', '8'];
let cardsArray = [...numbers, ...numbers]; // 8 pairs → 16 cards

// 2. Shuffle the cards
function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

// 3. Select the game board
const gameBoard = document.getElementById('gameBoard');

// 4. Game state variables
let flippedCards = [];
let matchedPairs = 0;

// 5. Create and display cards
function createBoard() {
  gameBoard.innerHTML = ''; // Clear board
  const shuffled = shuffle(cardsArray);

  shuffled.forEach((emoji) => {
    // Create elements
    const card = document.createElement('div');
    card.className = 'card w-20 h-24';
    card.setAttribute('data-name', emoji);

    const inner = document.createElement('div');
    inner.className = 'card-inner w-full h-full';

    const front = document.createElement('div');
    front.className = 'card-front';

    const back = document.createElement('div');
    back.className = 'card-back';
    back.textContent = emoji;

    // Build card structure
    inner.appendChild(front);
    inner.appendChild(back);
    card.appendChild(inner);
    gameBoard.appendChild(card);

    // Click handler
    card.addEventListener('click', () => flipCard(card));
  });
}

// 6. Handle flipping
function flipCard(card) {
  if (flippedCards.length >= 2 || card.classList.contains('matched') || card.classList.contains('flipped')) return;

  card.classList.add('flipped');
  flippedCards.push(card);

  if (flippedCards.length === 2) {
    checkForMatch();
  }
}

// 7. Match logic
function checkForMatch() {
  const [card1, card2] = flippedCards;
  const isMatch = card1.dataset.name === card2.dataset.name;

  if (isMatch) {
    card1.classList.add('matched');
    card2.classList.add('matched');
    matchedPairs++;

    if (matchedPairs === emojis.length) {
      setTimeout(() => alert('🎉 You Won!'), 300);
    }

    flippedCards = [];
  } else {
    setTimeout(() => {
      card1.classList.remove('flipped');
      card2.classList.remove('flipped');
      flippedCards = [];
    }, 800);
    
  }
}

// 8. Restart game
document.getElementById('restartBtn').addEventListener('click', () => {
  matchedPairs = 0;
  flippedCards = [];
  createBoard();
});

let moveCount = 0;
const moveCounter = document.createElement('p');
moveCounter.className = "mb-4 text-gray-700";
document.body.insertBefore(moveCounter, gameBoard);

function updateMoveCounter() {
  moveCounter.textContent = `Moves: ${moveCount}`;
}

// 9. Start the game
createBoard();
