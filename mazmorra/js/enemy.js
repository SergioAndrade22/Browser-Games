class Enemy {
    constructor(x, y, game) {
      this.game = game;
      this.x = x;
      this.y = y;
      this.direction = Math.floor(Math.random()*4);
      
      this.delay = 50;
      this.frame = 0;
  
      this.xTile = 0;
      this.yTile = 32;
    }
  
    checkCollision = (x, y) => this.game.map[y][x] === 0 || this.game.map[y][x] == 1;
  
    mueve() {
      this.game.checkCollision(this.x, this.y);
      if(this.frame < this.delay) {
        this.frame++;
      } else {
        this.movement[this.direction]();
        this.frame = 0;
      }
    }
  
    updateGraphics(){}
  
    movement = {
      0: () => {
        if (this.checkCollision(this.x, this.y - 1) == false) {
          this.y--;
          return true;
        } else {
          this.direction = Math.floor(Math.random() * 4);
        }
      },
      1: () => {
        if (this.checkCollision(this.x, this.y + 1) == false) {
          this.y++;
          return true;
        } else {
          this.direction = Math.floor(Math.random()*4);
        }
      },
      2: () => {
        if (this.checkCollision(this.x - 1, this.y) == false) {
          this.x--;
          return true;
        } else {
          this.direction = Math.floor(Math.random()*4);
        }
      },
      3: () => {
        if (this.checkCollision(this.x + 1, this.y) == false) {
          this.x++;
          return true;
        } else {
          this.direction = Math.floor(Math.random()*4);
        }
      }
    }
  }