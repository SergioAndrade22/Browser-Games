class Graphics {
    constructor(map) {
	  this.canvas = document.getElementById('canvas');
	  this.canvas.style.width = canvasWidth;
	  this.canvas.style.height = canvasHeight;
	  this.ctx = canvas.getContext('2d');
  
      this.tileMap = new Image();
	  this.tileMap.src = 'img/tilemap.png';
	  
	  this.map = map;
	  this.camera = new Camera(this.ctx, this.tileMap, 0, 0, 5, 5, 0, 0);
    }
  
    drawMap() {
      this.camera.draw(this.map);
    }
  
    draw(object) {
      object.updateGraphics();
      this.ctx.drawImage(this.tileMap, object.xTile, object.yTile, imageWidth, imageHeight, cellWidth * object.x, cellHeight * object.y, cellWidth, cellHeight);
    }
  
    refreshCanvas() {
      this.canvas.width = canvasWidth;
      this.canvas.height = canvasHeight;
	}
	
	moveCamera(x, y) {
		this.camera.move(x, y);
	}
}

class Camera {
	constructor(ctx, tileMap, x, y, width, height, canvasX, canvasY) {
		this.ctx = ctx;
		this.tileMap = tileMap;
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
		this.canvasX = canvasX;
		this.canvasY = canvasY;
	}

	draw(map) {
		for(let y = this.y; y < (this.height + this.y - 1); y++){
			for(let x = this.x; x < (this.width + this.x - 1); x++){
			  const tile = map[y][x];
			  // ctx.drawImage(image source, X pixel, Y pixel, X image size, Y image size, where to start draw X, where to start draw Y, size X, size Y)
			  this.ctx.drawImage(this.tileMap, tile*32, 0, imageWidth, imageHeight, cellWidth * (x - this.x + this.canvasX), cellHeight * (y - this.y + this.canvasY), cellWidth, cellHeight);
			}
		}
	}

	move(x, y) {
		this.x = x-1;
		this.y = y-1;
		this.canvasX = x-1;
		this.canvasY = y-1;
	}
}