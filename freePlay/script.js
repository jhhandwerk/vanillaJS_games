// player
const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
ctx.font = '20px Impact'

class Folk {
    constructor(name, x, y, width, height, color){
        this.name = name;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;
    }
}

var player = {x: 0, y: 0, width: 50, height: 50}
var rect3 = {x: 100, y: 340, width: 100, height: 100}
let bob = new Folk("Bob", 300, 200, 30, 30, "black")
let tom = new Folk("Tom", 150, 100, 100, 100, "black")
let jake = new Folk("Jake", 300, 200, 30, 30, "black")

const folksArray = [bob, tom, jake];

// folksArray.forEach(myFunction)
// function myFunction(item, index) {
//     text += index + ": " + item + "<br>"; 
//   }

speedLeft = 5;
speedUp = 5;
speedRight = 5;
speedDown = 5;

document.onkeydown = function (event) {
    if (event.keyCode == 37) {
        // alert("left")
        player.x -= speedLeft;
    }
    if (event.keyCode == 38) {
        // alert("up")
        player.y -= speedUp;
    }
    if (event.keyCode == 39) {
        // alert("right")
        player.x += speedRight;
    }
    if (event.keyCode == 40) {
        // alert("down")
        player.y += speedDown;
    }
}

// red collision. solid
function collideRed(){
    if(
        // player.x > tom.x + tom.width ||
        player.x > folksArray[2].x + folksArray[2].width ||
        player.x + player.width < folksArray[2].x ||
        player.y > folksArray[2].y + folksArray[2].height ||
        player.y + player.height < folksArray[2].y
    ){} else if(player.y === folksArray[2].y + folksArray[2].height){   
        ctx.fillText("bottom", 150, 90)
        ctx.fillStyle = ("red")
        speedUp = 0;
    } else if(player.y + player.height === folksArray[2].y){
        ctx.fillText("top", 150, 90)
        ctx.fillStyle = ("red")
        speedDown = 0;
    } else if(player.x + player.width === folksArray[2].x){
        ctx.fillText("left", 150, 90)
        ctx.fillStyle = ("red")
        speedRight = 0;
    } else if(player.x === folksArray[2].x + folksArray[2].width){
        ctx.fillText("right", 150, 90)
        ctx.fillStyle = ("red")
        speedLeft = 0;
    }  
    if(
        player.x > folksArray[2].x + folksArray[2].width ||
        player.x + player.width < folksArray[2].x ||
        player.y > folksArray[2].y + folksArray[2].height ||
        player.y + player.height < folksArray[2].y
    ){
        speedLeft = 5;
        speedUp = 5;
        speedRight = 5;
        speedDown = 5;
    }
}


    //  green collission. changes colors on collision... not solid
    function collideGreen(){
    if(
        player.x > rect3.x + rect3.width ||
        player.x + player.width < rect3.x ||
        player.y > rect3.y + rect3.height ||
        player.y + player.height < rect3.y
    ){} else {
        ctx.fillStyle = ("green")
    }
}

function animate(){
    ctx.clearRect(0,0,canvas.width, canvas.height);
    ctx.fillRect(player.x, player.y, player.width, player.height)
    ctx.fillRect(rect3.x, rect3.y, rect3.width, rect3.height)
    ctx.fillRect(bob.x, bob.y, bob.width, bob.height)
    ctx.fillRect(tom.x, tom.y, tom.width, tom.height)
    ctx.fillStyle = ("blue")
    requestAnimationFrame(animate)
    collideRed()
    collideGreen()

}
animate();





