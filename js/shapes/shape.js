(function() {

	"use strict";
	
	app.shapes = app.shapes || {};

	app.shapes.Shape = function() {

		function Shape(x, y, width, height, fill, gradient, color) {
			this.x = x;
			this.y = y;
			this.width = width;
			this.height = height;
			this.fill = fill;
			this.gradient = gradient;
			this.color = color;
			this.center = {};
		}
        
        Shape.prototype.init = function() {
            this.calculCenter();
		}
        
		Shape.prototype.draw = function(context) {
		    this.calculCenter();
		}

        Shape.prototype.calculCenter = function() {
            this.center.x = this.x+(this.width/2);
			this.center.y = this.y+(this.height/2);
        }
        
        Shape.prototype.drawGradient = function(context, linear) {
            if (linear === true) {
                var gradient=context.createLinearGradient(this.x, this.y, this.x + this.width, this.y);            
                gradient.addColorStop("0", 'rgba(0,0,0,0)');
                gradient.addColorStop("0.5", this.color);
                gradient.addColorStop("1", 'rgba(0,0,0,0)');

            }
            else {            
                if(this.fill === true) {
                    var gradient = context.createRadialGradient(this.x, this.y, this.width, this.x, this.y, this.width/4);
                    gradient.addColorStop("0", this.color);
                    gradient.addColorStop("0.5", 'rgba(0,0,0,0)');
                    gradient.addColorStop("1.0", this.color);
                }
                else {
                    var gradient = context.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.width/2);
                    gradient.addColorStop("0", 'rgba(255,255,255,0)');
                    gradient.addColorStop("0.5", this.color);
                    gradient.addColorStop("1", 'rgba(255,255,255,0)');
                }
            }
            return gradient;
        }
        
 		return Shape;
	}();
})();
