import TileMap from "./TileMap.js";

const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");
const tileSize = 32;
const velocity = 0;
var loopCondionalVar = 1;
// canvas.width = window.innerWidth;
// canvas.height = window.innerHeight;
// canvas.width = window.innerWidth;
// canvas.height = window.innerHeight;

const tileMap = new TileMap(tileSize);
const pacman = tileMap.getPacman(velocity);
const enemy = tileMap.getEnemy(velocity);
const test = enemy.x;
// const enemy = tileMap.checkForEnemy();
let hasBumped = false
// dialogue.style.display="none"

function gameLoop() {
    tileMap.draw(canvas, ctx);
    pacman.draw(ctx);
    // if(loopCondionalVar == 1){
    if(tileMap.map == tileMap.map1){
        enemy.draw(ctx);
    }
    checkEnemyCollision();    
}
function checkEnemyCollision(){
    if(!hasBumped){
        console.log("no collision. x ="+ test)
        hasBumped = bumped();
        enemy.velocity = 2;
        // pacman.velocity = 2;
    }
    if(hasBumped){
        console.log("You bumped me!")
        enemy.velocity=0;
        pacman.velocity =0;
        hasBumped = bumped();
    }
}
function bumped(){
return enemy.collideWithEnemy(pacman)
}
// the code below is meant to erase the enemy on map change
function checkMap(){

}

const myInterval = setInterval(gameLoop, 1000/40);
function myStop(){
    clearInterval(myInterval);
}
