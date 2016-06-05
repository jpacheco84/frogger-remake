// Enemies our player must avoid
var Enemy = function(speed, lane) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.bug_speed = speed;
    this.x = 0;
    this.y = lane;

};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
/*These update methods should focus purely on updating
 * the data/properties related to the object. Do your drawing in your
 * render methods.
*/
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x = this.bug_speed * dt + this.x;
    //TODO: Handle collision with the Player
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(){

    this.sprite = 'images/char-boy.png';
    this.moving = false;
    this.direction = '';
    this.reset = function(){
        this.x = 101 * 2;
        this.y = 83 * 5;

    }

};

Player.prototype.update = function(dt) {

    // if(this.moving){
    //     if(this.y > 415){
    //         prt("y over");
    //     }
    //     if(this.x > 404){
    //         prt("x over");
    //     }    
        
    // }

    // return false;
};

Player.prototype.render = function() {
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

var allEnemies = [];

var Factory = function(){
// Place all enemy objects in an array called allEnemies
    this.create = function(){

        var randSpeed;
        var enemyLanesY = [83, 166, 249];

        enemyLanesY.forEach(function (laneY) {
            randSpeed = getRandomInt(20, 100);
            setTimeout(
                allEnemies.push(new Enemy(randSpeed, laneY)), 500);
            
        });
        this.count++;
    }

    this.count = 0;
}

var enemies = new Factory();
while(enemies.count < 3){
    enemies.create();
}

// Place the player object in a variable called player
var player = new Player();
player.reset();


function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
function prt(exp){
    console.log(exp);
}

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    
    player.handleInput(allowedKeys[e.keyCode]);
});
