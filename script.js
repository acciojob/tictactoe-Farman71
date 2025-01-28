//your JS code here. If required.
let currentPlayer;
let player1, player2;
let gameActive = true;

document.getElementById("submit").addEventListener("click", function () {
  player1 = document.getElementById("player1").value;
  player2 = document.getElementById("player2").value;

  if (player1 && player2) {
    document.getElementById("formContainer").classList.add("hidden");
    document.getElementById("gameBoard").style.display = "grid";
    document.querySelector(".message").textContent = `${player1}, you're up!`;
    currentPlayer = player1;
    createBoard();
  } else {
    alert("Please enter both player names.");
  }
});

function createBoard() {
  const gameBoard = document.getElementById("gameBoard");
  gameBoard.innerHTML = "";
  const cells = Array(9).fill(null);
  gameActive = true;

  for (let i = 0; i < 9; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.dataset.index = i;

    cell.addEventListener("click", function () {
      if (!cell.textContent && gameActive) {
        cell.textContent = currentPlayer === player1 ? "X" : "O";
        cells[i] = currentPlayer;

        if (checkWinner(cells, currentPlayer)) {
          gameActive = false;
          highlightWinningCells(cells, currentPlayer);
          setTimeout(() => {
            askToPlayAgain(`${currentPlayer}, congratulations you won!`);
          }, 500);
        } else if (cells.every((cell) => cell !== null)) {
          gameActive = false;
          setTimeout(() => {
            askToPlayAgain("Game Draw!");
          }, 500);
        } else {
          currentPlayer = currentPlayer === player1 ? player2 : player1;
          document.querySelector(".message").textContent = `${currentPlayer}, you're up!`;
        }
      }
    });

    gameBoard.appendChild(cell);
  }
}

function checkWinner(cells, player) {
  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  return winningCombinations.some((combination) => {
    if (combination.every((index) => cells[index] === player)) {
      combination.forEach((index) => {
        document
          .querySelector(`[data-index="${index}"]`)
          .classList.add("highlight");
      });
      return true;
    }
    return false;
  });
}

function highlightWinningCells(cells, player) {
  document.querySelector(".message").textContent = `${player}, you won!`;
}

function askToPlayAgain(message) {
  const playAgain = confirm(`${message}\nDo you want to play again?`);
  if (playAgain) {
    createBoard();
    document.querySelector(".message").textContent = `${player1}, you're up!`;
    currentPlayer = player1;
  } else {
    location.reload();
  }
}