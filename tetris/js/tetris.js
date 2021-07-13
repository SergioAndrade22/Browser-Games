var canvas;
var ctx;
var FPS = 50;

var anchoTablero = 10;
var altoTablero = 16;

var anchoFicha = 40;
var altoFicha = 40;

var anchoCanvas = anchoFicha * anchoTablero;
var altoCanvas = altoFicha * altoTablero;

var pieza;

var objPieza = function() {
	this.x = 0;
	this.y = 0;
};

// Virtual board: (12x17) - Playable Board: (10x16)
var tablero = [
	[1,0,0,0,0,0,0,0,0,0,0,1],
	[1,0,0,0,0,0,0,0,0,0,0,1],
	[1,0,0,0,0,0,0,0,0,0,0,1],
	[1,0,0,0,0,0,0,0,0,0,0,1],
	[1,0,0,0,0,0,0,0,0,0,0,1],
	[1,0,0,0,0,0,0,0,0,0,0,1],
	[1,0,0,0,0,0,0,0,0,0,0,1],
	[1,0,0,0,0,0,0,0,0,0,0,1],
	[1,0,0,0,0,0,0,0,0,0,0,1],
	[1,0,0,0,0,0,0,0,0,0,0,1],
	[1,0,0,0,0,0,0,0,0,0,0,1],
	[1,0,0,0,0,0,0,0,0,0,0,1],
	[1,0,0,0,0,0,0,0,0,0,0,1],
	[1,0,0,0,0,0,0,0,0,0,0,1],
	[1,0,0,0,0,0,0,0,0,0,0,1],
	[1,0,0,0,0,0,0,0,0,0,0,1],
	[1,1,1,1,1,1,1,1,1,1,1,1],
];

function inicializaTeclado() {
	document.addEventListener('keydown', tecla => {
		if (tecla.keyCode == 37) {
			console.log("izquierda")
		}
		if (tecla.keyCode == 38) {
			console.log("arriba")
		}
		if (tecla.keyCode == 39) {
			console.log("derecha")
		}
		if (tecla.keyCode == 40) {
			console.log("abajo")
		}
	})
}

function inicializa() {
	canvas = document.getElementById('canvas');
	ctx = canvas.getContext('2d');

	canvas.width = anchoCanvas;
	canvas.height = altoCanvas;

	pieza = new objPieza();

	inicializaTeclado();

	setInterval(() => principal(), 1000/FPS);
}

function borraCanvas() {
	canvas.width = anchoCanvas;
	canvas.height = altoCanvas;
}

function principal() {
	borraCanvas();
}