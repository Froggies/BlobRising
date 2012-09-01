(function() {

	"use strict";
	
	app.shapes = app.shapes || {};

	app.shapes.Shape = function() {

		function Shape(x, y, width, height, fill, gradient, color, urlImage) {
			this.x = x;
			this.y = y;
			this.width = width;
			this.height = height;
			this.fill = fill;
			this.gradient = gradient;
			this.color = color;
			this.urlImage = urlImage;
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
        
        Shape.prototype.drawImage = function(context) {
                var img = new Image();   
                img.src = this.urlImage;
                context.drawImage(img, this.x, this.y, this.width, this.height);
        }
        
 		return Shape;
	}();
})();
