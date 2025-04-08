/* global $, sessionStorage */

$(document).ready(runProgram); // wait for the HTML / CSS elements of the page to fully load, then execute runProgram()
  
function runProgram(){
  ////////////////////////////////////////////////////////////////////////////////
  //////////////////////////// SETUP /////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  // Constant Variables
  const FRAME_RATE = 60;
  const FRAMES_PER_SECOND_INTERVAL = 1000 / FRAME_RATE;
  const BOARD_WIDTH = $("#board").width(); //no magic numbers!!!!!!
  const BOARD_HEIGHT = $("#board").height(); // ^^^^^^^^^^
  var score1 = 0 //setup score
  var score2 = 0 //setup score
  var leftCheck; //saving for mixup option
  var rightCheck; //saving for mixup option
  var winner;


  // Game Item Objects
  const KEY = {
    LEFT: 37,
    RIGHT: 39,
    UP: 38,
    DOWN: 40,
    
    A: 65,
    D: 68,
    W: 87,
    S: 83,
  }

  function GameItem(id, speedX, speedY){ //creates game objects
    var obj = {
      id: id,
      x: parseFloat($(id).css("left")),
      y: parseFloat($(id).css("top")),
      speedX: speedX,
      speedY: speedY,
      w: $(id).width(),
      h: $(id).height()
    }
    return obj
  }

  var paddleLeft = GameItem("#paddleLeft", 0, 0) //creates left paddle
  var paddleRight = GameItem("#paddleRight", 0, 0) //creates right paddle
  var ball = GameItem("#ball", (Math.random() * 3 + 2) * (Math.random() > 0.5 ? -1 : 1), (Math.random() * 3 + 2) * (Math.random() > 0.5 ? -3 : 3)) //creates ball

  // one-time setup
  let interval = setInterval(newFrame, FRAMES_PER_SECOND_INTERVAL);   // execute newFrame every 0.0166 seconds (60 Frames per second)
  $(document).on('keydown', handleKeyDown);                           // change 'eventType' to the type of event you want to handle
  $(document).on('keyup', handleKeyUp);
  ////////////////////////////////////////////////////////////////////////////////
  ///////////////////////// CORE LOGIC ///////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  /* 
  On each "tick" of the timer, a new frame is dynamically drawn using JavaScript
  by calling this function and executing the code inside.
  */
  function newFrame() { 
    drawGameItem(paddleLeft);
    updateGameItem(paddleLeft);
    drawGameItem(paddleRight);
    updateGameItem(paddleRight);
    drawGameItem(ball);
    updateGameItem(ball);
    wallCollision(paddleLeft);
    wallCollision(paddleRight);
    ballCollision(ball);
    paddleCollision(ball);

    //all of our functions called each frame >:D
  }


  
  /* 
  Called in response to events.
  */
  function handleKeyDown(event) {
    if(event.which === KEY.W){
      paddleLeft.speedY = -5
    } 
    if(event.which === KEY.S){
      paddleLeft.speedY = +5
    } //handles right player movements^^

    if(event.which === KEY.UP){
      paddleRight.speedY = -5
    } 
    if(event.which === KEY.DOWN){
      paddleRight.speedY = +5
    } //handles right player movements^^

    if(event.which === KEY.D){
      paddleLeft.speedY = paddleLeft.speedY *2
    } //left players dash^^
    if(event.which === KEY.RIGHT){
      paddleRight.speedY = paddleRight.speedY *2
    } //right players dash^^
    if(event.which === KEY.A){
      leftCheck = true
      //checks to see whether or not the mixup (sending the ball the same direction it came from) is active for left player
    }
    if(event.which === KEY.LEFT){
      rightCheck = true
    }//checks to see whether or not the mixup (sending the ball the same direction it came from) is active for right player
  }
  
  function handleKeyUp(event) {
    if(event.which === KEY.W || event.which === KEY.S){
      paddleLeft.speedY = 0;
    }
    if(event.which === KEY.UP || event.which === KEY.DOWN){
      paddleRight.speedY = 0;
    }
    if(event.which === KEY.D){
      paddleLeft.speedY = 0
    }
    if(event.which === KEY.RIGHT){
      paddleLeft.speedY = 0
    }//makes movement stop when releasing a button
    if(event.which === KEY.A){
      leftCheck = false
    } //deactivates mixup ^^
    if(event.which === KEY.LEFT){
      rightCheck = false
    }//deactivates mixup^^
  }

  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////// HELPER FUNCTIONS ////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  // Movement Helpers
  function drawGameItem(obj){
    $(obj.id).css("left", obj.x);
    $(obj.id).css("top", obj.y);
  } // draws the game items^^

  function updateGameItem(obj){
    obj.x += obj.speedX;
    obj.y += obj.speedY;
  } //updates game item speed^^



  function wallCollision(obj){
    if(obj.x > BOARD_WIDTH - obj.w || obj.x < 0){
      obj.x -= obj.speedX;
    } 
    
    if(obj.y < 0||obj.y > BOARD_HEIGHT - obj.h ){
      obj.y -= obj.speedY;
    }//reverses speed when you hit the board's walls with the paddles
  } 
  
  function ballCollision(obj){

    if(obj.y < 0||obj.y > BOARD_HEIGHT - obj.h ){
      obj.speedY = -1 * obj.speedY //reverses balls speed (bounces the ball) when hitting the top or bottom of the board
    } 
    if(obj.x > BOARD_WIDTH - obj.w || obj.x < 0){ // resets the ball when hitting the left or right side of the board and updates the score.
      updateScore(ball)
      resetBall(ball);
    } 
  }

  function resetBall(obj){
    obj.x = BOARD_WIDTH/2 - obj.w/2
    obj.y = BOARD_HEIGHT/2 - obj.h/2 //resets the ball to center screen when it hits the left or right side of the screen
    obj.speedX = (Math.random() * 3 + 2) * (Math.random() > 0.5 ? -1 : 1)
    obj.speedY = (Math.random() * 3 + 2) * (Math.random() > 0.5 ? -3 : 3) //resets ball speed so one player doesn't snowball cuz how fast the ball goes xD
  }

  function paddleCollision(obj){
    if(obj.x < paddleLeft.x + paddleLeft.w && obj.y > paddleLeft.y && obj.y < paddleLeft.y + paddleLeft.h && leftCheck === true){
      obj.speedX = -obj.speedX * 1.2; //^^when the ball hits a paddle the ball goes slightly faster
      obj.speedY = -obj.speedY * 1.2; //obj.speedY  is here so it goes back the same trajectory for a mixup 
      leftCheck = false //put in place so the mixup doesn't make the ball faze through the paddle D:
    }
    if(obj.x + obj.w > paddleRight.x && obj.y > paddleRight.y && obj.y < paddleRight.y + paddleRight.h && rightCheck === true){
      obj.speedX = -obj.speedX * 1.2;//when the ball hits a paddle the ball goes slightly faster
      obj.speedY = -obj.speedY * 1.2; //obj.speedY  is here so it goes back the same trajectory for a mixup 
      rightCheck = false //put in place so the mixup doesn't make the ball faze through the paddle D:
    }
    else if(obj.x < paddleLeft.x + paddleLeft.w && obj.y > paddleLeft.y && obj.y < paddleLeft.y + paddleLeft.h){
      obj.speedX = -obj.speedX * 1.2; //when the ball hits a paddle the ball goes slightly faster
    }
    else if(obj.x + obj.w > paddleRight.x && obj.y > paddleRight.y && obj.y < paddleRight.y + paddleRight.h){
      obj.speedX = -obj.speedX * 1.2;//when the ball hits a paddle the ball goes slightly faster
    }
     } 

  
  function updateScore(obj){
    //GAGE IS REALLY COOL & AWESOME!!
    if(obj.x > BOARD_WIDTH - obj.w){
      score1 = score1 + 1
      $("#score1").text(score1)//updates the score when ball hits the right side of the board
    } if(obj.x < 0 ){
      score2 = score2 + 1
      $("#score2").text(score2) //updates the score when ball hits the right side of the board
    }if(score2 === 10){
      resetBall(ball);
      winner = "Player 2" //sets the winner to player 2 when score2 is equal to 10
      endGame();//ends the game
      winScreen(); //displays win screen
    }if(score1 === 10){
      resetBall(ball);
      winner = "Player 1"
      endGame();//ends game
      winScreen();//shows win screen
    } 
    
  }


  function endGame() {
    // stop the interval timer
    clearInterval(interval);

    // turn off event handlers
    $(document).off();
  }
  function winScreen() {
    $("#winnerText").text(winner + " wins!"); //updates the CSS to display the winner
    $("#winnerPopup").fadeIn(); // makes the winscreen appear and display the winner.
  }


}
