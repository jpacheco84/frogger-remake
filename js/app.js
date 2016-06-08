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
    
    this.boundingbox = {
       top: 85,// The y-value of the top of the rectangle
       left: 3,// the x-value of the left side of the rectangle
       bottom: 150,// the y-value of the bottom of the rectangle
       right: 98// the x-value of the right side of the rectangle
      
    };

    this.width =  this.boundingbox.right - this.boundingbox.left;
    this.height = this.boundingbox.bottom - this.boundingbox.top;

};

/*These update methods should focus purely on updating
 * the data/properties related to the object. Do your drawing in your
 * render methods.
*/
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x = this.bug_speed * dt + this.x;
    
    if(this.x>505){
       var bug_idx = allEnemies.indexOf(this);
       allEnemies.splice(bug_idx, 1);
    }
    //Handle collision with the Player
    //https://developer.mozilla.org/en-US/docs/Games/Techniques/2D_collision_detection
    if(player.x < this.x + this.width && player.x + player.width > this.x &&
        player.y < this.y + this.height && player.height + player.y > this.y){
        //prt(true);
        player.reset();
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

var Factory = function(){

    this.create = function(){

        var randSpeed;
        var enemyLanesY = [83, 166, 249];

        enemyLanesY.forEach(function (laneY) {
            randSpeed = getRandomInt(20, 100);
            setTimeout(
                allEnemies.push(new Enemy(randSpeed, laneY)), 500);
            randSpeed = '';
        });
        this.count++;
    }

    this.continue = function(){
        //TODO: don't stop producing enemies

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

var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

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
