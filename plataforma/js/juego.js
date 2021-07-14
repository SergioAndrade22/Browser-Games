var canvas;
var ctx;
var FPS = 50;

var anchoF = 50;
var altoF = 50;

var muro = '#044f14';
var tierra = '#c6892f';

var escenario = [
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,2,2,2,2,2,2,2,2,2,2,2,2,2,0],
  [0,2,2,2,2,2,2,2,2,2,2,2,2,2,0],
  [0,2,2,0,0,2,2,0,0,0,0,2,2,0,0],
  [0,2,2,2,2,2,2,2,2,2,2,2,0,0,0],
  [0,2,2,2,2,2,2,2,2,2,2,0,0,0,0],
  [0,2,2,2,2,2,2,0,2,2,0,0,0,0,0],
  [0,2,2,2,2,2,0,0,0,2,2,2,2,2,0],
  [0,0,0,2,2,0,0,0,0,0,2,2,0,2,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
]

var protagonista;

//clase jugador
var jugador = function() {
	this.x = 100;
	this.y = 100;

	this.vy = 0;
	this.vx = 0;

	this.gravedad = 0.5;
	this.friccion = 0.4;

	this.salto = 10;
	this.velocidad = 3;
	this.velocidadMax = 5;

	this.suelo = false;

	this.pulsaIzquierda = false;
	this.pulsaDerecha = false;

	this.colision = function(x, y) {
		var colisiona = false;
		if (escenario[parseInt(y/altoF)][parseInt(x/anchoF)] == 0) {
			colisiona = true;
		}
		return colisiona;
	}

	this.arriba = function() {
		if (this.suelo) {
			this.vy -= this.salto;
			this.suelo = false;
		}
	}

	this.izquierda = function() {
		this.pulsaIzquierda = true;
	}

	this.derecha = function() {
		this.pulsaDerecha = true;
	}

	this.sueltaIzquierda = function() {
		this.pulsaIzquierda = false;
	}

	this.sueltaDerecha = function() {
		this.pulsaDerecha = false;
	}

	this.correccion = function(lugar) {
		if (lugar == 1) { // ABAJO
			this.y = parseInt(this.y/altoF) * altoF;
		}

		if (lugar == 2) { // ARRIBA
			this.y = parseInt((this.y/altoF) + 1) * altoF;
		}

		if (lugar == 3) { // IZQUIERDA
			this.x = parseInt(this.x/anchoF) * anchoF;
		}

		if (lugar == 4) { //DERECHA
			this.x = parseInt((this.x/anchoF) + 1) * anchoF;
		}
	}

	this.fisica = function() {
		// GRAVEDAD
		if (!this.suelo) {
			this.vy += this.gravedad;
		}

		// MOV HORIZONTAL
		if (this.pulsaDerecha && this.vx < this.velocidadMax) {
			this.vx += this.velocidad;
		}

		if (this.pulsaIzquierda && this.vx > -this.velocidadMax) {
			this.vx -= this.velocidad;
		}

		// FRICCION
		if (this.vx > 0) { // HACIA DERECHA
			this.vx -= this.friccion;

			if (this.vx < 0) {
				this.vx = 0;
			}
		}
		if (this.vx < 0) { // HACIA IZQUIERDA
			this.vx += this.friccion;

			if (this.vx > 0) {
				this.vx = 0;
			}
		}

		// COLISIONES LATERALES
		if (this.vx > 0) { // DERECHA
			if (this.colision(this.x + anchoF + this.vx, this.y + 1) || this.colision(this.x + anchoF + this.vx, this.y + altoF - 1)) {
				if (this.x != parseInt(this.x/anchoF) * anchoF)
					this.correccion(4);
				this.vx = 0;
			}
		}

		if (this.vx < 0) { // IZQUIERDA
			if (this.colision(this.x + this.vx, this.y + 1) || this.colision(this.x + this.vx, this.y + altoF - 1)) {
				if (this.x != parseInt(this.x/anchoF) * anchoF)
					this.correccion(3);
				this.vx = 0;
			}
		}

		// ASIGNA VALORES
		this.y += this.vy;
		this.x += this.vx;

		// COLISION TECHO
		if (this.vy < 0 && (this.colision(this.x + 1, this.y) || this.colision(this.x + anchoF - 1, this.y))) {
			this.vy = 0;
			this.correccion(2);
		}

		// COLISION SUELO
		// if ((colisiona esquina izquierda o colisiona esquina derecha) y está cayendo)
		if ((this.colision(this.x + 1, this.y + altoF) || this.colision(this.x+anchoF - 1, this.y + altoF)) && this.vy >= 0) {
			this.suelo = true;
			this.vy = 0;
			this.correccion(1);
		} else {
			this.suelo = false;
		}
	}

	this.dibuja = function() {
		this.fisica();

		ctx.fillStyle = '#820c01';
		ctx.fillRect(this.x, this.y, anchoF, altoF);
	}
}

function dibujaEscenario(){
  var color;

  for(y=0;y<10;y++){
    for(x=0;x<15;x++){

      if(escenario[y][x]==0)
        color = muro;

      if(escenario[y][x]==2)
        color = tierra;

      ctx.fillStyle = color;
      ctx.fillRect(x*anchoF,y*altoF,anchoF,altoF);
    }
  }
}

function creaBloque(x, y) {
	var xBloque = parseInt(x / anchoF);
	var yBloque = parseInt(y / altoF);
	var colorBloque = escenario[yBloque][xBloque];

	colorBloque = colorBloque == 0 ? 2 : 0;

	escenario[yBloque][xBloque] = colorBloque;
}

function dibujaBloque(x, y) {
	ctx.fillStyle = '#777777';
	ctx.fillRect(parseInt(x / anchoF) * anchoF, parseInt(y / altoF) * altoF, anchoF, altoF);
}

var ratonX = 0;
var ratonY = 0;

function clickRaton(e) {
	console.log("click")
}

function sueltaRaton(e) {
	creaBloque(ratonX, ratonY);
}

function posicionRaton(e) {
	ratonX = e.pageX;
	ratonY = e.pageY;
}

function inicializa(){
  canvas = document.getElementById('canvas');
  ctx = canvas.getContext('2d');

  //CREAMOS AL JUGADOR
  protagonista = new jugador();

  // CONTROL RATON
  canvas.addEventListener('mousedown', clickRaton, false);
  canvas.addEventListener('mouseup', sueltaRaton, false);
  canvas.addEventListener('mousemove', posicionRaton, false);

  //LECTURA DEL TECLADO
  document.addEventListener('keydown',function(tecla){
    if(tecla.keyCode == 38){
      protagonista.arriba();
    }

    if(tecla.keyCode == 37){
      protagonista.izquierda();
    }

    if(tecla.keyCode == 39){
      protagonista.derecha();
    }
  });

  //LECTURA DEL TECLADO
  document.addEventListener('keyup',function(tecla){

    if(tecla.keyCode == 37){
      protagonista.sueltaIzquierda();
    }

    if(tecla.keyCode == 39){
      protagonista.sueltaDerecha();
    }

  });

  setInterval(function(){
    principal();
  },1000/FPS);
}


function borraCanvas(){
  canvas.width=750;
  canvas.height=500;
}


function principal(){
  borraCanvas();
  dibujaEscenario();
  dibujaBloque(ratonX, ratonY);
  protagonista.dibuja();
}
