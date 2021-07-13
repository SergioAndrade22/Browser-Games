var canvas;
var ctx;
var FPS = 50;

//DIMENSIONES DEL CANVAS
var anchoCanvas = 400;
var altoCanvas = 640;

//DIMENSIONES REALES DE CADA CUADRO DEL TABLERO (40x40 pixels)
var tamanyoFicha = 40;

//TABLERO (10x16)
var anchoTablero = 10;
var altoTablero = 20;		//es 20 porque el suelo no se dibuja


var margenSuperior = 4;

//MATRIZ TABLERO (12x21)
//LA MATRIZ ES MAYOR PORQUE AÑADIMOS MÁRGENES PARA LAS COLISIONES
var tablero = [
	[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
	[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
	[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
	[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
	[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
	[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
	[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
	[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
	[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
	[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
	[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
	[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
	[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
	[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
	[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
	[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
	[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
	[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
	[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
	[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
	[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
];

var pieza;
var graphics;

//COPIAMOS EL TABLERO ÍNTEGRO
function reiniciaTablero(){
	for(py = 0; py < 21; py++){
		for(px = 0; px < 12; px++){
			tablero[py][px] = PRISTINE_BOARD[py][px];
		}
	}
}

function inicializaTeclado(){
	//LECTURA DEL TECLADO
	document.addEventListener('keydown',function(tecla){
		if(tecla.keyCode == 37){
			pieza.izquierda();
		}

		if(tecla.keyCode == 38){
			pieza.rotar();
		}

		if(tecla.keyCode == 39){
			pieza.derecha();
		}

		if(tecla.keyCode == 40){
			pieza.abajo();
		}
	});
}

function inicializa(){
	canvas = document.getElementById('canvas');
	document.getElementById('canvas').style.width = anchoCanvas;
	document.getElementById('canvas').style.height = altoCanvas;
	ctx = canvas.getContext('2d');

	//CREAMOS LA PIEZA
	pieza = new Piece();
	graphics = new Graphics();
	
 	inicializaTeclado();
	setInterval(function(){
		graphics.paint();
	},1000/FPS);
}
