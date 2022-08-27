import Pacman from "./Pacman.js";
import MovingDirection from "./MovingDirection.js";

export default class TileMap {
    constructor(tileSize){
        this.tileSize = tileSize;
        this.wall = this.#image("wall.png")
        this.pacman = this.#image("pacman.png")
        this.dot = this.#image("dot.png")
        this.ghost = this.#image("ghost.png")
    }

    #image(fileName){
        const img = new Image();
        img.src = `images/${fileName}`;
        return img;
    }

    // 1 wall
    // 0 dot
    // 2 pac man
    // 3 enemy
    map = [
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,0,0,0,0,4,0,0,0,0,0,0,0,3,1],
        [1,0,1,1,1,1,1,1,1,1,1,1,1,0,1],
        [1,0,1,0,0,0,0,0,0,0,0,0,0,0,1],
        [1,0,1,0,0,0,0,0,0,0,0,0,0,0,1],
        [1,0,1,0,0,0,0,0,0,0,0,0,0,0,1],
        [1,0,1,0,0,0,0,0,0,0,0,0,0,0,1],
        [1,0,1,0,0,0,0,0,0,0,0,0,0,0,1],
        [1,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
    ];

    draw(canvas, ctx) {
        this.#setCanvasSize(canvas);
        this.#clearCanvas(canvas, ctx);
        this.#drawMap(ctx);
    }
    #drawMap(ctx){
        for(let row = 0; row< this.map.length; row++){
            for(let column = 0; column<this.map[row].length; column++){
                const tile = this.map[row][column];
                let image = null;
                switch(tile){
                    case 1:
                        image = this.wall;
                        break;
                    case 0:
                        image = this.dot;
                        break;
                    case 2:
                        image = this.pacman;
                        break;
                    case 3:
                        image = this.ghost;
                        break;
                }
                if(image !=null)
                ctx.drawImage(image,column * this.tileSize, row*this.tileSize,this.tileSize,this.tileSize)
            }
        }
        
    }

    getPacman(velocity) {
        for(let row = 0; row< this.map.length; row++){
            for(let column = 0; column<this.map[row].length; column++){
                let tile = this.map[row][column];
                if(tile === 4){
                    this.map[row][column] = 0;
                    return new Pacman(
                        column*this.tileSize, 
                        row*this.tileSize, 
                        this.tileSize, 
                        velocity,
                        this)   
                }
            }
    }
}

    #clearCanvas(canvas, ctx){
        ctx.fillstyle = "black";
        ctx.fillRect(0,0,canvas.width,canvas.height);
    }

    #setCanvasSize(canvas){
        canvas.height = this.map.length * this.tileSize;
        canvas.width = this.map[0].length * this.tileSize;
    }
    didCollideWithEnvironment(x,y,direction){
        if(
            Number.isInteger(x/this.tileSize)&& 
            Number.isInteger(y/this.tileSize)
          ){
            let column = 0;
            let row = 0;
            let nextColumn = 0;
            let nextRow =0;

            switch(direction){
                case MovingDirection.right:
                    nextColumn = x + this.tileSize;
                    column = nextColumn/this.tileSize;
                    row = y/this.tileSize;
                    break;
                case MovingDirection.left:
                    nextColumn = x - this.tileSize;
                    column = nextColumn/this.tileSize;
                    row = y/this.tileSize;
                    break;
                case MovingDirection.up:
                    nextRow = y - this.tileSize;
                    row = nextRow/this.tileSize;
                    column = x / this.tileSize;
                    break;
                case MovingDirection.down:
                    nextRow = y + this.tileSize;
                    row = nextRow/this.tileSize;
                    column = x / this.tileSize;
                    break;
            }
            const tile = this.map[row][column];
            if(tile===1){
                return true;
            }
        }
        return false;
    }
}