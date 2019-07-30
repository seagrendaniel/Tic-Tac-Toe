/*----- constants -----*/

const boardDisplay = {
    '-1': { 'Dog': 'https://upload.wikimedia.org/wikipedia/en/f/fd/Droopy_dog.png' },
    '0': { 'Food Bowl': `https://previews.123rf.com/images/tribalium123/tribalium1231505/tribalium123150500096/40035791-bowl-for-animals-pet-food-bowl.jpg` },
    '1': { 'Cat': 'https://cdn.friendlystock.com/wp-content/uploads/2018/05/4-cute-cat-cartoon-clipart.jpg' },
};

/*----- app's state (variables) -----*/
let board, turn, winner;
let numMoves = 0;


/*----- cached element references -----*/
const msgElement = document.getElementById("msg");




/*----- event listeners -----*/
document.querySelector('section.board').addEventListener('click', handleClick);
document.getElementById('reset-button').addEventListener('click', resetGame);


/*----- functions -----*/


init();

function init() {
    board = [[0, 0, 0],   // row index 0
             [0, 0, 0],   // row index 1
             [0, 0, 0]];  // row index 2
    turn = 1;
    numMoves = 0;
    winner = null;      // 1, -1, null (no winner), 'T' (tie)
    render();

}


function render() {
    board.forEach(function (rowArr, rowIdx) {
        board[rowIdx].forEach(function (cell, colIdx) {
            let div = document.getElementById(`sq${rowIdx}${colIdx}`);
            // div.style.backgroundImage = 'url('https://upload.wikimedia.org/wikipedia/en/f/fd/Droopy_dog.png')'
            div.style.backgroundImage = `url(${Object.values(boardDisplay[cell])})`;
            // div.innerHTML = boardDisplay[cell];
            div.style.backgroundSize = '156px 156px';
        });
    });

    if (winner === 'T') {
        msgElement.innerHTML = `It's a tie!`;
    }
    else if (winner === 1) {
        msgElement.innerHTML = `${Object.keys(boardDisplay[turn])} Wins`;
    }
    else if (winner === -1) {
        msgElement.innerHTML = `${Object.keys(boardDisplay[turn])} Wins`;
    }
    else {
        msgElement.innerHTML = `${Object.keys(boardDisplay[turn])}'s Turn`;
    }


}

function handleClick(evt) {
    const boardIdx = evt.target.id.replace('sq', '');
    const rowIdx = parseInt(boardIdx[0]);
    const colIdx = parseInt(boardIdx[1]);

    // console.log(boardIdx, rowIdx, colIdx);

    if (isNaN(boardIdx) || winner) return;
    else if (board[rowIdx][colIdx] !== 0) return;
    else board[rowIdx][colIdx] = turn;


    numMoves += 1;
    getWinner();
    if (numMoves === 9) {
        winner = 'T';
    }
    // console.log(numMoves);
    render();
    turn *= -1;
    console.log(winner);
}

function resetGame() {
    init();
}

function getAbsSum(myArray) {
    let sumArray = 0;
    sumArray = Math.abs(myArray.reduce((acc, myArrayCurrent) => acc + myArrayCurrent));
    return sumArray
}

function regularSum(myArray) {
    let sumArray = 0;
    sumArray = myArray.reduce((acc, myArrayCurrent) => acc + myArrayCurrent);
    return sumArray
}

function getWinner() {
    // check row winner
    for (let i = 0; i < board.length; i++) {
        if (Math.abs(regularSum(board[i])) === 3) {
            winner = turn;
            return;
        }
    }
    // check col winner
    for (let i = 0; i < board.length; i++) {
        const sum = board[0][i] + board[1][i] + board[2][i];
        if (Math.abs(sum) === 3) {
            winner = turn;
            return;
        }
    }

    // top to bottom diagonal
    let sum = board[0][0] + board[1][1] + board[2][2];
    if (Math.abs(sum) === 3) {
        winner = turn;
        return;
    }

    // bottom to top diagonal. 
    let oppSum = board[0][2] + board[1][1] + board[2][0];
    if (Math.abs(oppSum) === 3) {
        winner = turn;
        return;
    }

}