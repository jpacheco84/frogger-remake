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
    this.x = 101 * 2;
    this.y = 83 * 5;
    
    this.direction = '';

};

Player.prototype.update = function(dt) {

    
    //move == 'up' ? this.y += this.speed * dt : moving = false;

    
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(dir) {

    this.direction = dir;
   
}


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [];
var randSpeed;
var enemyLanesY = [83, 166, 249];

enemyLanesY.forEach(function (laneY) {
    randSpeed = getRandomInt(2, 10) * 10;
    setTimeout(
        allEnemies.push(new Enemy(randSpeed, laneY)), 500);
});

var player = new Player();
//TODO: Setting the Enemy initial location


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
    prt("Pressed Key: "+allowedKeys[e.keyCode]);

    player.handleInput(allowedKeys[e.keyCode]);
});
