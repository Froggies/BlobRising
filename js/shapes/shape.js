(function() {

	"use strict";
	
	app.shapes = app.shapes || {};

	app.shapes.Shape = function() {

		function Shape(x, y, width, height, fill, gradient, color, urlImage, urlPattern, urlSprite) {
			this.x = x;
			this.y = y;
			this.width = width;
			this.height = height;
			this.fill = fill;
			this.gradient = gradient;
			this.color = color;
			this.urlImage = urlImage;
            this.urlPattern = urlPattern;
            this.urlSprite = urlSprite;
		}
        
        Shape.prototype.drawGradient = function(context, linear) {
            var colors; 
            if (linear === true) {
                var gradient=context.createLinearGradient(this.x, this.y, this.x + this.width, this.y);            
                colors = ['rgba(0,0,0,0)',this.color,'rgba(0,0,0,0)'];
            }
            else {      
                var c,c2;     
                if(this.fill === true) {
                    c = this.width/4;
                    c2 = this.width;
                    colors = [this.color,'rgba(0,0,0,0)',this.color];
                }
                else {
                    c = this.width/2;
                    c2 = 0;
                    colors = ['rgba(255,255,255,0)',this.color,'rgba(255,255,255,0)']
                }
                var gradient = context.createRadialGradient(this.x, this.y, c2, this.x, this.y,c);
            }
            gradient.addColorStop("0", colors[0]);
            gradient.addColorStop("0.5", colors[1]);
            gradient.addColorStop("1.0", colors[2]);
            return gradient;
        }
        
        Shape.prototype.drawImage = function(context, physic) {
                var img = new Image();   
                if (app.js.isDefined(this.urlSprite)) {
                    img.src = this.urlSprite;
                    
                    var spriteY = 0;
                    
                    
                    if (physic.angle.elements[0] > -0.25 && physic.angle.elements[0] < 0.25
                     && physic.angle.elements[1] > 0.75) {
                        spriteY = 88;
                    }
                    else if (physic.angle.elements[0] >= 0.25 && physic.angle.elements[0] < 0.75
                     && physic.angle.elements[1] > 0.25 && physic.angle.elements[1] < 0.75) {
                        spriteY = 110;
                    }
                    else if (physic.angle.elements[0] > 0.75
                     && physic.angle.elements[1] > 0.75) {
                        spriteY = 132;
                    }
                    else if (physic.angle.elements[0] >= 0.25 && physic.angle.elements[0] < 0.75
                     && physic.angle.elements[1] > -0.25 && physic.angle.elements[1] < -0.75) {
                        spriteY = 154;
                    }
                    else if (physic.angle.elements[0] > -0.25 && physic.angle.elements[0] < 0.25
                     && physic.angle.elements[1] > -0.75) {
                        spriteY = 0;
                    }
                    else if (physic.angle.elements[0] > -0.25 && physic.angle.elements[0] < -0.75
                     && physic.angle.elements[1] > -0.25 && physic.angle.elements[1] < -0.75) {
                        spriteY = 22;
                    }
                    else if (physic.angle.elements[0] > -0.75
                     && physic.angle.elements[1] > -0.25 && physic.angle.elements[1] < 0.25) {
                        spriteY = 44;
                    }
                    else if (physic.angle.elements[0] > -0.25 && physic.angle.elements[0] < -0.75
                     && physic.angle.elements[1] > 0.25 && physic.angle.elements[1] < 0.75) {
                        spriteY = 66;
                    }
                    console.log("angle : "+physic.angle.elements[0]+" y "+physic.angle.elements[1]);
                    
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
