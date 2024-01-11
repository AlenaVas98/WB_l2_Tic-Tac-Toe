let boxes = document.querySelectorAll(".box");
let winX = document.querySelector(".countX");
let winO = document.querySelector(".countO");
let ties = document.querySelector(".countTies");
let restart = document.querySelector(".restart");

let turn = "X";
let gameOver = false;
let scorX = 0;
let scorO = 0;
let scorTies = 0;

// логика отрисовки хода игрока на игровом полу
boxes.forEach((e) => {
  e.innerHTML = "";
  e.addEventListener("click", () => {
    if (!gameOver && e.innerHTML === "") {
      e.innerHTML = turn;
      checkWin();
      checkTie();
      changeTurn();
    }
  });
});

// логика смены игроков
function changeTurn() {
  if (turn === "X") {
    turn = "O";
    document.querySelector(".bg").style.left = "85px";
  } else {
    turn = "X";
    document.querySelector(".bg").style.left = "0";
  }
}

//логика проверки выигрышной комбинации
function checkWin() {
  let winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < winConditions.length; i++) {
    let v0 = boxes[winConditions[i][0]].innerHTML;
    let v1 = boxes[winConditions[i][1]].innerHTML;
    let v2 = boxes[winConditions[i][2]].innerHTML;

    if (v0 != "" && v0 === v1 && v0 === v2) {
      gameOver = true;
      document.querySelector("#results").innerHTML = turn + " win";
      document.querySelector("#playAgain").style.display = "inline";
      if (turn === "X") {
        scorX += 1;
      } else if (turn === "O") {
        scorO += 1;
      }
      scor();
      for (j = 0; j < 3; j++) {
        boxes[winConditions[i][j]].style.backgroundColor = "#A25772";
        boxes[winConditions[i][j]].style.color = "#ECF4D6";
      }
    }
  }
}

// проверка на ничью
function checkTie() {
  if (!gameOver) {
    let isTie = true;
    boxes.forEach((e) => {
      if (e.innerHTML === "") isTie = false;
    });
    if (isTie) {
      scorTies += 1;
    }
    scor();
    if (isTie) {
      gameOver = true;
      document.querySelector("#results").innerHTML = "Tie";
      document.querySelector("#playAgain").style.display = "inline";
    }
  }
}

function scor() {
  winX.innerHTML = scorX;
  winO.innerHTML = scorO;
  ties.innerHTML = scorTies;
}

// логика очистки игрового поля

function cleanArea() {
  gameOver = false;
  turn = "X";
  document.querySelector(".bg").style.left = "0";
  document.querySelector("#results").innerHTML = "";
  document.querySelector("#playAgain").style.display = "none";

  boxes.forEach((e) => {
    e.innerHTML = "";
    e.style.removeProperty("background-color");
    e.style.color = "#222";
  });
}

// перезапускаем всю игру
restart.addEventListener("click", () => {
  scorX = 0;
  scorO = 0;
  scorTies = 0;
  scor();
  cleanArea();
  console.log("dad");
});

document.querySelector("#playAgain").addEventListener("click", () => {
  cleanArea();
});
