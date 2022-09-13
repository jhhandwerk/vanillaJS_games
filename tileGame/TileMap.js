import Pacman from "./Pacman.js";
import move from "./move.js";

export default class TileMap {
    constructor(tileSize, t, dialogue, clearDialogue){
        this.tileSize = tileSize;
        this.wall = this.#image("wall.png")
        this.pacman = this.#image("blackTile.png")
        this.dot = this.#image("dot.png")   
        this.ghost = this.#image("ghost.png")
        this.greyTile = this.#image("greyTile.png")
        this.blackTile = this.#image("blackTile.png")
        this.blueTile = this.#image("blueTile.png")
        this.purpleTile = this.#image("purpleTile.png")
        this.pinkTile = this.#image("pinkTile.png")
        this.table = this.#image("table.png")
        this.grass = this.#image("grass.png")
        this.brown = this.#image("brown.png")
        document.addEventListener("keydown", this.#dialogue);
        document.addEventListener("keydown", this.#clearDialogue);
        var dialogue = document.getElementById("dialogue");
        dialogue.style.display="none"

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
    //   0,1,2,3,4,5,6,7,8,9,0,1,2,3,4,5,6,7,8,9 
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
        [1,0,0,0,0,4,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
        [1,0,1,0,0,0,0,0,6,0,0,0,0,0,8,0,0,0,0,1],
        [1,0,1,0,0,0,0,0,0,0,7,7,0,0,0,0,0,0,0,1],
        [1,0,1,0,0,0,0,0,0,0,7,7,0,0,8,0,0,0,0,1],
        [1,0,1,0,0,0,0,0,4,0,0,0,0,0,0,0,0,0,0,1],
        [1,0,1,7,0,4,0,0,0,0,0,5,0,0,0,0,0,0,0,1],
        [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
        [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
        [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
        [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
        [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
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
                        image = this.brown;
                        break;
                    case 0:
                        image = this.grass;
                        break;
                    case 2:
                        image = this.blackTile;
                        break;
                    case 3:
                        image = this.ghost;
                        break;
                    case 4:
                        image = this.blueTile;
                        break;
                    case 5:
                        image = this.purpleTile;
                        break;
                    case 6:
                        image = this.pinkTile;
                        break;
                    case 7:
                        image = this.greyTile;
                        break;
                    case 8:
                        image = this.wall;
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
                if(tile === 6){
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
        if(Number.isInteger(x/this.tileSize)&& Number.isInteger(y/this.tileSize)){  
        // if(x%this.tileSize==0 && y%this.tileSize==0){  
            
            let column = 0; 
            let row = 0;
            let nextColumn = 0;
            let nextRow =0;

            switch(direction){
                case move.right:
                    nextColumn = x + this.tileSize;
                    column = nextColumn/this.tileSize;
                    row = y/this.tileSize;
                    break;
                case move.left:
                    nextColumn = x - this.tileSize;
                    column = nextColumn/this.tileSize;
                    row = y/this.tileSize;
                    break;
                case move.up:
                    nextRow = y - this.tileSize;
                    row = nextRow/this.tileSize;
                    column = x / this.tileSize;
                    break;
                case move.down:
                    nextRow = y + this.tileSize;
                    row = nextRow/this.tileSize;
                    column = x / this.tileSize;
                    break;
            }
                const tile = this.map[row][column];
                if(tile === 1){
                    dialogue.style.display="initial"
                    dialogue.innerHTML="..."
                    return true;
                }
                if(tile === 4){
                    dialogue.innerHTML="man"
                    return true;
                 }
                 if(tile === 5){
                    dialogue.innerHTML="dinga"
                    return true;
                 }
                 if(this.map[row][column] === 6){
                    return true;
                 }
                 if(tile === 7){
                    dialogue.innerHTML="This is a table"
                    this.speaknow("This is a table", 1);    

                    return true;
                 }
                 if(tile === 8){
                    dialogue.innerHTML="my name is Michael Cain"
                    this.speaknow("My name is Michael Cain", 1);   
                    return true;
                 }
            }   
        return false;
    }
    #dialogue = (event) =>{
        // const tile = this.tileMap.map[row][column];
        // if(this.tileMap.didCollideWithEnvironment(this.x,this.y,this.currentMovingDirection)){
            if(event.keyCode == 32) { 
               console.log(69)
            dialogue.style.display="initial"

            }
        // }
    }

    speaknow (something, v){
        var speech = new SpeechSynthesisUtterance();
        speech.rate = v;
        speech.pitch = 1;
        speech.volume = 1;
        speech.voice = speechSynthesis.getVoices()[5];
        speech.text = something;
        speechSynthesis.speak(speech)
        return
    }


    #clearDialogue = (event) =>{
        if(event.keyCode == 13){
            dialogue.innerHTML=""
      }
   }
}
