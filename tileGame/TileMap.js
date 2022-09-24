import Pacman from "./Pacman.js";
import move from "./move.js";

export default class TileMap {
    constructor(tileSize){
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
        this.gyoza = this.#image("keyMaster.png")
        this.blob = this.#image("blob.png")
        this.test = this.#image("test.png")
        this.back = this.#image("back.png")
        this.luis = this.#image("luis.png")
        this.d = 0;
        document.addEventListener("keydown", this.#dialogue);
        document.addEventListener("keydown", this.#clearDialogue);
        document.addEventListener("keyup", this.#check);
        document.addEventListener("change", this.#menuFunc);
        document.addEventListener("change", this.#choiceFunc);
        var dialogue = document.getElementById("dialogue");
        var message = document.getElementById("message");
        dialogue.style.display="none"
        message.style.display="none"
        this.input = document.getElementById("input");
        input.style.display="none"
        this.menu = document.getElementById("menu");
        this.choice = document.getElementById("choice");
        choice.style.display="none"
        var map = this.map1;
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

    mCain = ["","my name is Michale Cain.","i talk like this.", "'you were only supposed to blow the bloody...'"]
    tableTalk = ["","I am a table","british philosophers often use me in their examples", "perhaps they use me when they write their books"]
    blue = ["","I am blue","Kermit is green.but I am blue.What color are you?", ]
    blobTalk = ["","I am the blob","...", "...."]
    sPurple = ["","I am slightly purple","perhaps you cannot tell the difference between me and the other blue squares", "but I am different"]
    gyozaTalk = ["","I am gyoza. Enter the code.","I am gyoza. Enter the code.", "I am gyoza. Enter the code."]
    password = ["","Enter the password","", ""]
    luisTalk = ["","Patrick!? is that you??","..."]
    
        map1 = [
            //   0,1,2,3,4,5,6,7,8,9,0,1,2,3,4,5,6,7,8,9 
                [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
                [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
                [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
                [1,0,0,0,0,0,0,0,6,0,0,0,0,0,8,0,0,0,0,1],
                [1,0,0,0,0,0,0,0,0,0,7,7,0,0,0,0,0,0,0,1],
                [1,0,0,0,0,0,0,0,0,0,7,7,0,0,0,0,0,0,9,1],
                [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
                [1,0,0,0,0,4,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
                [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
                [1,0,0,0,0,0,0,0,0,0,0,0,5,0,0,0,0,0,0,1],
                [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
                [1,0,0,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,1],
                [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
                [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
            ]
            map2 = [
        //   0,1,2,3,4,5,6,7,8,9,0,1,2,3,4,5,6,7,8,9 
            [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
            [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
            [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
            [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
            [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
            [1,0,0,0,0,0,0,0,0,0,0,0,10,10,10,0,0,0,0,1],
            [1,11,0,0,0,0,0,0,0,0,0,0,10,10,10,0,0,0,0,1],
            [1,0,0,0,0,0,0,0,0,0,0,0,10,10,10,0,0,0,0,1],
            [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
            [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,12,1],
            [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
            [1,0,0,0,0,0,0,0,0,13,0,0,0,0,0,0,0,0,0,1],
            [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
            [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
            ]

            map3 = [
        //   0,1,2,3,4,5,6,7,8,9,0,1,2,3,4,5,6,7,8,9 
            [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
            [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
            [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
            [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
            [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
            [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
            [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
            [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
            [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
            [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
            [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
            [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
            [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
            [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
            ]

        map = this.map1
      
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
                    case 9:
                        image = this.gyoza;
                        break;
                    case 10:
                        image = this.blob;
                        break;
                    case 11:
                        image = this.back;
                        break;
                    case 12:
                        image = this.test;
                        break;
                    case 13:
                        image = this.luis;
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
                    // dialogue.innerHTML="..."
                    return true;
                }
                if(tile === 4){
                    dialogue.innerHTML =this.blue[this.d]
                    if(this.d == 2){
                    input.style.display="initial"   
                    }
                    if(this.d == 3){
                        dialogue.innerHTML=this.input.value + " is an excellent color!!!"
                    }
                    return true;
                 }
                 if(tile === 5){
                    dialogue.innerHTML=this.sPurple[this.d]
                    return true;
                 }
                 if(this.map[row][column] === 6){
                    return true;
                 }
                 if(tile === 7){
                    dialogue.innerHTML=this.tableTalk[this.d]
                    // this.speaknow("This is a table", 1);    
                    return true;
                 }
                 if(tile === 8){
                    dialogue.innerHTML= this.mCain[this.d] 
                    return true;
                 }
                 if(tile === 9){ 
                    this.map = this.map2
                    return true;
                 }
                 if(tile === 10){
                    dialogue.innerHTML= this.blobTalk[this.d]
                    return true;
                 }
                 if(tile === 11){
                    this.map = this.map1
                    return true;
                 }
                 if(tile === 12){
                    // this.map = this.map1
                    dialogue.innerHTML=this.password[this.d]
                    // i wanna make it so this does not appear until I hit enter...
                    if(this.d == 1){
                        input.style.display="initial" 
                    }  
                    return true;
                 }
                 if(tile === 13){
                    dialogue.innerHTML= this.luisTalk[this.d]
                    if(this.d == 1){
                        choice.style.display="initial"
                    }
                    // if(choice.value == "No, Luis. It's not me, you are mistaken"){
                    //     dialogue.innerHTML="Where did you get that overnight bag!?"
                    // }
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
    }
    #clearDialogue = (event)=> {
        if(event.keyCode == 13){
                if(this.d < this.mCain.length-1){
                    this.d += 1;
                    console.log(this.d)
                }else{
                    dialogue.innerHTML=""
                    this.d = 0;
                }
            input.style="hidden"
        }
    }
    // this checks user input and responds with correct action (switching map)
    #check = (event)=> {
        // map = this.map2
        if(event.keyCode == 13 && this.input.value == "purple"){
            console.log("ok")
            this.map = this.map3
            input.style="hidden"
            message.style.display="initial"
            message.innerHTML="You are stuck here forever!!!<br> Not even Erik Weisz could make it out of here..."
        } 
    }
    #menuFunc = (event)=> {
        if(event.target.value == "dark"){
            this.map = this.map3    
        }
    }
    #choiceFunc = (event)=> {
        if(event.target.value == "no"){
            // this.d = 2;
            // dialogue.innerHTML=this.luisTalk[this.d]   
            window.location.href = "video1.html" 
        }
    }
}
