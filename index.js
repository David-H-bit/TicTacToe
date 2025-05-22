// 1. Create gameboard module, 2. Create player factory function, 3. Build game controller module, 4.
// 5.

const Gameboard = (function () {
  const board = ["", "", "", "", "", "", "", "", ""];
  function getBoard() {
    return board;
  }
  function setMark(index, mark) {
    board[index] = mark;
  }
  function reset() {
    for (let i = 0; i < board.length; i++) {
      board[i] = "";
    }
  }
  return { getBoard, setMark, reset };
})();

function Player(name, mark){
  return {
    getName(){
      return name;
    },
    getMark(){
      return mark;
    }
  }
}

const DisplayController = (function() {
  function renderBoard() {
  const board = Gameboard.getBoard();
  const buttons = document.querySelectorAll("#board button");
  const messageDiv = document.getElementById("message");

  buttons.forEach((button, index) => {
    button.textContent = board[index];

    button.onclick = () => {
      if (Gameboard.getBoard()[index] !== "" || GameController.isGameOver()) return;

      const result = GameController.playTurn(index);
      renderBoard();

      if (result === "tie") {
        messageDiv.textContent = "It's a tie!";
      } else if (result) {
        messageDiv.textContent = `${result} has won!`;
      }
    };
  });
}


  return { renderBoard };
})();

const GameController = (function () {
  const player1 = Player("Player 1", "X");
  const player2 = Player("Player 2", "O");
  let currentPlayer = player1;
  let gameOver = false;

  function switchPlayer() {
    currentPlayer = currentPlayer === player1 ? player2 : player1;
  }

  function getCurrentPlayer() {
    return currentPlayer;
  }

  function getPlayers() {
    return { player1, player2 };
  }

  function isGameOver() {
    return gameOver;
  }

  function setGameOver(value) {
    gameOver = value;
  }

  function playTurn(index) {
    Gameboard.setMark(index, currentPlayer.getMark());
    const result = checkWinner();
    if (result) {
      gameOver = true;
    } else {
      switchPlayer();
    }
    return result;
  }

  function checkWinner() {
    const board = Gameboard.getBoard();
    const winPatterns = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6]
    ];

    for (const pattern of winPatterns) {
      const [a, b, c] = pattern;
      if (
        board[a] &&
        board[a] === board[b] &&
        board[a] === board[c]
      ) {
        return currentPlayer.getName();
      }
    }

    if (board.every(cell => cell !== "")) {
      return "tie";
    }

    return null;
  }
    function resetGame() {
      Gameboard.reset();
      currentPlayer = player1;
      gameOver = false;
      };

    document.getElementById("restart").addEventListener("click", () => {
      GameController.resetGame();
      document.getElementById("message").textContent = "";
      DisplayController.renderBoard();
    });



  return {
    playTurn,
    getCurrentPlayer,
    getPlayers,
    isGameOver,
    setGameOver,
    checkWinner,
    resetGame
  };
})();


DisplayController.renderBoard();






