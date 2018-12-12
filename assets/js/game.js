var wins = 0;
var losses = 0;
var targetNumber = Math.floor(Math.random() * 102) + 19;
var gemValues = generateGemValues();
var userScore = 0;

// loads audio files
var gem1sound = new Audio("assets/sounds/gem1sound.wav");
var gem2Sound = new Audio("assets/sounds/gem2sound.wav");
var gem3Sound = new Audio("assets/sounds/gem3sound.wav");
var gem4Sound = new Audio("assets/sounds/gem4sound.wav");
var winsound = new Audio("assets/sounds/raven.mp3");

// JavaScript function that wraps everything
$(document).ready(function() {

  newGame();
  
  // Theme Button
  $(".my-sound-btn").on("click", function() {
    if ($(".my-sound-btn").text().includes("On") ) {
      $(".my-sound-btn").css('background-color', 'rgb(255,0,0)');
      $(".my-sound-btn").html('<span class="fa fa-music"></span> Game Play Sound Off');
    } else {
      $(".my-sound-btn").css('background-color', 'rgb(90, 255, 13)');
      $(".my-sound-btn").html('<span class="fa fa-music"></span> Game Play Sound On');
    }
  });


});

$("#game-info").on("click", function() {

  $.fancybox.open('<div class="message text-center"><h2>How to Play!</h2>\
  <p>A random number between 19-120 is generated at the beginning of the game and is displayed in the top left. This is your target number.</p>\
  <p>There are four crystals, each assigned a random value between 1-12. Clicking on a crystal will add the value of that crystal to your score, which is displayed at the bottom of the screen.</p>\
  <p>The user wins the game by matching the value of their score to the target number. The user loses if they go over the target number.</p>\
  <p>When the user either wins or loses a game, a new target number is generated and new values are assigned to each crystal. Wins and loses are tracked along the way!</p>\
  </div>');
});

$(".gem").on("click", function() {

  var gemValue = ($(this).attr("value"));
  gemValue = parseInt(gemValue);

  userScore += gemValue;
  $("#user-score").html(userScore);

  switch ($(this).attr("id")) {
    case "gem1":
      gem1sound.play();
      break;
    case "gem2":
      gem2sound.play();
      break;
    case "gem3":
      gem3sound.play();
      break;
    case "gem4":
      gem4sound.play();
      break;
  }

  if (userScore === targetNumber) {
    winsound.play();
    wins++;
    newGame();
  } else if (userScore > targetNumber) {
    losses++;
    newGame();
  }
});

function generateGemValues(){
  var values = [];
  for (var i = 0; i < 4; i++) {
    values.push(Math.floor(Math.random() * 12) + 1);
  }
  return values;
}

function newGame() {
  targetNumber = Math.floor(Math.random() * 102) + 19;
  gemValues = generateGemValues();
  userScore = 0;
  $("#target-number").html(targetNumber);
  $("#wins").html("Wins: " + wins);
  $("#losses").html("Losses: " + losses);

  $("#gem1").attr("value", gemValues[0]);
  $("#gem2").attr("value", gemValues[1]);
  $("#gem3").attr("value", gemValues[2]);
  $("#gem4").attr("value", gemValues[3]);

  $("#user-score").html(userScore);
}