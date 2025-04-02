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

  function textObj(id){
    return {
      id: $(id),
      text: 0,
    }
    
  }
  // Game Item Objects
  const KEY = {
    W: 87,
    S: 83,

    UP: 38,
    DOWN: 40
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

    updateScore(ball);
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
  }
  
  function handleKeyUp(event) {
    if(event.which === KEY.W || event.which === KEY.S){
      paddleLeft.speedY = 0;
    }
    if(event.which === KEY.UP || event.which === KEY.DOWN){
      paddleRight.speedY = 0;
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
      obj.x = BOARD_WIDTH/2 - obj.w/2
      obj.y = BOARD_HEIGHT/2 - obj.h/2
    } 
  }

  function paddleCollision(obj){
    if(obj.x < paddleLeft.x + paddleLeft.w && obj.y > paddleLeft.y && obj.y < paddleLeft.y + paddleLeft.h){
      obj.speedX = -obj.speedX;
    }
    if(obj.x + obj.w > paddleRight.x && obj.y > paddleRight.y && obj.y < paddleRight.y + paddleRight.h){
      obj.speedX = -obj.speedX;
    }
     } 
    

  function updateScore(obj){

    if(obj.x > BOARD_WIDTH){
      console.log("right");
      score1 = score1 + 1
      $("#score1").text(score1)
    } if(obj.x < 0 ){
      console.log("left");
      score2 = score2 + 1
      $("#score2").text(score2)
    }
  }


  //check boundaries of game itemsr
  //determine if objects collide
  //handle what happens when the ball hits the wall
  //handle what happens when the ball hits the paddles 
  //handles what happens when someone wins
  //function that handles the points
  //handle resetting the game when someone wins

  function endGame() {
    // stop the interval timer
    clearInterval(interval);

    // turn off event handlers
    $(document).off();
  }
  
}
