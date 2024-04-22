var runLevels = function (window) {
  window.opspark = window.opspark || {};

  var draw = window.opspark.draw;
  var createjs = window.createjs;
  let currentLevel = 0;

  window.opspark.runLevelInGame = function (game) {
    // some useful constants
    var groundY = game.groundY;

    // this data will allow us to define all of the
    // behavior of our game
    var levelData = window.opspark.levelData;

    // set this to true or false depending on if you want to see hitzones
    game.setDebugMode(true);

    // TODOs 5 through 11 go here
    // BEGIN EDITING YOUR CODE HERE

    
    function createSawBlade(x, y){//creates a pizza cutter
      var hitZoneSize = 25;
      var damageFromObstacle = 10;
      var sawBladeHitZone = game.createObstacle(hitZoneSize, damageFromObstacle);
  
      sawBladeHitZone.x = x;
      sawBladeHitZone.y = y;
      game.addGameItem(sawBladeHitZone);
      var obstacleImage = draw.bitmap("img/pizza cutter.webp");
      sawBladeHitZone.addChild(obstacleImage);
      obstacleImage.scaleX = .35
      obstacleImage.scaleY = .35
      obstacleImage.x =-26
      obstacleImage.y = -25
    }

    function createTheNoise(x, y){
      var hitZoneSize = 25;
      var damageFromObstacle = 1099;
      var sawBladeHitZone = game.createObstacle(hitZoneSize, damageFromObstacle);
  
      sawBladeHitZone.x = x;
      sawBladeHitZone.y = y;
      game.addGameItem(sawBladeHitZone);
      var obstacleImage = draw.bitmap("img/the noise.webp");
      sawBladeHitZone.addChild(obstacleImage);

      obstacleImage.x =-40
      obstacleImage.y = -60
    }





  function createEnemy(x, y){ //creates a potato enemy
    var enemy = game.createGameItem("enemy", 25);
    var redSquare = draw.bitmap('img/potato attack.gif')  // Potato enemy
    redSquare.x = -40;
    redSquare.y = -65;
    enemy.addChild(redSquare);
  
    enemy.x = x;
    enemy.y = y;
    
    game.addGameItem(enemy);
    enemy.velocityX = -3
  
    enemy.onPlayerCollision = function () {
      game.changeIntegrity(-10)
    }
  
    enemy.onProjectileCollision = function (){
      game.increaseScore(100)
      enemy.fadeOut();
    }
  }

  function createEnemy2(x, y){
    var enemy2 = game.createGameItem("enemy", 25);
    var redSquare = draw.bitmap('img/Ufolive.gif') // U.F.Olive
    redSquare.x = -40;
    redSquare.y = -65;
    enemy2.addChild(redSquare);
  
    redSquare.scaleX = 0.3;
    redSquare.scaleY = 0.3;

    enemy2.x = x;
    enemy2.y = y;
    
    game.addGameItem(enemy2);
    enemy2.velocityX = -3
  
    enemy2.onPlayerCollision = function () {
      game.changeIntegrity(-10)
    }
  
    enemy2.onProjectileCollision = function (){
      game.increaseScore(100)
      enemy2.fadeOut();
    }
  }


  function createReward(x, y){
    var reward = game.createGameItem("enemy", 25);
    var blueSquare = draw.bitmap('img/pepperoni.png');
    blueSquare.x = -35;
    blueSquare.y = -35;
    reward.addChild(blueSquare);
  
    reward.x = x;
    reward.y = y;


    blueSquare.scaleX = 0.2;
    blueSquare.scaleY = 0.2;
    
    game.addGameItem(reward);
    reward.velocityX = -3
  
    reward.onPlayerCollision = function () {
      game.changeIntegrity(+10)
      game.increaseScore(+100)
      reward.fadeOut();
    }

    
  
  }

  function createReward2(x, y){ //creates a cute olive
    var reward = game.createGameItem("enemy", 25);
    var blueSquare = draw.bitmap('img/chez.png');
    blueSquare.x = -35;
    blueSquare.y = -25;
    reward.addChild(blueSquare);
  
    reward.x = x;
    reward.y = y;


    blueSquare.scaleX = 0.025;
    blueSquare.scaleY = 0.025;
    
    game.addGameItem(reward);
    reward.velocityX = -3
  
    reward.onPlayerCollision = function () {
      game.changeIntegrity(+10)
      game.increaseScore(+100)
      reward.fadeOut();
    }

    
  
  }

  function createMarker(x, y){ //creates a checkpoint
    var marker = game.createGameItem("enemy", 25);
    var yellowSquare = draw.bitmap('img/checkpoint.png');
    yellowSquare.x = -45;
    yellowSquare.y = -70;
    marker.addChild(yellowSquare);
  
    marker.x = x;
    marker.y = y;
    
    game.addGameItem(marker);
    marker.velocityX = -1
  
    marker.onPlayerCollision = function () {
      startLevel();
    }

  }

    function startLevel() { //whatever info is given in levelData.js is checked every 60 fps in order to call a function corresponding to the data in level data
      // TODO 13 goes below here
      var level = levelData[currentLevel];
      var levelObjects = level.gameItems;
      for(var i = 0; i < levelObjects.length; i++){
        var element = levelObjects[i];
        if(element.type === "sawblade"){
          createSawBlade(element.x, element.y);
        } if(element.type === "enemy"){
          createEnemy(element.x, element.y);
        } if(element.type === "marker"){
          createMarker(element.x, element.y);
        } if(element.type === "enemy2"){
          createEnemy2(element.x, element.y);
        } if(element.type === "noise"){
          createTheNoise(element.x, element.y);
        } if(element.type === "reward"){
          createReward(element.x, element.y);
        } if(element.type === "reward2"){
          createReward2(element.x, element.y);
        }
      }

      //////////////////////////////////////////////
      // DO NOT EDIT CODE BELOW HERE
      //////////////////////////////////////////////
      if (++currentLevel === levelData.length) {
        startLevel = () => {
          console.log("Congratulations!");
        };
      }
    }
    startLevel();
  };
};

// DON'T REMOVE THIS CODE //////////////////////////////////////////////////////
if (
  typeof process !== "undefined" &&
  typeof process.versions.node !== "undefined"
) {
  // here, export any references you need for tests //
  module.exports = runLevels;
}
