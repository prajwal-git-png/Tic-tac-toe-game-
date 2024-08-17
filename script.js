const cells = document.querySelectorAll('.cell');
const restartButton = document.getElementById('restart');
const playerXScoreDisplay = document.getElementById('playerXScore');
const playerOScoreDisplay = document.getElementById('playerOScore');
let currentPlayer = 'X';
let board = ['', '', '', '', '', '', '', '', ''];
let isGameActive = true;
let playerXScore = 0;
let playerOScore = 0;

const PLAYER_X_WON = 'PLAYER_X_WON';
const PLAYER_O_WON = 'PLAYER_O_WON';
const TIE = 'TIE';

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function handleResultValidation() {
    let roundWon = false;
    for (let i = 0; i < 8; i++) {
        const winCondition = winningConditions[i];
        let a = board[winCondition[0]];
        let b = board[winCondition[1]];
        let c = board[winCondition[2]];
        if (a === '' || b === '' || c === '') {
            continue;
        }
        if (a === b && b === c) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        announce(currentPlayer === 'X' ? PLAYER_X_WON : PLAYER_O_WON);
        isGameActive = false;
        return;
    }

    if (!board.includes(''))
        announce(TIE);
}

const announce = (type) => {
    switch(type){
        case PLAYER_O_WON:
            alert('Player O Won');
            playerOScore++;
            playerOScoreDisplay.textContent = playerOScore;
            break;
        case PLAYER_X_WON:
            alert('Player X Won');
            playerXScore++;
            playerXScoreDisplay.textContent = playerXScore;
            break;
        case TIE:
            alert('Tie');
    }
};

const isValidAction = (cell) => {
    if (cell.innerText === 'X' || cell.innerText === 'O'){
        return false;
    }

    return true;
};

const updateBoard =  (index) => {
    board[index] = currentPlayer;
}

const changePlayer = () => {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

const userAction = (cell, index) => {
    if(isValidAction(cell) && isGameActive) {
        cell.innerText = currentPlayer;
        cell.classList.add(`player${currentPlayer}`);
        updateBoard(index);
        handleResultValidation();
        changePlayer();
    }
}

cells.forEach( (cell, index) => {
    cell.addEventListener('click', () => userAction(cell, index));
});

const restartBoard = () => {
    board = ['', '', '', '', '', '', '', '', ''];
    isGameActive = true;
    cells.forEach(cell => {
        cell.innerText = '';
        cell.classList.remove('playerX');
        cell.classList.remove('playerO');
    });
    currentPlayer = 'X';
};

restartButton.addEventListener('click', restartBoard);
