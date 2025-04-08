/* global $, sessionStorage */

$(document).ready(runProgram); // wait for the HTML / CSS elements of the page to fully load, then execute runProgram()
  
function runProgram(){
  ////////////////////////////////////////////////////////////////////////////////
  //////////////////////////// SETUP /////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  // Constant Variables
  const FRAME_RATE = 60;
  const FRAMES_PER_SECOND_INTERVAL = 1000 / FRAME_RATE;
  const BOARD_WIDTH = $("#board").width();
  const BOARD_HEIGHT = $("#board").height();
  var score1 = 0
  var score2 = 0
  var leftCheck;
  var rightCheck;
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

  function GameItem(id, speedX, speedY){
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

  var paddleLeft = GameItem("#paddleLeft", 0, 0)
  var paddleRight = GameItem("#paddleRight", 0, 0)
  var ball = GameItem("#ball", (Math.random() * 3 + 2) * (Math.random() > 0.5 ? -1 : 1), (Math.random() * 3 + 2) * (Math.random() > 0.5 ? -3 : 3))

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
    }

    if(event.which === KEY.UP){
      paddleRight.speedY = -5
    } 
    if(event.which === KEY.DOWN){
      paddleRight.speedY = +5
    }

    if(event.which === KEY.D){
      paddleLeft.speedY = paddleLeft.speedY *2
    }
    if(event.which === KEY.RIGHT){
      paddleRight.speedY = paddleRight.speedY *2
    }
    if(event.which === KEY.A){
      leftCheck = true
    }
    if(event.which === KEY.LEFT){
      rightCheck = true
    }
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
    }
    if(event.which === KEY.A){
      leftCheck = false
    }
    if(event.which === KEY.LEFT){
      rightCheck = false
    }
  }

  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////// HELPER FUNCTIONS ////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  // Movement Helpers
  function drawGameItem(obj){
    $(obj.id).css("left", obj.x);
    $(obj.id).css("top", obj.y);
  }

  function updateGameItem(obj){
    obj.x += obj.speedX;
    obj.y += obj.speedY;
  }



  function wallCollision(obj){
    if(obj.x > BOARD_WIDTH - obj.w || obj.x < 0){
      obj.x -= obj.speedX;
    } 
    
    if(obj.y < 0||obj.y > BOARD_HEIGHT - obj.h ){
      obj.y -= obj.speedY;
    }
  } 
  
  function ballCollision(obj){

    if(obj.y < 0||obj.y > BOARD_HEIGHT - obj.h ){
      obj.speedY = -1 * obj.speedY
    } 
    if(obj.x > BOARD_WIDTH - obj.w || obj.x < 0){
      updateScore(ball)
      resetBall(ball);
    } 
  }

  function resetBall(obj){
    obj.x = BOARD_WIDTH/2 - obj.w/2
    obj.y = BOARD_HEIGHT/2 - obj.h/2
    obj.speedX = (Math.random() * 3 + 2) * (Math.random() > 0.5 ? -1 : 1)

    obj.speedY = (Math.random() * 3 + 2) * (Math.random() > 0.5 ? -3 : 3)
  }

  function paddleCollision(obj){
    if(obj.x < paddleLeft.x + paddleLeft.w && obj.y > paddleLeft.y && obj.y < paddleLeft.y + paddleLeft.h && leftCheck === true){
      obj.speedX = -obj.speedX * 1.2;
      obj.speedY = -obj.speedY * 1.2;
      leftCheck = false
    }
    if(obj.x + obj.w > paddleRight.x && obj.y > paddleRight.y && obj.y < paddleRight.y + paddleRight.h && rightCheck === true){
      obj.speedX = -obj.speedX * 1.2;
      obj.speedY = -obj.speedY * 1.2;
      rightCheck = false
    }
    else if(obj.x < paddleLeft.x + paddleLeft.w && obj.y > paddleLeft.y && obj.y < paddleLeft.y + paddleLeft.h){
      obj.speedX = -obj.speedX * 1.2;
    }
    else if(obj.x + obj.w > paddleRight.x && obj.y > paddleRight.y && obj.y < paddleRight.y + paddleRight.h){
      obj.speedX = -obj.speedX * 1.2;
    }
     } 

  
  function updateScore(obj){
    //GAGE IS REALLY COOL & AWESOME!!
    if(obj.x > BOARD_WIDTH - obj.w){
      console.log("right");
      score1 = score1 + 1
      $("#score1").text(score1)
    } if(obj.x < 0 ){
      console.log("left");
      score2 = score2 + 1
      $("#score2").text(score2)
    }if(score2 === 10){
      resetBall(ball);

      winner = "Player 2"
      endGame();
      showWinnerPopup();
    }if(score1 === 10){
      resetBall(ball);
      winner = "Player 1"
      endGame();
      showWinnerPopup();
    } 
    
  }


  function endGame() {
    // stop the interval timer
    clearInterval(interval);

    // turn off event handlers
    $(document).off();
  }
  function showWinnerPopup() {
    $("#winnerText").text(winner + " wins!");
    $("#winnerPopup").fadeIn();
  }


}
