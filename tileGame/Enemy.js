import move from "./move.js";
import TileMap from "./TileMap.js";

export default class Enemy{
    constructor(x,y,tileSize, velocity, tileMap, dialogue){
        this.x = x;
        this.y = y;
        // const tileMap = new TileMap();
        this.tileSize = tileSize;
        this.velocity = velocity;
        this.tileMap = tileMap;
        this.currentMovingDirection = null;
        this.go = null;
        this.#loadPacmanImages();
        // this.animationTimer = 10;
        this.i;
        // animation variables
        this.spriteWidth = 32;
        this.spriteHeight = 32;
        this.frameX = 0;
        this.frameY = 0;
        this.gameFrame = 0;
        this.staggerFrames = 6;
        // number of frames of the sprite sheet↓
        this.numFrames = 1;
        // hard coded movement values
        // this.velocity = 4;
        this.pacmanImageIndex = 2;
        this.velocity = 2;
        this.go = move.left;
        this.frameY= 3;
        // document.addEventListener("keydown", this.#keydown);
        // document.addEventListener("keyup", this.#keyup);
    
        // dialogue = document.getElementById("dialogue")
    }
    // draw(ctx)(image, sx, sy, sw, sh, dx, dy, dw, dh)
    draw(ctx){
        this.#move();
        ctx.drawImage(
            // this.pacmanImages[this.pacmanImageIndex], this.x, this.y, this.tileSize, this.tileSize
            this.pacmanImages[this.pacmanImageIndex], this.spriteWidth*this.frameX,this.spriteHeight*this.frameY,this.spriteWidth,this.spriteHeight,this.x,this.y, this.tileSize, this.tileSize);
            if(this.gameFrame % this.staggerFrames == 0){
                if(this.frameX <this.numFrames) this.frameX++;
                else this.frameX = 0;
            }
            this.gameFrame++;
    }

    collideWithEnemy(pacman){
        const size = this.tileSize /2;
        if(this.x < pacman.x + size &&
           this.x + size > pacman.x &&
           this.y < pacman.y + size &&
           this.y + size > pacman.y){
            //    console.log("Hey, you bumped me!!!!!!!!!!!!!!" +pacman.x)
               return true;
           }
           else{
               return false
           }
    }

    #loadPacmanImages() {
        const pacmanimage1 = new Image();
        const pacmanimage2 = new Image();
        const pacmanimage6 = new Image();
        pacmanimage1.src = "./images/front-sheet.png"
        pacmanimage2.src = "./images/back-Sheet.png"
        pacmanimage6.src = "./images/testSprite-Sheet.png"
        // pacmanimage1.src = "./images/pinkTile.png"
        // pacmanimage2.src = "./images/pinkTile.png"
        // pacmanimage6.src = "./images/pinkTile.png"
        this.pacmanImages = [
            pacmanimage1,
            pacmanimage2,
            pacmanimage6,
        ];
        this.pacmanImageIndex = 2;
    }
    changeMovement(){
        if(this.x < 50){
        this.go = move.right;
        }
        if(this.x > 200){
            this.go = move.left;
            }
    }

    #move() {
        if (this.currentMovingDirection !== this.go){
            if(Number.isInteger(this.x/this.tileSize)&&Number.isInteger(this.y/this.tileSize)){
             if(!this.tileMap.didCollideWithEnvironment(this.x,this.y,this.go))
                this.currentMovingDirection = this.go;
            }
        }
        if(this.tileMap.didCollideWithEnvironment(this.x,this.y,this.currentMovingDirection)){                                          
            return;
        }
        // if(this.x < 33){
        // this.go = move.right;
        // }
        this.changeMovement()
        switch (this.currentMovingDirection){
            case move.up:
                this.y -= this.velocity;
                break;
            case move.down:
                this.y += this.velocity;
                break;
            case move.left:
                this.x -= this.velocity;
                break;
            case move.right:
                this.x +=  this.velocity; 
                break;
            // }

        }
        // console.log(this.x)
    }
}
