//your JS code here. If required.
 const submitBtn = document.getElementById("submit");
    const board = document.getElementById("board");
    const message = document.querySelector(".message");
    const cells = document.querySelectorAll(".cell");

    let player1 = "";
    let player2 = "";
    let currentPlayer = "";
    let currentSymbol = "X";
    let gameActive = true;

    const winPatterns = [
        [1,2,3], [4,5,6], [7,8,9],
        [1,4,7], [2,5,8], [3,6,9],
        [1,5,9], [3,5,7]
    ];

    submitBtn.addEventListener("click", () => {
        player1 = document.getElementById("player-1").value.trim();
        player2 = document.getElementById("player-2").value.trim();

        if (!player1 || !player2) {
            alert("Please enter both player names");
            return;
        }

        document.getElementById("form").style.display = "none";
        board.style.display = "grid";

        currentPlayer = player1;
        currentSymbol = "X";
        message.innerText = `${currentPlayer}, you're up`;
    });

    cells.forEach(cell => {
        cell.addEventListener("click", () => {
            if (!gameActive || cell.innerText !== "") return;

            cell.innerText = currentSymbol;

            if (checkWin()) {
                message.innerText = `${currentPlayer}, congratulations you won!`;
                gameActive = false;
                return;
            }

            switchPlayer();
            message.innerText = `${currentPlayer}, you're up`;
        });
    });

    function switchPlayer() {
        if (currentSymbol === "X") {
            currentSymbol = "O";
            currentPlayer = player2;
        } else {
            currentSymbol = "X";
            currentPlayer = player1;
        }
    }

    function checkWin() {
        return winPatterns.some(pattern => {
            const [a, b, c] = pattern;
            const cellA = document.getElementById(a).innerText;
            const cellB = document.getElementById(b).innerText;
            const cellC = document.getElementById(c).innerText;

            if (
                cellA &&
                cellA === cellB &&
                cellA === cellC
            ) {
                document.getElementById(a).classList.add("winner");
                document.getElementById(b).classList.add("winner");
                document.getElementById(c).classList.add("winner");
                return true;
            }
            return false;
        });
    }