import TileMap from "./TileMap.js";

const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");
const tileSize = 32;
const velocity = 0;
// canvas.width = window.innerWidth;
// canvas.height = window.innerHeight;
// canvas.width = window.innerWidth;
// canvas.height = window.innerHeight;

const tileMap = new TileMap(tileSize);
const pacman = tileMap.getPacman(velocity);
const enemy = tileMap.getEnemy(velocity);
// dialogue.style.display="none"


function gameLoop() {
    tileMap.draw(canvas, ctx);
    pacman.draw(ctx);
    enemy.draw(ctx);
}

const myInterval = setInterval(gameLoop, 1000/40);

function myStop(){
    clearInterval(myInterval);
}
