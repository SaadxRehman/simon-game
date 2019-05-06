var buttonColors = ["green", "red", "yellow", "blue"];
var gamePattern = [];
var userPattern = [];
var started = false;
var level = 0;
var timer = 0;
$(document).keydown(function() {
  if (!started) {
    $("#level-title").text("Level " + level);
    sequence();
    started = true;
  }
});

$(document).click(function() {
  if (!started) {
    $("#level-title").text("Level " + level);
    sequence();
    started = true;
  }
});

function sequence() {
  userPattern = [];
  level++;
  $("#level-title").text("Level " + level);
  var randomButton = Math.floor(Math.random(1) * 4);
  gamePattern.push(buttonColors[randomButton]);
  showMoves();
}

$(".btn").click(function() {
  var userSelectedColor = $(this).attr("id");
  userPattern.push(userSelectedColor);
  animateButton(userSelectedColor);
  playSound(userSelectedColor);
  checkAnswer(userPattern.length - 1);
});

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userPattern[currentLevel]) {

    if (gamePattern.length === userPattern.length) {

      setTimeout(function() {
        sequence();
      }, 1000);
      timer = +5;
    } else {

    }
  } else {
    gameOver();
    startOver();
  }
}

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}

function gameOver() {
  $("body").addClass("game-over");
  setTimeout(function() {
    $("body").removeClass("game-over");
  }, 200);
  $("#level-title").text("Game Over, Press Any Key to Restart");
}

function showMoves() {
  var i = 0;
  var moves = setInterval(function() {
    playGame(gamePattern[i]);
    i++;
    if (i >= gamePattern.length) {
      clearInterval(moves);
    }
  }, 300 - timer);
}

function playGame(button) {
  $("#" + button).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(button);
}

function playSound(button) {
  var audio = new Audio("sounds/" + button + ".mp3");
  audio.play();
}

function animateButton(buttonColor) {
  $("#" + buttonColor).addClass("pressed");
  setTimeout(function() {
    $("#" + buttonColor).removeClass("pressed");
  }, 100);
}