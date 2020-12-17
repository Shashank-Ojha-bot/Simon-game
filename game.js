

var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern=[];
var level=0;
var started=false;

$(".instruction").click(function(){
  // alert("Button clicked");
  window.location='instruction.html';
});

$(".play_button").click(function(){
  window.location='index.html';
});

$(document).keypress(function(){
  if(!started)
  {
    $("#level-title").text("Level "+level);
    started=true;
    $(".instruction").hide();
    nextSequence();
  }
});

$(".btn").click(function(){
  var userChosenColor=$(this).attr("id");
  userClickedPattern.push(userChosenColor);
  playSound(userChosenColor);
  animatePress(userChosenColor);
  // console.log(userClickedPattern);

  checkAnswer(userClickedPattern.length-1);
});

function nextSequence() {

  userClickedPattern=[];

  level=level+1;
  $("#level-title").text("Level "+level);

  var randomNumber = Math.floor(Math.random() * 4);

  var randomChosenColor = buttonColors[randomNumber];

  gamePattern.push(randomChosenColor);

  $("#"+randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);

  playSound(randomChosenColor);

  animatePress(randomChosenColor);
}

function playSound(name)
{
  var audio=new Audio("sounds/"+name+".mp3");
  audio.play();
}

function animatePress(currentColor){
  $("#"+currentColor).addClass("pressed");
  setTimeout(() => { $("#"+currentColor).removeClass("pressed");} ,200);
}

function checkAnswer(currentLevel) {

    //3. Write an if statement inside checkAnswer() to check if the most recent user answer is the same as the game pattern. If so then log "success", otherwise log "wrong".
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

      console.log("success");

      //4. If the user got the most recent answer right in step 3, then check that they have finished their sequence with another if statement.
      if (userClickedPattern.length === gamePattern.length){

        //5. Call nextSequence() after a 1000 millisecond delay.
        setTimeout(function () {
          nextSequence();
        }, 1000);

      }

    } else {

      // console.log("wrong");
      var gameOverAudio=new Audio("sounds/wrong.mp3");
      gameOverAudio.play();
      $("body").addClass("game-over");
      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);

      $("#level-title").text("Game Over, Press Any Key to Restart");
      $(".instruction").show();
      startOver();
    }

}

function startOver(){
  level = 0;
  gamePattern = [];
  started=false;
}
