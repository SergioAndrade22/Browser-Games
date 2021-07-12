class Torch {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    
        this.frame = 0;
        this.frameTracker = 0;
        this.delay = 10;
    
        this.xTileBase = 32;
    
        this.xTile = this.xTileBase;
        this.yTile = 64;
    }
  
    updateFrame() {
        if (this.frame < 3) {
            this.frame++;
        } else {
            this.frame = 0;
        }
        this.xTile = this.xTileBase * this.frame;
    }
  
    updateGraphics() {
        if (this.frameTracker < this.delay) {
            this.frameTracker++;
        } else {
            this.updateFrame();
            this.frameTracker = 0;
        }
    }
}
