var wins = 0;
var losses = 0;
var targetNumber = Math.floor(Math.random() * 102) + 19;
var gemValues = generateGemValues();
var userScore = 0;

// JavaScript function that wraps everything
$(document).ready(function() {

  newGame();

  // Gets Link for Game sound
  //var audioElement = document.createElement("audio");
  //audioElement.setAttribute("src", "assets/captainplanet24.mp3");

  // Theme Button
  $(".my-sound-btn").on("click", function() {
    if ($(".my-sound-btn").text().includes("On") ) {
      $(".my-sound-btn").css('background-color', 'red');
      $(".my-sound-btn").html('<span class="fa fa-music"></span> Game Play Sound Off');
    } else {
      $(".my-sound-btn").css('background-color', 'green');
      $(".my-sound-btn").html('<span class="fa fa-music"></span> Game Play Sound On');
    }
  });

  


});

$(".gem").on("click", function() {

  var gemValue = ($(this).attr("value"));
  gemValue = parseInt(gemValue);

  userScore += gemValue;
  $("#user-score").html(userScore);

  if (userScore === targetNumber) {
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