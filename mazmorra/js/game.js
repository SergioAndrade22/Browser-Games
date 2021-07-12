class Game {
    FPS = 50;
    graphics;
    player;
    enemies = [];
	torch;
	mainloop;

    map = [
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,2,2,0,0,0,2,2,2,2,0,0,2,2,0],
        [0,0,2,2,2,2,2,0,0,2,0,0,2,0,0],
        [0,0,2,0,0,0,2,2,0,2,2,2,2,0,0],
        [0,0,2,2,2,0,0,2,0,0,0,2,0,0,0],
        [0,2,2,0,0,0,0,2,0,0,0,2,0,0,0],
        [0,0,2,0,0,0,2,2,2,0,0,2,2,2,0],
        [0,2,2,2,0,0,2,0,2,0,2,0,0,2,0],
        [0,2,2,2,0,3,2,0,2,2,2,2,2,2,1],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
    ];

    constructor() {
        this.graphics = new Graphics();
    }

    setEnemies() {
        this.enemies.splice(0);
        this.enemies.push(new Enemy(3,4, this));
        this.enemies.push(new Enemy(9,3, this));
        this.enemies.push(new Enemy(9,8, this));
    }

    checkCollision(enemy) {
        this.player.enemyCollision(enemy.x, enemy.y);
    }

    inicializa(){
        this.torch = new Torch(0, 0);
        this.player = new Player(1, 1, this);
        this.setEnemies();
      
        document.addEventListener('keydown',(tecla) => {
            const validMoves = [37,38,39,40];
			if (validMoves.includes(tecla.keyCode)) this.player.move(tecla.keyCode);
			else if (tecla.keyCode == 27) {
				clearInterval(this.mainloop);
				document.querySelector('#cover').style.visibility = 'visible';
			}
        });
    
        this.mainloop = setInterval(() =>{
            this.principal();
        },1000/this.FPS);
    }

  	principal() {
		this.graphics.refreshCanvas();
		this.graphics.drawMap(this.map);
		this.graphics.draw(this.player);
		for(let c=0; c < this.enemies.length; c++) {
			this.enemies[c].mueve();
			this.checkCollision(this.enemies[c]);
			this.graphics.draw(this.enemies[c]);
		}
		this.graphics.draw(this.torch);
  	}

    gameEnd(msg) {
        alert(msg);
        this.player.x = 1;
        this.player.y = 1;
        this.player.key = false;
        this.map[8][5] = 3;
        this.setEnemies();
	}
	
	unPause() {
		this.mainloop = setInterval(() => {
            this.principal();
        },1000/this.FPS);
	}
}

var game;
function startGame() {
    game = new Game();
    game.inicializa();
}

function unPause() {
	game.unPause();
	document.querySelector('#cover').style.visibility = 'hidden';
}