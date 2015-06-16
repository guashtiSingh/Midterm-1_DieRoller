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
var one: createjs.Bitmap;
var two: createjs.Bitmap;
var three: createjs.Bitmap;
var four: createjs.Bitmap;
var five: createjs.Bitmap;
var six: createjs.Bitmap;

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
    var outCome = [0, 0];
    for (var roll = 0; roll < 6; roll++) {
        outCome[roll] = Math.floor((Math.random() * 6) + 1);
    }
}

    // Callback function that allows me to respond to button click events
    function rollButtonClicked(event: createjs.MouseEvent) {
        createjs.Sound.play("clicked");

        rollResult = roll();
        die = rollResult[0] + " - " + rollResult[1];
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

        one = new createjs.Bitmap(assets.getResult("one"));
        one.regX = one.getBounds().width * 0.5;
        one.regY = one.getBounds().height * 0.5;
        one.x = 100;
        one.y = 100;
        stage.addChild(one);

        two = new createjs.Bitmap(assets.getResult("two"));
        two.regX = two.getBounds().width * 0.5;
        two.regY = two.getBounds().height * 0.5;
        two.x = 100;
        two.y = 100;
        stage.addChild(two);

        three = new createjs.Bitmap(assets.getResult("three"));
        three.regX = three.getBounds().width * 0.5;
        three.regY = three.getBounds().height * 0.5;
        three.x = 100;
        three.y = 100;
        stage.addChild(three);

        four = new createjs.Bitmap(assets.getResult("four"));
        four.regX = four.getBounds().width * 0.5;
        four.regY = four.getBounds().height * 0.5;
        four.x = 100;
        four.y = 100;
        stage.addChild(four);

        five = new createjs.Bitmap(assets.getResult("five"));
        five.regX = five.getBounds().width * 0.5;
        five.regY = five.getBounds().height * 0.5;
        five.x = 100;
        five.y = 100;
        stage.addChild(five);

        six = new createjs.Bitmap(assets.getResult("six"));
        six.regX = one.getBounds().width * 0.5;
        six.regY = one.getBounds().height * 0.5;
        six.x = 100;
        six.y = 100;
        stage.addChild(six);

        rollButton = new createjs.Bitmap(assets.getResult("rollButton"));
        rollButton.x = 200;
        rollButton.y = 100;
        stage.addChild(rollButton);
        rollButton.on("click", pinkButtonClicked);
        rollButton.on("mouseover", RollButtonOver);
        rollButton.on("mouseout", RollButtonOut);
        rollButton.on("click", rollButtonClicked, this);
}