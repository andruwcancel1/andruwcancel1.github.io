
$(document).ready(runProgram); // wait for the HTML / CSS elements of the page to fully load, then execute runProgram()
  
function runProgram(){
  ////////////////////////////////////////////////////////////////////////////////
  //////////////////////////// SETUP /////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  // Constant Variables
  var FRAME_RATE = 60;
  var FRAMES_PER_SECOND_INTERVAL = 1000 / FRAME_RATE;
  const BOARD_WIDTH = $("#board").width();
  const BOARD_HEIGHT = $("#board").height();
  const WALKER_WIDTH = $("#walker").width();
  const WALKER_HEIGHT = $("#walker").height();
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
  

  var walker =  Walker("#walker", 0, 0, 0, 0, WALKER_WIDTH, WALKER_HEIGHT)
  var walker2 =  Walker("#walker2", BOARD_WIDTH - WALKER_WIDTH, BOARD_HEIGHT - WALKER_HEIGHT, 0, 0, WALKER_WIDTH, WALKER_HEIGHT)

  // Game Item Objects



  // one-time setup
  var interval = setInterval(newFrame, FRAMES_PER_SECOND_INTERVAL);   // execute newFrame every 0.0166 seconds (60 Frames per second)
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
    repositionGameItem(walker);
    repositionGameItem(walker2);
    redrawGameItem(walker);
    redrawGameItem(walker2);
    wallCollision(walker);
    wallCollision(walker2);
    handleCollision(true);
  }
  
  /* 
  Called in response to events.
  */
  function handleKeyDown(event) {
    if(event.which === KEY.LEFT){
      walker.speedX = -5;
    }
    if(event.which === KEY.RIGHT){
      walker.speedX = 5;
    }
    if(event.which === KEY.UP){
      walker.speedY = -5;
    }
    if(event.which === KEY.DOWN){
      walker.speedY = 5;
    }  
    
        if(event.which === KEY.A){
      walker2.speedX = -5;
    }
    if(event.which === KEY.D){
      walker2.speedX = 5;
    }
    if(event.which === KEY.W){
      walker2.speedY = -5;
    }
    if(event.which === KEY.S){
      walker2.speedY = 5;
    } 
  }
  
  
  function handleKeyUp(event) {
    if(event.which === KEY.LEFT || event.which === KEY.RIGHT){
      walker.speedX = 0;
    }
    if(event.which === KEY.UP || event.which === KEY.DOWN){
      walker.speedY = 0;
    }
    
        if(event.which === KEY.A || event.which === KEY.D){
      walker2.speedX = 0;
    }
    if(event.which === KEY.W || event.which === KEY.S){
      walker2.speedY = 0;
    }
    
  }

  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////// HELPER FUNCTIONS ////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  function Walker(id, xPos, yPos, speedX, speedY, width, height){
    let obj = {
      id: id,
      xPos: xPos,
      yPos: yPos,
      speedX: speedX,
      speedY: speedY,
      width: width,
      height: height,
    }
  return obj;
  }


  function repositionGameItem(obj){
    obj.xPos += obj.speedX;
    obj.yPos += obj.speedY;
  }
  
  function redrawGameItem(obj){
    $(obj.id).css("left", obj.xPos);
    $(obj.id).css("top", obj.yPos);
    

  }
  
  function wallCollision(obj){
    if(obj.xPos > BOARD_WIDTH - WALKER_WIDTH || obj.xPos < 0){
      obj.xPos -= obj.speedX;
    } 
    
    if(obj.yPos < 0||obj.yPos > BOARD_HEIGHT - WALKER_HEIGHT ){
      obj.yPos -= obj.speedY;
    }
  }
  
  function changeColor(){
    //store the current color of each walker
    var walkerColor = $("#walker").css("background-color");
    var walker2Color = $("#walker2").css("background-color");
    //switch the colors
    $("#walker").css("background-color", walker2Color);
    $("#walker2").css("background-color", walkerColor);
  }

  function doCollide(obj, obj2) {
    // TODO: calculate and store the remaining
    // sides of the obj
    obj.leftX = obj.xPos;
    obj.topY = obj.yPos;
    obj.rightX = obj.xPos + obj.width;
    obj.bottomY = obj.yPos + obj.height;
    
    // TODO: Do the same for obj2
       
    obj2.leftX = obj2.xPos;
    obj2.topY = obj2.yPos;
    obj2.rightX = obj2.xPos + obj2.width;
    obj2.bottomY = obj2.yPos + obj2.height;

    // TODO: Return true if they are overlapping, false otherwise
	if(
    
      obj2.rightX > obj.leftX && 
      obj2.leftX < obj.rightX &&
      obj2.bottomY > obj.topY &&
      obj2.topY < obj.bottomY 
    ){
      return true
    } else {
      return false
    }
		
}



function handleCollision(Boolean){

var isTrue = Boolean

  if(doCollide(walker, walker2)&& isTrue === true){
    console.log("you have pressed upon my flesh, YOU WILL PAY!!")
    alert("you have pressed upon my flesh, YOU WILL PAY!!")
    changeColor();

  }

}


  
  function endGame() {
    // stop the interval timer
    clearInterval(interval);

    // turn off event handlers
    $(document).off();a
  }
  
}