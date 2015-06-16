/// <reference path="typings/stats/stats.d.ts" />
/// <reference path="typings/easeljs/easeljs.d.ts" />
/// <reference path="typings/tweenjs/tweenjs.d.ts" />
/// <reference path="typings/soundjs/soundjs.d.ts" />
/// <reference path="typings/preloadjs/preloadjs.d.ts" />


// Game Framework Variables
var canvas = document.getElementById("canvas");
var stage: createjs.Stage;
var stats: Stats;

var assets: createjs.LoadQueue;
var manifest = [
    { id: "rollButton", src: "assets/images/rollButton.png" },
    { id: "clicked", src: "assets/audio/clicked.wav" }
];

var atlas = {
    "images": ["assets/images/atlas.png"],
    "frames": [

        [2, 2, 64, 64],
        [2, 68, 64, 64],
        [2, 134, 64, 64],
        [200, 2, 49, 49],
        [200, 53, 49, 49],
        [200, 104, 49, 49],
    ],
    "animations": {

        "one": [0],
        "two": [1],
        "three": [2],
        "four": [3],
        "five": [4],
        "six": [5],
    }
};

// Game Variables
var die1Label: createjs.Text; // create a reference
var die2Label: createjs.Text;
var textureAtlas: createjs.SpriteSheet;
var rollButton: createjs.Bitmap;

var spinResult;
var die = "";

var one = 0;

// Preloader Function
function preload() {
    assets = new createjs.LoadQueue();
    assets.installPlugin(createjs.Sound);
    // event listener triggers when assets are completely loaded
    assets.on("complete", init, this); 
    assets.loadManifest(manifest);
    //Setup statistics object
    setupStats();
}

// Callback function that initializes game objects
function init() {
    stage = new createjs.Stage(canvas); // reference to the stage
    stage.enableMouseOver(20);
    createjs.Ticker.setFPS(60); // framerate 60 fps for the game
    // event listener triggers 60 times every second
    createjs.Ticker.on("tick", gameLoop); 

    // calling main game function
    main();
}

// function to setup stat counting
function setupStats() {
    stats = new Stats();
    stats.setMode(0); // set to fps

    // align bottom-right
    stats.domElement.style.position = 'absolute';
    stats.domElement.style.left = '330px';
    stats.domElement.style.top = '10px';

    document.body.appendChild(stats.domElement);
}


// Callback function that creates our Main Game Loop - refreshed 60 fps
function gameLoop() {
    stats.begin(); // Begin measuring

    stage.update();

    stats.end(); // end measuring
}

// Callback function that allows me to respond to button click events
function pinkButtonClicked(event: createjs.MouseEvent) {
    createjs.Sound.play("clicked");
}

function checkRange(value, lowerBounds, upperBounds) {
    if (value >= lowerBounds && value <= upperBounds) {
        return value;
    }
    else {
        return !value;
    }
}

function roll() {
    var dieLine = [" ", " "];
    var outCome = [0,0];
    for (var roll = 0; roll < 3; roll++) {
        outCome[roll] = Math.floor((Math.random() * 6));

        switch (outCome[roll]) {
            case checkRange(outCome[roll], 1, 27):
                dieLine[roll] = "one";
                break;
            case checkRange(outCome[roll], 28, 27):
                dieLine[roll] = "two";
                break;
            case checkRange(outCome[roll], 38, 46):
                dieLine[roll] = "three";
                break;
            case checkRange(outCome[roll], 47, 54):
                dieLine[roll] = "four";
                break;
            case checkRange(outCome[roll], 55, 59):
                dieLine[roll] = "five";
                break;
            case checkRange(outCome[roll], 60, 62):
                dieLine[roll] = "six";
                break;
        }
    }
    return dieLine;
}

// Callback function that allows me to respond to button click events
function spinButtonClicked(event: createjs.MouseEvent) {
    createjs.Sound.play("clicked");

    spinResult = roll();
    die = spinResult[0] + " - " + spinResult[1] ;

    console.log(die);
}

// Mouseover event
function RollButtonOver() {
    rollButton.alpha = 0.8;
}

// Mouseout event
function RollButtonOut() {
    rollButton.alpha = 1.0;
}

// Our Main Game Function
function main() {
    console.log("Game is Running");



    rollButton = new createjs.Bitmap(assets.getResult("rollButton"));
    rollButton.regX = rollButton.getBounds().width * 0.5;
    rollButton.regY = rollButton.getBounds().height * 0.5;
    rollButton.x = 160;
    rollButton.y = 270;
    stage.addChild(rollButton);
    rollButton.on("click", pinkButtonClicked);
    rollButton.on("mouseover", RollButtonOver);
    rollButton.on("mouseout", RollButtonOut);
}