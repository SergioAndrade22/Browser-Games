var canvas;
var ctx;
var FPS = 50;

var anchoTablero = 10;
var altoTablero = 16;

var anchoFicha = 40;
var altoFicha = 40;

var anchoCanvas = anchoFicha * anchoTablero;
var altoCanvas = altoFicha * altoTablero;

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
					ctx.fillStyle = '#777777';
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
	pieza.dibuja();
}