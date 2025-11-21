Gameboard = (function() {
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

Game = (function () {
    let playerOne, playerTwo, currentPlayer, gameOver, winner = null;
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
        const playerOneName = document.querySelector('#player-one-name').value || "Player One";
        const playerTwoName = document.querySelector('#player-two-name').value || "Player Two";
        
        gameOver = false;
        winner = null;

        Gameboard.resetBoard();
        
        playerOne = new Player(playerOneName, "x");
        playerTwo = new Player(playerTwoName, "o");
        currentPlayer = playerOne;
    }

    const playRound = function(index) {

        if (gameOver || Gameboard.setMove(currentPlayer.mark, index) === false) {
            return;
        }
        
        
        const board = Gameboard.getBoard();
        if (checkWinner(board)) {
            gameOver = true;
            winner = currentPlayer;
            return {valid: true, winner: currentPlayer, tie: false};
        }
        
        if (Gameboard.isFull()) {
            gameOver = true;
            return {valid: true, winner: null, tie:true};
        }

        switchPlayer();
        return {
            valid: true,
            winner: winner,
            tie: Gameboard.isFull() && !winner,
        }
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
    
    const getCurrentPlayer = () => currentPlayer;
    const isGameOver = () => gameOver;
    const getWinner = () => winner;
    return {
        startGame,
        playRound,
        getCurrentPlayer,
        isGameOver,
        getWinner,
    }
})();

DisplayController = (function() {
    const cells = document.querySelectorAll('.cell');
    const status = document.querySelector('.status');
    const dialog = document.querySelector('.winning-message');
    const winningText = document.querySelector('.winning-message-text');
    const restartBtn = document.querySelector('#restartBtn');
    const startBtn = document.querySelector('#start-button')
    const gameBoard = document.querySelector('#board')

    const renderBoard = function() {
        const board = Gameboard.getBoard();

        cells.forEach((cell, index) => {
            cell.textContent = board[index];
            if(board[index] === "x") {
                cell.classList.add('player-x');
            } else if (board[index] === "o") {
                cell.classList.add('player-o')
            } else {
                cell.classList.remove('player-x');
                cell.classList.remove('player-o')
            }
        })

        gameBoard.classList.remove('x');
        gameBoard.classList.remove('o');
        if (Game.getCurrentPlayer().mark === 'x') {
            gameBoard.classList.add('x');
        } else {
            gameBoard.classList.add('o');
        }
    }

    const clickCell = function() {
        cells.forEach((cell, index) => {
            cell.addEventListener("click", () => {
                Game.playRound(index);
                renderBoard();
                updateStatus();
            });
        });
    }

    const updateStatus = function() {
        if (Game.isGameOver()) {
            if(Game.getWinner()) {
                dialog.showModal();
                winningText.textContent = `${Game.getWinner().name} wins!`;
            } else if (Gameboard.isFull()) {
                dialog.showModal();
                winningText.textContent = `It's a tie!`;
            } 
        } else {
            status.textContent = `${Game.getCurrentPlayer().name}'s turn`;
        }
    }
    
    startBtn.addEventListener("click", () => {
        Game.startGame();
        updateStatus();
        renderBoard();
    })

    restartBtn.addEventListener("click", () => {
        dialog.close();
        Game.startGame();
        updateStatus();
        renderBoard();
    });

    return {
        renderBoard,
        clickCell,
        updateStatus,
    }
})();

Game.startGame();
DisplayController.renderBoard();
DisplayController.updateStatus();
DisplayController.clickCell();