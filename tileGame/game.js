import TileMap from "./TileMap.js";

const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");
const tileSize = 40;
const velocity = 0;

const tileMap = new TileMap(tileSize);
const pacman = tileMap.getPacman(velocity);
dialogue.style.display="none"


function gameLoop() {
    tileMap.draw(canvas, ctx);
    pacman.draw(ctx);
}

setInterval(gameLoop, 1000/60);