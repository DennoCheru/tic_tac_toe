const Gameboard = (function() {
    board = Array(9).fill("");

    const getBoard = () => [...board];

    const getCell = (index) => {
        index >= 0 && index < board.length ? board[index] : false;         
    }

    const setMove = (mark, index) => {
        if (index >=0 && index < board.length && ["x", "o"].includes(mark)) {
            if (board[index] === "") {
                board[index] = mark;
                return true;
            }
        }
        return false;
    }

    const resetBoard = () => {
        for (let i = 0; i < board.length; i++) {
            board[i] = "";
        }
    }

    const isFull = () => {
        return board.every(cell => cell != "");
    }

    return {
        getBoard,
        getCell,
        setMove,
        resetBoard,
        isFull,
    }

})();

const Player = function (name, mark) {
    return {
        name,
        mark,
    }
}

const Game = (function () {
    let playerOne, playerTwo, currentPlayer, gameOver;
    const winPatterns = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ]

    const startGame = function() {
        Gameboard.resetBoard();
        gameOver = false;
        
        playerOne = new Player("Player One", "x");
        playerTwo = new Player("Player Two", "o");
        currentPlayer = playerOne;
    }

    const playRound = function(index) {
        if (gameOver || Gameboard.setMove(currentPlayer.mark, index) === false) {
            return;
        }
        
        
        const board = Gameboard.getBoard();
        if (checkWinner(board)) {
            gameOver = true;
            console.log(`${currentPlayer.name} wins!`)
            return true;
        }
        
        if (Gameboard.isFull()) {
            gameOver = true;
            console.log(`It's a tie!`)
            return true;
        }

        switchPlayer();
        return true;
    }

    const checkWinner = function(board) {
        return winPatterns.some(pattern => {
            const [a, b, c] = pattern;
            return board[a] != "" && board[a] === board[b] && board[a] === board[c];
        });
    }

    const switchPlayer = function () {
        currentPlayer = currentPlayer === playerOne ? playerTwo : playerOne;
    }

    return {
        startGame,
        playRound,
    }
})();