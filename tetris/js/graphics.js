class Graphics {
	paint() {
		this.borraCanvas();
		this.dibujaTablero();
		pieza.caer();
		pieza.dibuja();
	}

	borraCanvas(){
		canvas.width = anchoCanvas;
		canvas.height = altoCanvas;
	}

	dibujaTablero(){
		for(let py = margenSuperior; py <= altoTablero; py++){
			for(let px = 1; px <= anchoTablero; px++){
				let cellValue = tablero[py][px];
				if(cellValue >0){
					ctx.fillStyle=COLORS[cellValue-1];

					//A la posición this.py le restamos el margen superior para que dibuje en la zona de la pantalla física que toque
					ctx.fillRect(((px-1)*tamanyoFicha),((py-margenSuperior)*tamanyoFicha),tamanyoFicha,tamanyoFicha);
				}
			}
		}
	}
}
