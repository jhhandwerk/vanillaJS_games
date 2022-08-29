import MovingDirection from "./MovingDirection.js";

export default class Pacman{
    constructor(x,y,tileSize, velocity, tileMap){
        this.x = x;
        this.y = y;
        this.tileSize = tileSize;
        this.velocity = velocity;
        this.tileMap = tileMap;
        this.currentMovingDirection = null;
        this.requestedMovingDirection = null;
        this.#loadPacmanImages();
        document.addEventListener("keydown", this.#keydown);
        document.addEventListener("keyup", this.#keyup);
    }
    draw(ctx){
        this.#move();
        ctx.drawImage(
            this.pacmanImages[this.pacmanImageIndex], 
            this.x, 
            this.y, 
            this.tileSize, 
            this.tileSize
        );
    }

    #loadPacmanImages() {
        const pacmanimage1 = new Image();
        pacmanimage1.src = "./images/pacman.png"

        this.pacmanImages = [
            pacmanimage1
        ];
        this.pacmanImageIndex = 0;
    }
    #keydown =(event)=>{
        // up
        if(event.keyCode == 38){
            if(this.currentMovingDirection == MovingDirection.down)
                this.currentMovingDirection = MovingDirection.up;
            this.requestedMovingDirection = MovingDirection.up;
        }
        // down
        if(event.keyCode == 40){
            if(this.currentMovingDirection == MovingDirection.up)
                this.currentMovingDirection = MovingDirection.down;
            this.requestedMovingDirection = MovingDirection.down;
        }

        // left
        if(event.keyCode == 37){
            if(this.currentMovingDirection == MovingDirection.right)
                this.currentMovingDirection = MovingDirection.left;
            this.requestedMovingDirection = MovingDirection.left;
        }
        // right
        if(event.keyCode == 39){
            if(this.currentMovingDirection == MovingDirection.left)
                this.currentMovingDirection = MovingDirection.right;
            this.requestedMovingDirection = MovingDirection.right;
        }
    }
    #keyup =(event)=>{
        if(event.keyCode==38||event.keyCode==40||event.keyCode==37||event.keyCode==39){
            this.velocity = 0;
            // this.requestedMovingDirection = MovingDirection.stop;
        }
    }

    #move() {
        if (this.currentMovingDirection !== this.requestedMovingDirection){
            if(Number.isInteger(this.x/this.tileSize)&&Number.isInteger(this.y/this.tileSize)){
             if(!this.tileMap.didCollideWithEnvironment(this.x,this.y,this.requestedMovingDirection))
                this.currentMovingDirection = this.requestedMovingDirection;
            }
        }
        if(this.tileMap.didCollideWithEnvironment(this.x,this.y,this.currentMovingDirection)){
            return;
        }

        switch (this.currentMovingDirection){
            case MovingDirection.up:
                // this.velocity = 1;
                this.y -= this.velocity;
                break;
            case MovingDirection.down:
                this.y += this.velocity;
                break;
            case MovingDirection.left:
                this.x -= this.velocity;
                break;
            case MovingDirection.right:
                this.x += this.velocity; 
                break;
        }
    } 
}
