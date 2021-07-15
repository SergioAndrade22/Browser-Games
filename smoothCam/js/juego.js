var canvas;
var ctx;
var FPS = 80;

var anchoF = 32;
var altoF = 32;



//PARA LA CÁMARA
var anchoEscenario = 25;
var altoEscenario = 20;


var muro = '#044f14';
var puerta = '#3a1700';
var tierra = '#c6892f';
var llave = '#c6bc00';


var imgTilemap;


var escenario = [
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,2,2,0,0,0,2,2,2,2,0,0,2,2,2,2,2,2,2,2,2,2,2,2,0],
  [0,0,2,2,2,2,2,2,0,2,0,0,2,2,0,0,0,2,0,0,2,0,0,0,0],
  [0,0,2,0,0,2,2,2,0,2,2,2,2,2,0,0,0,0,0,0,2,2,2,0,0],
  [0,0,2,2,2,0,2,2,0,0,2,2,2,0,0,0,2,2,2,2,2,0,2,0,0],
  [0,2,2,0,0,0,0,2,0,0,0,2,0,0,0,0,2,0,0,2,0,0,2,0,0],
  [0,0,2,0,0,0,2,2,2,0,0,2,2,2,0,0,2,0,0,0,0,0,2,0,0],
  [0,2,2,2,0,0,2,0,0,2,2,2,2,2,2,2,2,0,0,2,2,0,2,0,0],
  [0,2,2,3,0,0,2,0,0,1,2,2,2,2,0,0,0,0,2,2,2,2,2,0,0],
  [0,2,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,0,2,0,0,0],
  [0,2,2,2,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,0,2,0,0,0],
  [0,2,0,2,2,2,0,0,0,0,0,2,2,2,2,0,0,0,0,0,2,2,2,0,0],
  [0,2,0,2,2,2,0,0,0,0,0,2,0,0,2,0,0,0,0,0,2,2,2,0,0],
  [0,2,0,0,0,2,0,0,0,0,0,2,0,0,2,0,0,0,0,0,0,2,0,0,0],
  [0,2,0,0,0,2,0,0,0,0,0,2,0,0,2,2,0,0,2,0,0,2,0,0,0],
  [0,2,2,2,0,2,0,0,0,0,0,2,0,0,2,2,0,0,2,0,0,2,0,0,0],
  [0,2,0,2,0,0,0,0,0,0,0,2,0,0,2,2,0,0,2,0,0,2,0,0,0],
  [0,0,0,2,0,0,0,0,0,0,0,2,0,0,0,2,2,2,2,0,0,2,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
];




//----------------------------------------------
//ancho: anchura de la cámara
//alto: altura de la cámara
//tableroX: coordenadas x de la cámara
//tableroY: coordenadas y de la cámara
//pantallaX: coordenadasX dentro de la pantalla física
//pantallaY: coordenadasY dentro de la pantalla física


var camaraObj = function(ancho,alto,tableroX,tableroY,pantallaX,pantallaY){
  this.anchoCamara = ancho;
  this.altoCamara = alto;

  this.posX = tableroX;
  this.posY = tableroY;

  //Margenes en pixels, para hacer la animación fluida
  this.margenX = 0;
  this.margenY = 0;

  this.pantallaX = pantallaX;
  this.pantallaY = pantallaY;

  this.dibuja = function(){
    var textura;

    for(y=this.posY;y<(this.posY + this.altoCamara + 1);y++){
      for(x=this.posX;x<(this.posX + this.anchoCamara + 1);x++){
        textura = escenario[y][x];


        //CENTRO DE LA CÁMARA (SIN RECORTES)
        if(y!=this.posY && y!= (this.posY + this.altoCamara)  && x!= this.posX && x!= (this.posX + this.anchoCamara)){
          ctx.drawImage(imgTilemap,textura*anchoF,0,anchoF,altoF,((this.pantallaX + x - this.posX)*anchoF - this.margenX),((this.pantallaY + y - this.posY)*altoF-this.margenY),anchoF,altoF);
        }

        //FILA SUPERIOR (sin esquinas)
        if(y==this.posY && x!= this.posX && x!= (this.posX + this.anchoCamara)){
          ctx.drawImage(imgTilemap,(textura*anchoF),this.margenY,anchoF,(altoF-this.margenY),((this.pantallaX + x - this.posX)*anchoF - this.margenX),(this.pantallaY + y - this.posY)*altoF,anchoF,(altoF - this.margenY));
        }

        //FILA INFERIOR (sin esquinas)
        if(y==(this.posY + this.altoCamara) && x!= this.posX && x!= (this.posX + this.anchoCamara)){
          ctx.drawImage(imgTilemap,(textura*anchoF),0,anchoF,this.margenY,((this.pantallaX + x - this.posX)*anchoF - this.margenX),((this.pantallaY + y - this.posY)*altoF-this.margenY),anchoF,(altoF - (altoF - this.margenY)));
        }

        //COLUMNA IZQUIERDA (sin esquinas)
        if(x==this.posX && y!=this.posY && y!= (this.posY + this.altoCamara)){
          ctx.drawImage(imgTilemap,((textura*anchoF)+this.margenX),0,(anchoF-this.margenX),altoF,((this.pantallaX + x - this.posX)*anchoF),((this.pantallaY + y - this.posY)*altoF-this.margenY),(anchoF - this.margenX),altoF);
        }

        //COLUMNA DERECHA (sin esquinas)
        if(x==(this.posX + this.anchoCamara) && y!=this.posY && y!= (this.posY + this.altoCamara)){
          ctx.drawImage(imgTilemap,(textura*anchoF),0,this.margenX,altoF,((this.pantallaX + x - this.posX)*anchoF - this.margenX),((this.pantallaY + y - this.posY)*altoF-this.margenY),this.margenX,altoF);
        }

        //FILA SUPERIOR + COLUMNA IZQUIERDA
        if(x==this.posX && y== this.posY){
          ctx.drawImage(imgTilemap,((textura*anchoF)+this.margenX),this.margenY,(anchoF-this.margenX),(altoF-this.margenY),((this.pantallaX + x - this.posX)*anchoF),(this.pantallaY + y - this.posY)*altoF,(anchoF - this.margenX),(altoF - this.margenY));
        }

        //FILA INFERIOR + COLUMNA IZQUIERDA
        if(x==this.posX && y==(this.posY + this.altoCamara)){
          ctx.drawImage(imgTilemap,((textura*anchoF)+this.margenX),0,(anchoF-this.margenX),this.margenY,((this.pantallaX + x - this.posX)*anchoF),((this.pantallaY + y - this.posY)*altoF-this.margenY),(anchoF - this.margenX),(altoF - (altoF - this.margenY)));
        }

        //FILA SUPERIOR + COLUMNA DERECHA
        if(x==(this.posX + this.anchoCamara) && y==this.posY){
          ctx.drawImage(imgTilemap,(textura*anchoF),this.margenY,this.margenX,(altoF-this.margenY),((this.pantallaX + x - this.posX)*anchoF - this.margenX),(this.pantallaY + y - this.posY)*altoF,this.margenX,(altoF - this.margenY));
        }


        //FILA INFERIOR + COLUMNA DERECHA
        if(x==(this.posX + this.anchoCamara) && y==(this.posY + this.altoCamara)){
          ctx.drawImage(imgTilemap,(textura*anchoF),0,this.margenX,this.margenY,((this.pantallaX + x - this.posX)*anchoF - this.margenX),((this.pantallaY + y - this.posY)*altoF-this.margenY),this.margenX,(altoF - (altoF - this.margenY)));
        }



      }
    }

  }


  this.arriba = function(velocidad){
    if(this.posY > -1){
      if(this.margenY > 0){
        this.margenY -= velocidad;
      }
      else{

        if(this.posY >0){
          this.margenY = altoF;
          this.posY--;
        }


      }
    }
  }



  this.abajo = function(velocidad){

    if(this.posY < altoEscenario - this.altoCamara - 1){
      if(this.margenY < altoF){
        this.margenY += velocidad;
      }
      else{
        this.margenY=0;
        this.posY++;
      }
    }
  }



  this.derecha = function(velocidad){
    if(this.posX < anchoEscenario - this.anchoCamara - 1){
      if(this.margenX < anchoF){
        this.margenX += velocidad;
      }
      else{
        this.margenX=0;
        this.posX++;
      }
    }
  }



  this.izquierda = function(velocidad){
    if(this.posX > -1){
      if(this.margenX > 0){
        this.margenX -= velocidad;
      }
      else{

        if(this.posX >0){
          this.margenX = altoF;
          this.posX--;
        }


      }

    }
  }



}

//----------------------------------------------




var camara;
var camara2;




function inicializa(){
  canvas = document.getElementById('canvas');
  ctx = canvas.getContext('2d');

  //CARGAMOS LA IMAGEN DEL TILEMAP
  imgTilemap = new Image();
  imgTilemap.src = 'img/tilemap.png';


  camara = new camaraObj(10,10,0,0,1,1);
  //camara2 = new camaraObj(5,5,3,3,7,1);


  //LECTURA DEL TECLADO
  document.addEventListener('keydown',function(tecla){

    var velocidadMovimiento = 4;


    if(tecla.keyCode == 38){
      camara.arriba(velocidadMovimiento);
    }

    if(tecla.keyCode == 40){
      camara.abajo(velocidadMovimiento);
    }

    if(tecla.keyCode == 37){
      camara.izquierda(velocidadMovimiento);
    }

    if(tecla.keyCode == 39){
      camara.derecha(velocidadMovimiento);
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
  camara.dibuja();
  //camara2.dibuja();


}
