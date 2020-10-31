let players = [];
let turn = 0;
let gameOver = false;

let board = [
  ["", "", ""],
  ["", "", ""],
  ["", "", ""]
];

const startGame = () => {
  let input1 = document.getElementById("p1");
  let input2 = document.getElementById("p2");

  let player1 = input1.value;
  let player2 = input2.value;

  if (isEmpty(player1) || isEmpty(player2)) {
    alert("Player name is required");
    return;
  }

  input1.setAttribute("disabled", true);
  input2.setAttribute("disabled", true);

  let inputTab = document.getElementById("input");
  let game = document.getElementById("game-container");
  inputTab.classList.add("hide");
  game.classList.remove("hide");

  players.push(player1);
  players.push(player2);

  document.getElementById("turn").innerHTML = players[turn % 2] + "'s turn";
};

const resetGame = () => {
  document.location.reload();
  clearInterval(interval); // Needed for Chrome to end game
};

const calculateWinner = () => {
  if (turn < 4) {
    return false;
  }

  const winnerCombinations = [
    ["00", "01", "02"],
    ["10", "11", "12"],
    ["20", "21", "22"],
    ["00", "10", "20"],
    ["01", "11", "21"],
    ["02", "12", "22"],
    ["00", "11", "22"],
    ["20", "11", "02"]
  ];

  //a[0]  a['0']
  for (let i = 0; i < winnerCombinations.length; i++) {
    let val1 = winnerCombinations[i][0]; //00
    let val2 = winnerCombinations[i][1]; //10
    let val3 = winnerCombinations[i][2]; //20

    if (
      board[val1[0]][val1[1]] !== "" &&
      board[val1[0]][val1[1]] === board[val2[0]][val2[1]] &&
      board[val1[0]][val1[1]] === board[val3[0]][val3[1]]
    ) {
      return true;
    }
  }

  return false;
};

const handleClick = (el) => {
  if (el.innerHTML !== "" || gameOver) {
    return;
  }

  let id = el.id;
  let i = parseInt(id[0]);
  let j = parseInt(id[1]);

  board[i][j] = turn % 2 === 0 ? "X" : "O";
  el.innerHTML = board[i][j];

  if (calculateWinner()) {
    let game = document.getElementById("game-container");
    let resultTab = document.getElementById("resultWinner");
    game.classList.add("hide");
    resultTab.classList.remove("hide");
    document.getElementById("resultLine").innerHTML =
      players[turn % 2] + " wins!!";
    gameOver = true;
    return;
  }
  turn++;

  document.getElementById("turn").innerHTML = players[turn % 2] + "'s turn";

  if (turn === 9) {
    let game = document.getElementById("game-container");
    let resultTab = (document.getElementById("resultWinner").innerHTML =
      "<h2>Game Over</h2>");
    game.classList.add("hide");
    resultTab.classList.remove("hide");
    document.getElementById("resultLine").innerHTML = "<h2>Game Draw</h2>";
    alert("Game is drawn");
    gameOver = true;
    return;
  }
};
// ' ', '', null, undefined, '

//  !null  !undefined !''   '      ' => ''
const isEmpty = (value) => !value || !value.trim();
