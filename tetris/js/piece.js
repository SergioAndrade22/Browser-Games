//OBJETO PIEZA
class Piece {
	x = 4;
	y = 0;

	tipo = 0;		//7 posibilidades (0-6)
	angulo = 0;	//4 posibilidades (0-3)

	retraso = 50;
	fotograma = 0;

	constructor() {
		this.nueva();
	}

	//CREAMOS UNA NUEVA PIEZA ALEATORIA
	nueva() {
		this.tipo = Math.floor((Math.random() * 7));
		this.fotograma = 0;
		this.x = 4;
		this.y = 0;
	}

	colision(anguloNuevo, xNueva, yNueva) {
		for(let py=0;py<4;py++){
			for(let px=0;px<=4;px++){
				if(PIECES[this.tipo][anguloNuevo][py][px]>0){
					if(tablero[yNueva + py][xNueva + px]>0){
						return true;
					}
				}
			}
		}
		return false;
	};

	rotar() {
		let anguloNuevo;
		if(this.angulo < 3)
			anguloNuevo = this.angulo + 1;
		else
			anguloNuevo = 0;

		//SI LA FUNCIÓN DEVUELVE UN VALOR FALSO (NO HAY COLISIÓN, CAMBIAMOS EL ÁNGULO)
		if(!this.colision(anguloNuevo, this.x, this.y)){
			this.angulo = anguloNuevo;
		}
  	}

  	izquierda = () => this.x = this.colision(this.angulo, this.x - 1, this.y) ? this.x : this.x-1;
	  
  	derecha = () => this.x = this.colision(this.angulo, this.x + 1, this.y) ? this.x : this.x + 1;

	abajo = () => this.y = this.colision(this.angulo, this.x, this.y +1) ? this.y : this.y + 1;

	//SI LA FILA 5 TIENE ALGO QUE NO SEA CEROS, TERMINA LA PARTIDA
	compruebaSiPierde() {
		for(let px = 1; px < anchoTablero + 1; px++){
			if(tablero[5][px] > 0){
				return true;
			}
		}
	};

	//COMPROBAMOS SI HAY QUE LIMPIAR ALGUNA FILA
	limpiaFilas() {
		var filaCompleta;
		for(let py = margenSuperior; py < altoTablero; py++){
			filaCompleta = true;	//asumimos que la fila está completa
			for(let px = 1; px <= anchoTablero; px++){
				if(tablero[py][px] == 0){
					filaCompleta = false;
				}
			}

			//SI TRAS REVISAR LA FILA, ESTÁ COMPLETA (NO HAY HUECOS) LA BORRAMOS
			if(filaCompleta == true){
				for(let px = 1; px <= anchoTablero; px++){
					tablero[py][px] = 0;
				}
			}
		}
	};

	//FIJAMOS LA PIEZA AL TABLERO
	fijar() {
		for(let py = 0; py < 4; py++){
			for(let px = 0; px <= 4; px++){
				if(PIECES[this.tipo][this.angulo][py][px] > 0){
					tablero[this.y + py][this.x + px] = PIECES[this.tipo][this.angulo][py][px];
				}
			}
		}
	}

	//FUNCIÓN CAER DE LA PIEZA
	caer() {
		if(this.fotograma >= this.retraso){
			this.fotograma = 0;

			//ANTES DE CAER COMPROBAMOS LA COLISIÓN
			if(!this.colision(this.angulo, this.x, this.y +1)){
				this.y = this.y + 1;
			}
			else{
				this.fijar();		//SI NO PUEDE CAER MÁS, HAY QUE FIJAR LA PIEZA AL TABLERO
				this.nueva();		//RESETEAMOS LA FICHA PARA QUE VUELVA A CAER CON OTRA FORMA
				this.limpiaFilas();	//COMPROBAMOS SI HAY ALGUNA LÍNEA COMPLETA

				if(this.compruebaSiPierde()){
					alert("You lose!");
					reiniciaTablero();
				}
			}
		}
		else{
			this.fotograma++;
		}
	};

	//DIBUJAMOS LA PIEZA EN PANTALLA
	dibuja() {
    	for(let py=0; py < 4; py++){
			for(let px = 0; px <= 4; px++){
				let cellValue = PIECES[this.tipo][this.angulo][py][px];
				if(cellValue > 0){
					ctx.fillStyle = COLORS[cellValue - 1];

					//a this.py le restamos el margen superior para que aparezca en la posición correcta
					ctx.fillRect(((this.x + px - 1)*tamanyoFicha),(((this.y-margenSuperior)+py)*tamanyoFicha),tamanyoFicha,tamanyoFicha);
				}
			}
		}
	};
}