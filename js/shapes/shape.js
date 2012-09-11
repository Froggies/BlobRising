(function() {

	"use strict";
	
	app.shapes = app.shapes || {};

	app.shapes.Shape = function() {

		function Shape(x, y, width, height, fill, color, urlImage, urlPattern, urlSprite) {
			this.x = x;
			this.y = y;
			this.width = width;
			this.height = height;
			this.fill = fill;
			this.color = color;
			this.urlImage = urlImage;
            this.urlPattern = urlPattern;
            this.urlSprite = urlSprite;
		}
        
        Shape.prototype.drawImage = function(context, physic) {
                var img = new Image();   
                if (app.js.isDefined(this.urlSprite)) {
                    img.src = this.urlSprite;

                    var spriteY = 0;
                    
                    var angleDegres = (physic.radian * 180) / Math.PI;
                    
                    if(angleDegres > 0 && angleDegres <= 45) {
                        spriteY = 132;
                    }
                    else if(angleDegres > 45 && angleDegres <= 90) {
                        spriteY = 154;
                    }
                    else if(angleDegres > 90 && angleDegres <= 135) {
                        spriteY = 0;
                    }
                    else if(angleDegres > 135 && angleDegres <= 180) {
                        spriteY = 22;
                    }
                    else if(angleDegres > 180 && angleDegres <= 225) {
                        spriteY = 44;
                    }
                    else if(angleDegres > 225 && angleDegres <= 270) {
                        spriteY = 66;
                    }
                    else if(angleDegres > 270 && angleDegres <= 315) {
                        spriteY = 88;
                    }
                    else if(angleDegres > 315 && angleDegres <= 360) {
                        spriteY = 110;
                    }
                    
                    context.drawImage(img,0, spriteY, 20, 20, this.x, this.y, this.width, this.height);
                }
                else {
                    img.src = this.urlImage;
                    context.drawImage(img, this.x, this.y, this.width, this.height);
                }
        }
        
 		return Shape;
	}();
})();
