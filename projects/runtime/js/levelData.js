var makeLevelData = function (window) {
  window.opspark = window.opspark || {};

  window.opspark.makeDataInGame = function (game) {
    // some useful constants
    var groundY = game.groundY;

    // this data will allow us to define all of the
    // behavior of our game

    // TODO 12: change the below data
    var levelData = [
      {
        name: "Robot rampage",
        number: 1,
        speed: -3,
        gameItems: [
          { type: "sawblade", x: 400, y: groundY -30 },//draws sawblade/pizzacutter
          { type: "sawblade", x: 600, y: groundY - 30},
          { type: "sawblade", x: 800, y: groundY - 30},
          { type: "noise", x: 1000, y: groundY - 120}, //draws the noise
          { type: "reward2", x: 1250, y: groundY - 100}, //draws cheeze
          { type: "marker", x: 700, y: groundY - 10},// draws checkpoint
          { type: "reward", x: 600, y: groundY - 100},//draws pepperoni
          
        
        ],
      },
      {
        name: "final sprint",
        number: 2,
        speed: -3,
        gameItems: [
          { type: "sawblade", x: 400, y: groundY },
          { type: "sawblade", x: 800, y: groundY },
          { type: "enemy", x: 700, y: groundY - 30},
          { type: "enemy", x: 800, y: groundY - 30},
          { type: "noise", x: 1000, y: groundY - 120},
          { type: "sawblade", x: 1200, y: groundY },
          { type: "reward2", x: 1900, y: groundY - 30},
          { type: "enemy2", x: 2000, y: groundY - 30},
          { type: "enemy2", x: 2100, y: groundY - 30},
          { type: "enemy2", x: 2200, y: groundY - 30},
          { type: "noise", x: 1800, y: groundY - 20},
          { type: "reward", x: 2900, y: groundY - 20},
          { type: "reward", x: 3000, y: groundY - 20},
          { type: "reward", x: 3100, y: groundY - 20},
          { type: "enemy", x: 3300, y: groundY - 20},
          { type: "enemy", x: 3400, y: groundY - 20},
          { type: "enemy", x: 3500, y: groundY - 20},
          { type: "enemy", x: 3600, y: groundY - 20},
          { type: "reward", x: 3700, y: groundY - 20},
          { type: "reward2", x: 3750, y: groundY - 20},
          { type: "reward", x: 3800, y: groundY - 20},
          { type: "noise", x: 2800, y: groundY - 20},
        ],
      },
    ];
    window.opspark.levelData = levelData;
  };
};

// DON'T REMOVE THIS CODE //////////////////////////////////////////////////////
if (
  typeof process !== "undefined" &&
  typeof process.versions.node !== "undefined"
) {
  // here, export any references you need for tests //
  module.exports = makeLevelData;
}
