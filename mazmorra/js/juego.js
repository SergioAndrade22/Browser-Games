class Game {
  FPS = 50;
  graphics;
  protagonista;
  enemigo = [];
  antorcha;

  escenario = [
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,2,2,0,0,0,2,2,2,2,0,0,2,2,0],
    [0,0,2,2,2,2,2,0,0,2,0,0,2,0,0],
    [0,0,2,0,0,0,2,2,0,2,2,2,2,0,0],
    [0,0,2,2,2,0,0,2,0,0,0,2,0,0,0],
    [0,2,2,0,0,0,0,2,0,0,0,2,0,0,0],
    [0,0,2,0,0,0,2,2,2,0,0,2,2,2,0],
    [0,2,2,2,0,0,2,0,0,0,2,0,0,2,0],
    [0,2,2,2,0,3,2,0,0,2,2,2,2,2,1],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
  ];

  constructor() {
    this.graphics = new Graphics();
  }

  setEnemies() {
    this.enemigo.splice(0);
    this.enemigo.push(new Malo(3,3, this));
    this.enemigo.push(new Malo(9,3, this));
    this.enemigo.push(new Malo(9,8, this));
  }

  checkColision(enemy) {
    this.protagonista.colisionEnemigo(enemy.x, enemy.y);
  }

  inicializa(){
    this.antorcha = new Antorcha(0, 0);
    this.protagonista = new Jugador(1, 1, this);
    this.setEnemies();
  
    document.addEventListener('keydown',(tecla) => {
      const validMoves = [37,38,39,40];
      if (validMoves.includes(tecla.keyCode)) this.protagonista.move(tecla.keyCode)
    });
  
    setInterval(() =>{
      this.principal();
    },1000/this.FPS);
  }

  principal() {
    this.graphics.borraCanvas();
    this.graphics.dibujaEscenario(this.escenario);
    this.graphics.draw(this.protagonista);
    for(let c=0; c < this.enemigo.length; c++) {
      this.enemigo[c].mueve();
      this.checkColision(this.enemigo[c]);
      this.graphics.draw(this.enemigo[c]);
    }
    this.graphics.draw(this.antorcha);
  }
}

class Graphics {
  constructor() {
    this.canvas = document.getElementById('canvas');
    this.ctx = canvas.getContext('2d');

    this.tileMap = new Image();
    this.tileMap.src = 'img/tilemap.png';
    
    this.anchoF = 50;
    this.altoF = 50;

    this.imageWidth = 32;
    this.imageHeight = 32;
  }

  dibujaEscenario(escenario){
    for(let y=0;y<10;y++){
      for(let x=0;x<15;x++){
        const tile = escenario[y][x];
        // ctx.drawImage(image source, X pixel, Y pixel, X image size, Y image size, where to start draw X, where to start draw Y, size X, size Y)
        this.ctx.drawImage(this.tileMap, tile*32, 0, this.imageWidth, this.imageHeight, this.anchoF * x, this.altoF * y, this.anchoF, this.altoF);
      }
    }
  }

  draw(object) {
    object.updateGraphics();
    this.ctx.drawImage(this.tileMap, object.xTile, object.yTile, this.imageWidth, this.imageHeight, this.anchoF * object.x, this.altoF * object.y, this.anchoF, this.altoF);
  }

  borraCanvas(){
    canvas.width=750;
    canvas.height=500;
  }
}

class Antorcha {
  constructor(x, y) {
    this.x = x;
    this.y = y;

    this.fotograma = 0;
    this.contador = 0;
    this.retraso = 10;

    this.xBase = 32;

    this.xTile = this.xBase;
    this.yTile = 64;
  }

  cambiaFotograma() {
    if (this.fotograma < 3) {
      this.fotograma++;
    } else {
      this.fotograma = 0;
    }
    this.xTile = this.xBase * this.fotograma;
  }

  updateGraphics() {
    if (this.contador < this.retraso) {
      this.contador++;
    } else {
      this.cambiaFotograma();
      this.contador = 0;
    }
  }
}

class Malo {
  constructor(x, y, game) {
    this.game = game;
    this.x = x;
    this.y = y;
    this.direccion = Math.floor(Math.random()*4);
    
    this.retraso = 50;
    this.fotograma = 0;

    this.xTile = 0;
    this.yTile = 32;
  }

  compruebaColision(x, y) {
    var colisiona = false;
    if (this.game.escenario[y][x] === 0 || this.game.escenario[y][x] == 1) {
      colisiona = true;
    }
    return colisiona;
  }

  mueve() {
    this.game.checkColision(this.x, this.y);
    if(this.fotograma < this.retraso) {
      this.fotograma++;
    } else {
      this.movement[this.direccion]();
      this.fotograma = 0;
    }
  }

  updateGraphics(){}

  movement = {
    0: () => {
      if (this.compruebaColision(this.x, this.y - 1) == false) {
        this.y--;
        return true;
      } else {
        this.direccion = Math.floor(Math.random() * 4);
      }
    },
    1: () => {
      if (this.compruebaColision(this.x, this.y + 1) == false) {
        this.y++;
        return true;
      } else {
        this.direccion = Math.floor(Math.random()*4);
      }
    },
    2: () => {
      if (this.compruebaColision(this.x - 1, this.y) == false) {
        this.x--;
        return true;
      } else {
        this.direccion = Math.floor(Math.random()*4);
      }
    },
    3: () => {
      if (this.compruebaColision(this.x + 1, this.y) == false) {
        this.x++;
        return true;
      } else {
        this.direccion = Math.floor(Math.random()*4);
      }
    }
  }
}

class Jugador {
  movement = {
    37: () => { if(this.margenes(this.x-1, this.y)==false) this.x-- },
    39: () => { if(this.margenes(this.x+1, this.y)==false) this.x++ },
    38: () => { if(this.margenes(this.x, this.y-1)==false) this.y-- },
    40: () => { if(this.margenes(this.x, this.y+1)==false) this.y++ },
  }

  constructor(x, y, game) {
    this.game = game;
    this.x = x;
    this.y = y;
    this.llave = false;

    this.xTile = 32;
    this.yTile = 32;
  }

  updateGraphics(){}

  colisionEnemigo = (x, y) => { if (this.x == x && this.y == y) this.gameEnd("¡Has Perdido!"); }

  margenes = (x, y) => this.game.escenario[y][x] == 0;

  move(dir) {
    this.movement[dir]();
    this.logicaObjetos();
  }

  logicaObjetos() {
    let objeto = this.game.escenario[this.y][this.x];
    if (objeto === 3) {
      this.llave = true;
      this.game.escenario[this.y][this.x] = 2;
      alert("¡Llave obtenida!");
    } else if (objeto === 1) {
      if (!this.llave) {
        this.x--;
        alert("Necesitas encontrar la llave");
      } else {
        this.gameEnd("¡Has ganado!");
      }
    }
  }

  gameEnd(msg) {
    alert(msg);
    this.x = 1;
    this.y = 1;
    this.llave = false;
    this.game.escenario[8][5] = 3;
    this.game.setEnemies();
  }
}

var game;
function startGame() {
  game = new Game();
  game.inicializa();
}