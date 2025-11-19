const Gameboard = (function() {
    board = Array(9).fill("");

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
        setMove,
        resetBoard,
    }

})();

const Player = function (name, mark) {
    return {
        name,
        mark,
    }
}

const Game = (function () {

})();