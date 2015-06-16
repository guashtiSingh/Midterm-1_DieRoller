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
    { id: "one", src: "assets/images/one.png" },
    { id: "two", src: "assets/images/two.png" },
    { id: "three", src: "assets/images/three.png" },
    { id: "four", src: "assets/images/four.png" },
    { id: "five", src: "assets/images/five.png" },
    { id: "six", src: "assets/images/six.png" },
    { id: "clicked", src: "assets/audio/clicked.wav" }
];

// Game Variables
var dieLabel: createjs.Text;
var rollButton: createjs.Bitmap;

var rollResult;
var die = "";

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
    for (var roll = 0; roll < 6; roll++) {
        outCome[roll] = Math.floor((Math.random() * 6) + 1);

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
function rollButtonClicked(event: createjs.MouseEvent) {
    createjs.Sound.play("clicked");

    rollResult = roll();
    die = rollResult[0] + " - " + rollResult[1] ;

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
    rollButton.x = 100;
    rollButton.y = 170;
    stage.addChild(rollButton);
    rollButton.on("click", pinkButtonClicked);
    rollButton.on("mouseover", RollButtonOver);
    rollButton.on("mouseout", RollButtonOut);
    rollButton.on("click", rollButtonClicked, this);
}