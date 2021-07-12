class Player {
    movement = {
      37: () => { if(this.bounds(this.x-1, this.y)==false) this.x-- },
      39: () => { if(this.bounds(this.x+1, this.y)==false) this.x++ },
      38: () => { if(this.bounds(this.x, this.y-1)==false) this.y-- },
      40: () => { if(this.bounds(this.x, this.y+1)==false) this.y++ },
    }
  
    constructor(x, y, game) {
      this.game = game;
      this.x = x;
      this.y = y;
      this.key = false;
  
      this.xTile = 32;
      this.yTile = 32;
    }
  
    updateGraphics(){}
  
    enemyCollision = (x, y) => { if (this.x == x && this.y == y) this.game.gameEnd("You lose!"); }
  
    bounds = (x, y) => this.game.map[y][x] == 0;
  
    move(dir) {
      this.movement[dir]();
      this.checkObjects();
    }
  
    checkObjects() {
      let object = this.game.map[this.y][this.x];
      if (object === 3) {
        this.key = true;
        this.game.map[this.y][this.x] = 2;
        alert("Key found!");
      } else if (object === 1) {
        if (!this.key) {
          this.x--;
          alert("You need to find the key!");
        } else {
          this.game.gameEnd("You win!");
        }
      }
    }
}