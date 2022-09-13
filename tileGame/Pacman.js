import move from "./move.js";
import TileMap from "./TileMap.js";

export default class Pacman{
    constructor(x,y,tileSize, velocity, tileMap, dialogue){
        this.x = x;
        this.y = y;
        this.tileSize = tileSize;
        this.velocity = velocity;
        this.tileMap = tileMap;
        this.currentMovingDirection = null;
        this.go = null;
        this.#loadPacmanImages();
        document.addEventListener("keydown", this.#keydown);
        document.addEventListener("keyup", this.#keyup);
    
        dialogue = document.getElementById("dialogue")

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
        const pacmanimage2 = new Image();
        const pacmanimage3 = new Image();
        pacmanimage1.src = "./images/pinkTile.png"
        pacmanimage2.src = "./images/blackTile.png"

        this.pacmanImages = [
            pacmanimage2,
            pacmanimage1,
        ];
        this.pacmanImageIndex = 0;
    }
    #keydown =(event)=>{
        this.velocity = 4;
        // the chain of if conditions below solved the problem of having the player react to other key input.
        if(event.keyCode!==38&&event.keyCode!==40&&event.keyCode!==37&&event.keyCode!==39)  {
            this.velocity = 0;
        }
         
        // up
        if(event.keyCode == 38){
            // if(this.currentMovingDirection == MovingDirection.down)
            //     this.currentMovingDirection = MovingDirection.up;
            this.go = move.up;
        }
        // down
        if(event.keyCode == 40){
            // if(this.currentMovingDirection == MovingDirection.up)
            //     this.currentMovingDirection = MovingDirection.down;
            this.go = move.down;
        }

        // left
        if(event.keyCode == 37){
            // if(this.currentMovingDirection == MovingDirection.right)
            //     this.currentMovingDirection = MovingDirection.left;
            this.go = move.left;
        }
        // right
        if(event.keyCode == 39){
            // if(this.currentMovingDirection == MovingDirection.left)
            //     this.currentMovingDirection = MovingDirection.right;
            this.go = move.right;
        }
    }


    #keyup =(event)=>{  

        if(event.keyCode==38){
            while(this.y%this.tileSize>0){
                // this.velocity = 1;
                this.y -=1;
            }
                this.velocity = 0;
                console.log("up")
        }
        if(event.keyCode==40){
            while(this.y%this.tileSize>0){
                // this.velocity = 1;
                this.y +=1;
            }
                this.velocity = 0;
                console.log("down")
        }
        if(event.keyCode==37){
            while(this.x%this.tileSize>0){
                this.velocity = 1;
                this.x -=1;
            }
                this.velocity = 0;
                console.log("left")
        }
        if(event.keyCode==39){
            while(this.x%this.tileSize>0){
                this.x +=1;
        }
            this.velocity = 0;
            console.log("right")
        }
        if(event.keyCode==32){
            this.velocity = 0;
            console.log("enter")
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
                // change sprite
                this.pacmanImageIndex = 0;
                this.x -= this.velocity;
                break;
            case move.right:
                this.x +=  this.velocity; 
                // change sprite
                this.pacmanImageIndex = 1;
                break;
            // }

        }
        // console.log(this.x)
        // console.log(this.y)
    }
}
