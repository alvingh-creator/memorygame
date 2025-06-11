
const emojis = ['🍕', '🍔', '🍟', '🌮', '🍣', '🍩', '🍎', '🍉'];
let cardsArray = [...emojis, ...emojis]; // 8 
function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}


const gameBoard = document.getElementById('gameBoard');


let flippedCards = [];
let matchedPairs = 0;


function createBoard() {
  gameBoard.innerHTML = ''; // Clear board
  const shuffled = shuffle(cardsArray);

  shuffled.forEach((emoji) => {
   
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

    
    inner.appendChild(front);
    inner.appendChild(back);
    card.appendChild(inner);
    gameBoard.appendChild(card);

    card.addEventListener('click', () => flipCard(card));
  });
}


function flipCard(card) {
  if (flippedCards.length >= 2 || card.classList.contains('matched') || card.classList.contains('flipped')) return;

  card.classList.add('flipped');
  flippedCards.push(card);

  if (flippedCards.length === 2) {
    checkForMatch();
  }
}


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


document.getElementById('restartBtn').addEventListener('click', () => {
  matchedPairs = 0;
  flippedCards = [];
  createBoard();
});


createBoard();
