// package for user input from the console.  https://www.npmjs.com/package/readline-sync
const readline = require('readline-sync');

// ~~~~~~~~~~~~~~~~~
// Global variables
// ~~~~~~~~~~~~~~~~~

// Game Logic variables
let exit = false;
let turnCount = 0;
let diceSize = 3;
let totalPiecesOfMap = 3;

// Player object with some initial variables
let player = {
    username: "",
    hasStick: false,
    pieceOfMap: 0,
    health: 5,
    squirrelsChased: 0,
};


// ~~~~~~~~~~~~~~~~~
// Define functions
// ~~~~~~~~~~~~~~~~~

// Get player name and explain the game
function intro() {
    player.username = readline.question("What is your name? ");
    console.log(`\nWelcome ${player.username}, to the thrilling adventure!`);
    console.log(`Are you able to find the ${totalPiecesOfMap} pieces of the map in order to escape the forest and what lurks in the dark?`);
    console.log("-------------------------------------------------");
}

// Get input from user and branching logic
function makeChoice() {
    // Each choice adds to the turnCount
    turnCount += 1;
    const choice = readline.questionInt(
        "Enter:\n\t1 to search for items,\n\t2 to continue deeper into the forest,\n\t0 to QUIT\n----------------\nYOUR CHOICE: "
    );
    if (choice === 1) {
        // there is a chance that a squirrel will attack you no matter the choice
        if(diceRoll() === 1) {
            squirrelAttack();
        }
        search();
    } else if (choice === 2) {
        // I could DRY this part out, I am repeating "squirrel chance" lines above^ prob make a function...
        if(diceRoll() === 1) {
            squirrelAttack();
        } else {
            console.log(`\nAs you walk through the forest you get the eerie feeling you are not alone 👀`)
        }
    } else if (choice === 0) {
        exit = true;
    }
}

// Look around, player can pick up items based on turn number
function search() {
    if (turnCount % 2) {
        if(player.hasStick) {
            console.log(`\nYou didn't see anything special`);
        } else {
            player.hasStick = true;
            console.log(`\nYou find a big stick and decide to carry it with you.`);
        }
    } else {
        player.pieceOfMap += 1;
        console.log(`\nYou find a piece of paper.  It looks like a part of a map!`);
    }
}

// Used for squirrelAttack and going deeper into forest
function diceRoll() {
    return Math.floor(Math.random() * diceSize) + 1;
}

// Watch out! 😱
function squirrelAttack() {
    console.log(`\nA squirrel jumps out of nowhere and attacks you!`)
    // If player has the stick there is a chance of chasing off the squirrel
    // roll the dice to see if player withstands attack
    if (player.hasStick && diceRoll() === 1) {
        player.squirrelsChased += 1;
        console.log("You are able to chase it off with your stick.");
    } else {
        if(player.hasStick) {
            console.log(`The squirrel was too fast and got past your stick!`);
        }
        player.health -= 1;
        console.log(`\nYour health is now at ${player.health}.`);
    }
}

// Exit game
function exitForest() {
    if(player.pieceOfMap === totalPiecesOfMap) {
        console.log(`\nYou have found all the pieces of the map and made your way out of the forest!`);
    }
    if(player.health === 0) {
        console.log(`\nYou have been bitten by the ware-squirrel and are doomed to spend the rest of your days dreading the full moon!`)
    }
    console.log(`\nThanks for playing, ${player.username}!\n\nHere are your final stats:\n\tPieces of map - ${player.pieceOfMap}\n\tHealth - ${player.health}\n\tSquirrels Chased Away - ${player.squirrelsChased}\n\tNumber of Turns - ${turnCount}`);
}

// Main game
function exploreForest() {
  console.log("\nYou find yourself lost in the middle of a dense forest.");
  console.log("What would you like to do next?\n");
  makeChoice();
}

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// Future feature: make a difficulty level function that adjusts:
// the piecies of map, dice size and health
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~


// Start the game by collecting the player's name and explaining the rules
intro();

// Keep calling the game as long as these conditions are met
    // if exit is false
    // if player health gets to 0 or pieces of map gets to totalPiecesOfMap
while (!exit && player.health > 0 && player.pieceOfMap < totalPiecesOfMap) {
    console.log(player.health, player.pieceOfMap)
    exploreForest();
}

// Give final stats
exitForest();
