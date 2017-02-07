// Enemies our player must avoid
var Enemy = function(num, speed, lane) {
    // var obj = Object.create(Enemy.prototype);
    // 

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.bug_speed = speed;
    this.x = -200;
    this.y = lane;
    this.boundingbox = {
       top: 85,// The y-value of the top of the rectangle
       left: 3,// the x-value of the left side of the rectangle
       bottom: 150,// the y-value of the bottom of the rectangle
       right: 98// the x-value of the right side of the rectangle
      
    };
    this.width =  this.boundingbox.right - this.boundingbox.left;
    this.height = this.boundingbox.bottom - this.boundingbox.top;
    this.expired = false;
    this.number = num;

    //return obj;
};
/*These update methods should focus purely on updating
 * the data/properties related to the object. Do your drawing in your
 * render methods.
*/
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    this.x = this.x + this.bug_speed * dt;
    
    if(this.x > ctx.canvas.clientWidth+200){
        this.expired = true;

    }

    //Handle collision with the Player
    //https://developer.mozilla.org/en-US/docs/Games/Techniques/2D_collision_detection
    if(player.x < this.x + this.width && player.x + player.width > this.x &&
        player.y < this.y + this.height && player.height + player.y > this.y){
        prt("GAME OVER");
        game.game_over = true;
        game.gameOver();
        //GAME OVER
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(){

    this.sprite = 'images/char-boy.png';
    this.moving = false;
    this.direction = '';
    
    this.boundingbox = {
       top: 60,// The y-value of the top of the rectangle
       left: 20,// the x-value of the left side of the rectangle
       bottom: 140,// the y-value of the bottom of the rectangle
       right: 90// the x-value of the right side of the rectangle
      
    };

    this.width =  this.boundingbox.right - this.boundingbox.left;
    this.height = this.boundingbox.bottom - this.boundingbox.top;

};

Player.prototype.reset = function(){

    this.x = 101 * 2;
    this.y = 83 * 5;
};

Player.prototype.update = function(dt) {
};

Player.prototype.render = function() {
/*  The canvas drawImage method requires nine parameters. The first parameter is the source image.
    *The next four parameters indicate what part of the source image is used (the clipping box).
    *The final four parameters indicate where on the canvas to start drawing the image and at what size.
    *Here i am using an overload method that receives a url, a posX and posY to place the image
    */
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(dir) {

    this.direction = dir;
    this.moving = true;
    if(dir == 'up'){
        this.y -= 83;
        this.moving = false;
    }
    if(dir =='down'){
        this.y += 83; 
        this.moving = false;
    }
    if(dir =='left'){
        this.x -= 101;
        this.moving = false;
    }
    if(dir =='right'){
        this.x += 101; 
        this.moving = false;
    }

    if(this.y<83){this.reset()}
    if(this.y>415){this.y = 415}
    if(this.x<0){this.x = 0}
    if(this.x>404){this.x = 404}

    prt("x: "+this.x+" y: "+ this.y);
   
}
// Place all enemy objects in an array
var allEnemies = [];


function createEnemy(num){

    var r,
    randSpeed,
    last,
    now,
    enemyLanesY = [83, 166, 249, 332, 415];


    for(var n = 0; n < num; n++){
    
    
        r = getRandomInt(0, 5);
        randSpeed = getRandomInt(20, 100);
        
        //setTimeout(, 1000)
        allEnemies.push(new Enemy(n,randSpeed, enemyLanesY[r]));
    }
}
function resetGame(){
    prt("Time over!");
    allEnemies = [];
    player.reset();
}
function deleteEnemy(num){
    
    allEnemies = [];
    /*for (var i = 0; i < allEnemies.length; i++) {
        find(allEnemies[i].number);
        if(allEnemies[i].expired){
            
            console.log(allEnemies.length);
        }
    }*/
}
function countdown(){
    createEnemy(5);

    var seconds = 10;//GAME TIMER
    function tick() {
        prt(seconds);
        seconds--;
        if( seconds > -1 ) {
            setTimeout(tick, 1000);
        } else {
            resetGame();

        }
    }
    tick();
}
function gameOver(){
    prt("game over");
}

var Game = function(){

    this.enemies = 0;

    this.levelNum = -1;

    this.seconds = 10;

    this.level = [5,10,15,25];

    this.game_over = false;
}    

Game.prototype.createGameLevel = function(){
        allEnemies = [];
        this.levelNum = this.levelNum + 1;

        var ind = this.levelNum;
        player.reset();
        var qt = this.level[ind];

        this.enemies = qt;
        //create enemies * this.enemies
        if(!this.game_over){
            if(qt){
                createEnemy(this.enemies);
                //start countdown
                this.start();
            }else{

                //Won the game
                this.gameOver();
            }
        }
}

Game.prototype.gameOver = function(){

    allEnemies = [];

    if(!this.game_over){
        alert("You Won!?!?");
    }else{
        alert("You Lost!!!!!!!!!!!!!!.................");
        player.reset();
    }
}

Game.prototype.start = function(){

    this.seconds = 10;
    tick();

}

var player = new Player();
player.reset();

var game = new Game();
game.createGameLevel(game);

var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

function tick(){
    game.seconds = game.seconds -1;
                    prt(game.seconds);
    if( game.seconds > 0 ){
        setTimeout(tick, 1000);
    } else {
        //Player survived another level
        //upgrade game level
        game.createGameLevel(game);
    }
}


function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
function prt(exp){
    console.log(exp);
}
/*https://stackoverflow.com/questions/4770025/how-to-disable-scrolling-temporarily
*credit to galambalazs
*22.01.2011
*/
function disableScroll() {
  if(window.addEventListener){
        window.addEventListener('DOMMouseScroll', preventDefault, false);
    }
  window.onwheel = preventDefault; // modern standard
  window.onmousewheel = document.onmousewheel = preventDefault; // older browsers, IE
  window.ontouchmove  = preventDefault; // mobile
  document.onkeydown  = preventDefaultForScrollKeys;

}

function preventDefault(e) {
  e = e || window.event;
  if(e.preventDefault){
      e.preventDefault();
  }
  e.returnValue = false;
}

function preventDefaultForScrollKeys(e) {
    if(allowedKeys[e.keyCode]) {
        preventDefault(e);
        return false;
    }
}

// This listens for key presses and sends the keys to your
// Player.handleInput() method.
document.addEventListener('keyup', function(e) {
    disableScroll();

    player.handleInput(allowedKeys[e.keyCode]);
});