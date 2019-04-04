/*
Create by Learn Web Developement
Youtube channel : https://www.youtube.com/channel/UC8n8ftV94ZU_DJLOLtrpORA
*/

const cvs = document.getElementById("snake");
const ctx = cvs.getContext("2d");

// create the unit
const box = 32;

// load images

const ground = new Image();
ground.src = "img/ground.png";

const foodImg = new Image();
foodImg.src = "img/food.png";


// load audio files

let dead = new Howl({
	src: ['audio/dead.mp3'],
	format: "mp3",
	})
let eat = new Howl({
	src: ['audio/eat.mp3'],
	format: "mp3",
	})
let up = new Howl({
	src: ['audio/up.mp3'],
	format: "mp3",
	})
let right = new Howl({
	src: ['audio/right.mp3'],
	format: "mp3",
	})
let left = new Howl({
	src: ['audio/left.mp3'],
	format: "mp3",
	})
let down = new Howl({
	src: ['audio/down.mp3'],
	format: "mp3",
	})

dead.src = "audio/dead.mp3";
eat.src = "audio/eat.mp3";
up.src = "audio/up.mp3";
right.src = "audio/right.mp3";
left.src = "audio/left.mp3";
down.src = "audio/down.mp3";

// create the snake

let snake = [];

snake[0] = {
    x : 9 * box,
    y : 10 * box
};

// create the food

let food = {
    x : Math.floor(Math.random()*17+1) * box,
    y : Math.floor(Math.random()*15+3) * box
}

// create the score var

let score = 0;

//control the snake

let d;

document.addEventListener("keydown",direction);

function direction(event){
    let key = event.keyCode;
    if( key == 37 && d != "RIGHT"){
        left.play();
        d = "LEFT";
    }else if(key == 38 && d != "DOWN"){
        d = "UP";
        up.play();
    }else if(key == 39 && d != "LEFT"){
        d = "RIGHT";
        right.play();
    }else if(key == 40 && d != "UP"){
        d = "DOWN";
        down.play();
    }
}

// cheack collision function
function collision(head,array){
    for(let i = 0; i < array.length; i++){
        if(head.x == array[i].x && head.y == array[i].y){
            return true;
        }
    }
    return false;
}

// draw everything to the canvas

function draw(){
    
    //ctx.drawImage(ground,0,0);
    ctx.clearRect(0, 0, 19*box, 19*box);
    ctx.fillStyle = "#FFAFFF";
    ctx.fillRect(0,0,18*box,18*box);
    
    ctx.drawImage(foodImg, food.x, food.y);
    
    // old head position
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;
    //left.pos(5*(snakeX-food.x),5*(snakeY-food.y),0)
    left.pos(0,0,0)
    // which direction
    if( d == "LEFT") {
        snakeX -= box,d="";
    }
    if( d == "UP"){
    snakeY -= box,d="";
    }
    if( d == "RIGHT"){
     snakeX += box,d="";
    }
    if( d == "DOWN"){
     snakeY += box,d="";
    }
    if(snakeX<box)snakeX=box,dead.play();
    if(snakeY>17*box)snakeY=17*box,dead.play();
    if(snakeX>17*box)snakeX=17*box,dead.play();
    if(snakeY<3*box)snakeY=3*box,dead.play();
    for( let i = 0; i < snake.length ; i++){
        ctx.fillStyle = ( i == 0 )? "green" : "white";
        ctx.fillRect(snake[i].x,snake[i].y,box,box);
        
        ctx.strokeStyle = "red";
        ctx.strokeRect(snake[i].x,snake[i].y,box,box);
    }
    // if the snake eats the food
    if(snakeX == food.x && snakeY == food.y){
        score++;
        eat.play();
        food = {
            x : Math.floor(Math.random()*17+1) * box,
            y : Math.floor(Math.random()*15+3) * box
        }
        // we don't remove the tail
        //modified to remove tail
        snake.pop()
    }else{
        // remove the tail
        snake.pop();
    }
    
    // add new Head
    
    let newHead = {
        x : snakeX,
        y : snakeY
    }
    
    // game over
    
    if(snakeX < box || snakeX > 17 * box || snakeY < 3*box || snakeY > 17*box || collision(newHead,snake)){
        clearInterval(game);
        dead.play();
    }
    
    snake.unshift(newHead);
    
    ctx.fillStyle = "white";
    ctx.font = "45px Changa one";
    ctx.fillText(score,2*box,1.6*box);
}

// call draw function every 100 ms

let game = setInterval(draw,25);


















