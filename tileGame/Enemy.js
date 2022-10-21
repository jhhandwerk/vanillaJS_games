import move from "./move.js";
import TileMap from "./TileMap.js";

export default class Enemy{
    constructor(x,y,tileSize, velocity, tileMap, dialogue){
        this.x = x;
        this.y = y;
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
        document.addEventListener("keydown", this.#keydown);
        document.addEventListener("keyup", this.#keyup);
    
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
    #keydown =(event)=>{
        this.velocity = 4;
        this.pacmanImageIndex = 2;
        // the chain of if conditions below solved the problem of having the player react to other key input.
        if(event.keyCode!==38&&event.keyCode!==40&&event.keyCode!==37&&event.keyCode!==39)  {
            this.velocity = 0;
        }
        // up
        if(event.keyCode == 38){
            this.go = move.up;
            this.frameY = 1 
        }
        // down
        if(event.keyCode == 40){
            this.go = move.down;
            this.frameY = 0
        }

        // left
        if(event.keyCode == 37){
            this.go = move.left;
            this.frameY = 3;
        }
        // right
        if(event.keyCode == 39){
            this.go = move.right;
            this.frameY = 2;
        }
    }
    #keyup =(event)=>{  
        if(event.keyCode==38){
            while(this.y%this.tileSize>0){
                this.y -=1;
        }
            this.velocity = 0;
            this.frameX = 0;
            this.frameY = 0;
            this.pacmanImageIndex = 1;

        }
        if(event.keyCode==40){
            while(this.y%this.tileSize>0){
                this.y +=1;
        }
            this.velocity = 0;
            this.frameX = 0;
            this.frameY = 0;
            this.pacmanImageIndex = 0;

        }
        if(event.keyCode==37){
            while(this.x%this.tileSize>0){
                // this.velocity = 1;
                this.x -=1;
        }
            this.velocity = 0;
            this.frameX = 0;
            this.frameY = 3;
        }
        if(event.keyCode==39){
            while(this.x%this.tileSize>0){
                this.x +=1;
        }
            this.velocity = 0;
            this.frameX = 0;
            this.frameY = 2;
        }
        if(event.keyCode==32){
            this.velocity = 0;
            this.frameX = 0;
            this.frameY = 0;
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
    }
}
