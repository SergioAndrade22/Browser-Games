class Graphics {
    constructor(map) {
	  this.canvas = document.getElementById('canvas');
	  this.canvas.width = 750;
      this.canvas.height = 500;
	  this.ctx = canvas.getContext('2d');
  
      this.tileMap = new Image();
      this.tileMap.src = 'img/tilemap.png';
      
      this.cellWidth = 50;
      this.cellHeight = 50;
  
      this.imageWidth = 32;
	  this.imageHeight = 32;
	  
	  this.map = map;
    }
  
    drawMap(){
      for(let y=0;y<10;y++){
        for(let x=0;x<15;x++){
          const tile = this.map[y][x];
          // ctx.drawImage(image source, X pixel, Y pixel, X image size, Y image size, where to start draw X, where to start draw Y, size X, size Y)
          this.ctx.drawImage(this.tileMap, tile*32, 0, this.imageWidth, this.imageHeight, this.cellWidth * x, this.cellHeight * y, this.cellWidth, this.cellHeight);
        }
      }
    }
  
    draw(object) {
      object.updateGraphics();
      this.ctx.drawImage(this.tileMap, object.xTile, object.yTile, this.imageWidth, this.imageHeight, this.cellWidth * object.x, this.cellHeight * object.y, this.cellWidth, this.cellHeight);
    }
  
    refreshCanvas(){
      this.canvas.width = 750;
      this.canvas.height = 500;
    }
}