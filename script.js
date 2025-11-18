const Gameboard = (function() {
    board = Array(9).fill("");

    const getBoard = () => [...board];

    const setMove = (mark, index) => {
        if (board[index] != "") {
            board[index] = mark;
            return true;
        }
        return false;
    }
    const resetBoard = () => {
        for (let i = 0; i < board.length; i++) {
            board[i] = "";
        }
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