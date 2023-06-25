const cells = document.querySelectorAll(".cell");
const restart = document.querySelector(".reset-button");
let currentPlayer = "X";
let gameStatus = true;
let board = [" ", " ", " ", " ", " ", " ", " ", " ", " "];

const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const handleCellClick = (e) => {
  const cell = e.target;
  const index = cell.getAttribute("id");

  if (board[index] === "" && gameStatus) {
    board[index] = currentPlayer;
    cell.textContent = currentPlayer;
    cell.classList.add(currentPlayer);
  }

  if (checkWin()) {
    alert(`${currentPlayer} wins!`);
    gameStatus = false;
    return;
  } else if (checkDraw()) {
    gameStatus = false;
    alert("Draw!");
    return;
  } else {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
  }
};

const checkWin = () => {
  return winningConditions.some((condition) => {
    return condition.every((index) => {
      return board[index] === currentPlayer;
    });
  });
};

const checkDraw = () => {
  return board.every((cell) => {
    return cell !== "";
  });
};

const handleRestart = () => {
  board = ["", "", "", "", "", "", "", "", ""];
  currentPlayer = "X";
  gameStatus = true;
  cells.forEach((cell) => {
    cell.textContent = "";
    cell.classList.remove("X");
    cell.classList.remove("O");
  });
};

cells.forEach((cell) => {
  cell.addEventListener("click", handleCellClick);
});

restart.addEventListener("click", handleRestart);
