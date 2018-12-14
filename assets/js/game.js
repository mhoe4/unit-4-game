// JavaScript function that wraps everything
$(document).ready(function() {
// Global Variables
  var wins = 0;
  var losses = 0;
  var targetNumber = Math.floor(Math.random() * 102) + 19;
  var gemValues = generateGemValues();
  var userScore = 0;

  // loads audio files
  var gem1sound = new Audio("assets/sounds/gem1sound.wav");
  var gem2sound = new Audio("assets/sounds/gem2sound.wav");
  var gem3sound = new Audio("assets/sounds/gem3sound.wav");
  var gem4sound = new Audio("assets/sounds/gem4sound.wav");
  var winsound = new Audio("assets/sounds/win-sound.mp3");
  var losesound = new Audio("assets/sounds/lose-sound.wav");
  var sound = true;
    
  // Set up a new game with new target value/gem values, updated wins/losses, and reset user score
  newGame();
  
  // Turn sound on/off when the sound button is clicked and modify button's color (green/red)
  $("#my-sound-btn").on("click", function() {
    if ($("#my-sound-btn").text().includes("On") ) {
      $("#my-sound-btn").css('background-color', 'rgb(255,0,0)');
      $("#my-sound-btn").html('<span class="fa fa-music"></span> Game Play Sound: Off');
      sound = false;
    } else {
      $("#my-sound-btn").css('background-color', 'rgb(90, 255, 13)');
      $("#my-sound-btn").html('<span class="fa fa-music"></span> Game Play Sound: On');
      sound = true;
    }
  });

  // Display game instructions in fancy box when game info button is clicked
  $("#game-info").on("click", function() {

    $.fancybox.open('<div class="message text-center"><h2>How to Play!</h2>\
    <p>A random number between 19-120 is generated at the beginning of the game and is displayed in the top left. This is your target number.</p>\
    <p>There are four crystals, each assigned a random value between 1-12. Clicking on a crystal will add the value of that crystal to your score, which is displayed at the bottom of the screen.</p>\
    <p>The user wins the game by matching the value of their score to the target number. The user loses if they go over the target number.</p>\
    <p>When the user either wins or loses a game, a new target number is generated and new values are assigned to each crystal. Wins and loses are tracked along the way!</p>\
    </div>');
  });
  
  // Add value of the gem clicked to the user score, run click effects, check status of game
  $(".gem").on("click", function() {
    // $(this).effect( "bounce", {times:3}, 300 );
  
    // Get gem value as integer
    var gemValue = ($(this).attr("value"));
    gemValue = parseInt(gemValue);
  
    // Add gem value to user score and update html
    userScore += gemValue;
    $("#user-score").html(userScore);
  
    // Play gem related sound
    switch ($(this).attr("id")) {
      case "gem1":
        if(sound) {
          gem1sound.play();
        }
        break;
      case "gem2":
        if(sound){
          gem2sound.play();
        }
        break;
      case "gem3":
        if(sound){
          gem3sound.play();
        }
        break;
      case "gem4":
        if(sound){
          gem4sound.play();
        }
        break;
    }
  
    // Checkl if user score >= target and reset game if needed
    if (userScore === targetNumber) {
      if(sound) {
        winsound.play();
      }
      wins++;
      newGame();
    } else if (userScore > targetNumber) {
      if(sound) {
        losesound.play();
      }
      losses++;
      newGame();
    }
  });
  
  // Creates an array of 4 random values to be applied to the crystals
  function generateGemValues(){
    var values = [];
    for (var i = 0; i < 4; i++) {
      values.push(Math.floor(Math.random() * 12) + 1);
    }
    return values;
  }
  
  // Set up a new game with new target value/gem values, updated wins/losses, and reset user score
  function newGame() {
    targetNumber = Math.floor(Math.random() * 102) + 19;
    gemValues = generateGemValues();
    userScore = 0;

    // Update visible Html
    $("#target-number").html(targetNumber);
    $("#wins").html("Wins: " + wins);
    $("#losses").html("Losses: " + losses);
    $("#user-score").html(userScore);
  
    // Set gem Values
    $("#gem1").attr("value", gemValues[0]);
    $("#gem2").attr("value", gemValues[1]);
    $("#gem3").attr("value", gemValues[2]);
    $("#gem4").attr("value", gemValues[3]);
  }

});



