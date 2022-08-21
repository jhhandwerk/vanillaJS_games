// player
const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
ctx.font = '20px Impact'

var player = {x: 0, y: 0, width: 50, height: 5110}
var rect2 = {x: 150, y: 100, width: 100, height: 100}
var rect3 = {x: 100, y: 340, width: 100, height: 100}

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
        player.x > rect2.x + rect2.width ||
        player.x + player.width < rect2.x ||
        player.y > rect2.y + rect2.height ||
        player.y + player.height < rect2.y
    ){} else if(player.y === rect2.y + rect2.height){
        ctx.fillText("bottom", 150, 90)
        ctx.fillStyle = ("red")
        speedUp = 0;
    } else if(player.y + player.height === rect2.y){
        ctx.fillText("top", 150, 90)
        ctx.fillStyle = ("red")
        speedDown = 0;
    } else if(player.x + player.width === rect2.x){
        ctx.fillText("left", 150, 90)
        ctx.fillStyle = ("red")
        speedRight = 0;
    } else if(player.x === rect2.x + rect2.width){
        ctx.fillText("right", 150, 90)
        ctx.fillStyle = ("red")
        speedLeft = 0;
    }  
    if(
        player.x > rect2.x + rect2.width ||
        player.x + player.width < rect2.x ||
        player.y > rect2.y + rect2.height ||
        player.y + player.height < rect2.y
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
    ctx.fillRect(rect2.x, rect2.y, rect2.width, rect2.height)
    ctx.fillRect(rect3.x, rect3.y, rect3.width, rect3.height)
    ctx.fillStyle = ("blue")
    requestAnimationFrame(animate)
    collideRed()
    collideGreen()

}
animate();





