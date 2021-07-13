var canvas;
var ctx;
var FPS = 50;

var anchoTablero = 11;
var altoTablero = 20;

var anchoFicha = 40;
var altoFicha = 40;

var margenSuperior = 4;

var anchoCanvas = anchoFicha * anchoTablero;
var altoCanvas = altoFicha * altoTablero;

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
	[1,0,0,0,0,0,0,0,0,0,0,1],
	[1,0,0,0,0,0,0,0,0,0,0,1],
	[1,0,0,0,0,0,0,0,0,0,0,1],
	[1,0,0,0,0,0,0,0,0,0,0,1],
	[1,1,1,1,1,1,1,1,1,1,1,1],
];

// COLORES
var colores = [
	'#FF8C00',
	'#00CED1',
	'#FFD700',
 	'#FF0000',
	'#008000',
	'#0000CD',
	'#800080',
]

var fichaGrafico = [
	[// CUADRADO
		[// POSICIÓN 1
			[0, 0, 0, 0],
			[0, 1, 1, 0],
			[0, 1, 1, 0],
			[0, 0, 0, 0],
		],
		[// POSICIÓN 2
			[0, 0, 0, 0],
			[0, 1, 1, 0],
			[0, 1, 1, 0],
			[0, 0, 0, 0],
		],
		[// POSICIÓN 3
			[0, 0, 0, 0],
			[0, 1, 1, 0],
			[0, 1, 1, 0],
			[0, 0, 0, 0],
		],
		[// POSICIÓN 4
			[0, 0, 0, 0],
			[0, 1, 1, 0],
			[0, 1, 1, 0],
			[0, 0, 0, 0],
		],
	],
	[// VERTICAL
		[// POSICIÓN 1
			[0, 0, 0, 0],
			[2, 2, 2, 2],
			[0, 0, 0, 0],
			[0, 0, 0, 0],
		],
		[// POSICIÓN 2
			[0, 0, 2, 0],
			[0, 0, 2, 0],
			[0, 0, 2, 0],
			[0, 0, 2, 0],
		],
		[// POSICIÓN 3
			[0, 0, 0, 0],
			[2, 2, 2, 2],
			[0, 0, 0, 0],
			[0, 0, 0, 0],
		],
		[// POSICIÓN 4
			[0, 0, 2, 0],
			[0, 0, 2, 0],
			[0, 0, 2, 0],
			[0, 0, 2, 0],
		],
	],
	[// S
		[// POSICIÓN 1
			[0, 0, 0, 0],
			[0, 0, 3, 3],
			[0, 3, 3, 0],
			[0, 0, 0, 0],
		],
		[// POSICIÓN 2
			[0, 0, 3, 0],
			[0, 0, 3, 3],
			[0, 0, 0, 3],
			[0, 0, 0, 0],
		],
		[// POSICIÓN 3
			[0, 0, 0, 0],
			[0, 0, 3, 3],
			[0, 3, 3, 0],
			[0, 0, 0, 0],
		],
		[// POSICIÓN 4
			[0, 0, 3, 0],
			[0, 0, 3, 3],
			[0, 0, 0, 3],
			[0, 0, 0, 0],
		],
	],
	[// Z
		[// POSICIÓN 1
			[0, 0, 0, 0],
			[0, 4, 4, 0],
			[0, 0, 4, 4],
			[0, 0, 0, 0],
		],
		[// POSICIÓN 2
			[0, 0, 0, 4],
			[0, 0, 4, 4],
			[0, 0, 4, 0],
			[0, 0, 0, 0],
		],
		[// POSICIÓN 3
			[0, 0, 0, 0],
			[0, 4, 4, 0],
			[0, 0, 4, 4],
			[0, 0, 0, 0],
		],
		[// POSICIÓN 4
			[0, 0, 0, 4],
			[0, 0, 4, 4],
			[0, 0, 4, 0],
			[0, 0, 0, 0],
		],
	],
	[// L
		[// POSICIÓN 1
			[0, 0, 0, 0],
			[0, 5, 5, 5],
			[0, 5, 0, 0],
			[0, 0, 0, 0],
		],
		[// POSICIÓN 2
			[0, 0, 5, 0],
			[0, 0, 5, 0],
			[0, 0, 5, 5],
			[0, 0, 0, 0],
		],
		[// POSICIÓN 3
			[0, 0, 0, 5],
			[0, 5, 5, 5],
			[0, 0, 0, 0],
			[0, 0, 0, 0],
		],
		[// POSICIÓN 4
			[0, 5, 5, 0],
			[0, 0, 5, 0],
			[0, 0, 5, 0],
			[0, 0, 0, 0],
		],
	],
	[// L INVERTIDA
		[// POSICIÓN 1
			[0, 0, 0, 0],
			[0, 6, 6, 6],
			[0, 0, 0, 6],
			[0, 0, 0, 0],
		],
		[// POSICIÓN 2
			[0, 0, 6, 6],
			[0, 0, 6, 0],
			[0, 0, 6, 0],
			[0, 0, 0, 0],
		],
		[// POSICIÓN 3
			[0, 6, 0, 0],
			[0, 6, 6, 6],
			[0, 0, 0, 0],
			[0, 0, 0, 0],
		],
		[// POSICIÓN 4
			[0, 0, 6, 0],
			[0, 0, 6, 0],
			[0, 6, 6, 0],
			[0, 0, 0, 0],
		],
	],
	[// T
		[// POSICIÓN 1
			[0, 0, 0, 0],
			[0, 7, 7, 7],
			[0, 0, 7, 0],
			[0, 0, 0, 0],
		],
		[// POSICIÓN 2
			[0, 0, 7, 0],
			[0, 0, 7, 7],
			[0, 0, 7, 0],
			[0, 0, 0, 0],
		],
		[// POSICIÓN 3
			[0, 0, 7, 0],
			[0, 7, 7, 7],
			[0, 0, 0, 0],
			[0, 0, 0, 0],
		],
		[// POSICIÓN 4
			[0, 0, 7, 0],
			[0, 7, 7, 0],
			[0, 0, 7, 0],
			[0, 0, 0, 0],
		],
	],
]

var pieza;

var objPieza = function() {
	this.x = 1;
	this.y = 1;

	this.angulo = 0;
	this.tipo = 1;

	this.dibuja = function() {
		for(let py = 0; py < 4; py++) {
			for(let px = 0; px < 4; px++) {
				if (fichaGrafico[this.tipo][this.angulo][py][px] != 0){
					ctx.fillStyle = colores[this.tipo];
					ctx.fillRect((this.x + px) * anchoFicha,  (this.y + py) * altoFicha, anchoFicha, altoFicha);
				}
			}
		}
	}

	this.rotar = function() {
		console.log('rotar');
	}

	this.abajo = function() {
		console.log('abajo');
	}

	this.izquierda = function() {
		console.log('izquierda');
	}

	this.derecha = function() {
		console.log('derecha');
	}
};

function dibujaTablero() {
	for(let py = margenSuperior; py < altoTablero; py++) {
		for(let px = 1; px < anchoTablero; px++) {
			if (tablero[py][px] != 0){
				ctx.fillStyle = colores[tablero[py][px]];
				ctx.fillRect((px-1) * anchoFicha,  (py-margenSuperior) * altoFicha, anchoFicha, altoFicha);
			}
		}
	}
}

function inicializaTeclado() {
	document.addEventListener('keydown', tecla => {
		if (tecla.keyCode == 37) {
			pieza.izquierda();
		}
		if (tecla.keyCode == 38) {
			pieza.rotar();
		}
		if (tecla.keyCode == 39) {
			pieza.derecha();
		}
		if (tecla.keyCode == 40) {
			pieza.abajo();
		}
	});
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
	dibujaTablero();
	pieza.dibuja();
}