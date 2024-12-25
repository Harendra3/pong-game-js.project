//js from DOm
const startText = document.getElementById("starttext");
const paddle1 = document.getElementById("paddle1");
const paddle2 = document.getElementById("paddle2");
const ball = document.getElementById("ball");
const player1ScoreElement = document.getElementById("player1score");
const player2ScoreElement = document.getElementById("player2score");
const losssound = document.getElementById("lossSound");
const wallsound = document.getElementById("wallSound");
const paddlesound = document.getElementById("paddleSound");

console.log(startText);
//Game Variables
let gameRunning = false;
let keypressed = {};
let paddle1Speed = 0;
let paddle1Y = 150;
let paddle2Speed = 0;
let paddle2Y = 150;
let ballX = 290;
let ballY = 190;
let ballSpeedX = 2;
let ballSpeedY = 2;
let player2Score = 0;
let player1Score = 0;

//constants
const paddleAcceleration = 1;
const maxpaddlespeed = -5;
const paddledecelaration = 1;
const gameheight = 400;
const gamewidth = 600;

document.addEventListener("keydown", startGame);
document.addEventListener("keydown", handlekeydown);
document.addEventListener("keyup", handlekeyup);
//Start
function startGame() {
  gameRunning = true;
  startText.style.display = "none";
  document.removeEventListener("keydown", startGame);
  gameLoop();
}
function gameLoop() {
  if (gameRunning) {
    updatepaddle1();
    updatepaddle2();
    moveball();
    setTimeout(gameLoop, 8);
  }
}
function handlekeydown(e) {
  keypressed[e.key] = true;
}
function handlekeyup(e) {
  keypressed[e.key] = false;
}

function updatepaddle1() {
  if (keypressed["w"]) {
    paddle1Speed = Math.max(paddle1Speed - paddleAcceleration, maxpaddlespeed);
  } else if (keypressed["s"]) {
    paddle1Speed = Math.min(paddle1Speed + paddleAcceleration, -maxpaddlespeed);
  } else {
    if (paddle1Speed > 0) {
      paddle1Speed = Math.max(paddle1Speed - paddledecelaration, 0);
    } else {
      paddle1Speed = Math.min(paddle1Speed + paddledecelaration, 0);
    }
  }
  paddle1Y += paddle1Speed;
  if (paddle1Y < 0) {
    paddle1Y = 0;
  }
  if (paddle1Y > gameheight - paddle1.clientHeight) {
    paddle1Y = gameheight - paddle1.clientHeight;
  }
  paddle1.style.top = paddle1Y + "px";
}
function updatepaddle2() {
  if (keypressed["ArrowUp"]) {
    paddle2Speed = Math.max(paddle2Speed - paddleAcceleration, maxpaddlespeed);
  } else if (keypressed["ArrowDown"]) {
    paddle2Speed = Math.min(paddle2Speed + paddleAcceleration, -maxpaddlespeed);
  } else {
    if (paddle2Speed > 0) {
      paddle2Speed = Math.max(paddle2Speed - paddledecelaration, 0);
    } else {
      paddle2Speed = Math.min(paddle2Speed + paddledecelaration, 0);
    }
  }
  paddle2Y += paddle2Speed;
  if (paddle2Y < 0) {
    paddle2Y = 0;
  }
  if (paddle2Y > gameheight - paddle2.clientHeight) {
    paddle2Y = gameheight - paddle2.clientHeight;
  }
  paddle2.style.top = paddle2Y + "px";
}
function moveball() {
  ballX += ballSpeedX;
  ballY += ballSpeedY;
  //wall collision
  if (ballY >= gameheight - ball.clientHeight || ballY <= 0) {
    ballSpeedY = -ballSpeedY;
    playsound(wallsound);
  }
  //paddle1 collision
  if (
    ballX <= paddle1.clientWidth &&
    ballY >= paddle1Y &&
    ballY <= paddle1Y + paddle1.clientHeight
  ) {
    ballSpeedX = -ballSpeedX;
    playsound(paddlesound);
  }
  //paddle2 collision
  if (
    ballX >= gamewidth - paddle2.clientWidth - ball.clientWidth &&
    ballY >= paddle2Y &&
    ballY <= paddle2Y + paddle2.clientHeight
  ) {
    ballSpeedX = -ballSpeedX;
    playsound(paddlesound);
  }
  //out of game
  if (ballX <= 0) {
    player2Score++;
    playsound(losssound);
    updateScoreboard();
    resetball();
    pausegame();
  } else if (ballX >= gamewidth - ball.clientWidth) {
    player1Score++;
    playsound(losssound);
    updateScoreboard();
    resetball();
    pausegame();
  }
  ball.style.left = ballX + "px";
  ball.style.top = ballY + "px";
}
function updateScoreboard() {
  player1ScoreElement.textContent = player1Score;
  player2ScoreElement.textContent = player2Score;
}
function resetball() {
  ballX = gamewidth / 2 - ball.clientWidth / 2;
  ballY = gameheight / 2 - ball.clientHeight / 2;
  ballSpeedX = Math.random() > 0.5 ? 2 : -2;
  ballSpeedY = Math.random() > 0.5 ? 2 : -2;
}
function pausegame() {
  gameRunning = false;
  document.addEventListener("keydown", startGame);
}

function playsound(sound) {
  sound.currentTime = 0;
  sound.play();
}
