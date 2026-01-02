const submitBtn = document.getElementById("submit");
const board = document.getElementById("board");
const message = document.querySelector(".message");
const cells = document.querySelectorAll(".cell");

let player1 = "";
let player2 = "";
let currentPlayer = "";
let currentSymbol = "x";
let gameActive = true;

const winPatterns = [
  [1,2,3],[4,5,6],[7,8,9],
  [1,4,7],[2,5,8],[3,6,9],
  [1,5,9],[3,5,7]
];

submitBtn.addEventListener("click", () => {
  player1 = document.getElementById("player1").value.trim();
  player2 = document.getElementById("player2").value.trim();

  if (!player1 || !player2) return;

  document.getElementById("form").style.display = "none";
  board.style.display = "grid";

  currentPlayer = player1;
  currentSymbol = "x";
  message.innerText = `${currentPlayer}, you're up`;
});

cells.forEach(cell => {
  cell.addEventListener("click", () => {
    if (!gameActive || cell.innerText !== "") return;

    cell.innerText = currentSymbol;

    if (checkWin()) {
      message.innerText = `${currentPlayer} congratulations you won!`;
      gameActive = false;
      return;
    }

    switchPlayer();
    message.innerText = `${currentPlayer}, you're up`;
  });
});

function switchPlayer() {
  if (currentSymbol === "x") {
    currentSymbol = "o";
    currentPlayer = player2;
  } else {
    currentSymbol = "x";
    currentPlayer = player1;
  }
}

function checkWin() {
  return winPatterns.some(pattern => {
    const [a,b,c] = pattern;
    const A = document.getElementById(a).innerText;
    const B = document.getElementById(b).innerText;
    const C = document.getElementById(c).innerText;

    if (A && A === B && A === C) {
      document.getElementById(a).classList.add("winner");
      document.getElementById(b).classList.add("winner");
      document.getElementById(c).classList.add("winner");
      return true;
    }
    return false;
  });
}
