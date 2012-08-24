(function() {

	"use strict";

	var 
		Shape = app.shapes.Shape,
		inherit = app.js.inherit;

	app.shapes.Rectangle = function() {

		inherit(Rectangle, Shape);
		
		function Rectangle() {
			Rectangle.parent.constructor.apply(this, arguments);
		};

		Rectangle.prototype.draw = function(context) {
			Rectangle.parent.draw.call(this);
			context.save();
			if (this.fill === true) {
			    if (this.gradient === true) {
			        context.fillStyle = Rectangle.parent.drawGradient.call(this, context, true);
			    }
			    else {
                    context.fillStyle = this.color;
                }
    		    context.fillRect(this.x,this.y,this.width,this.height);
    		}
    		else {
        		if (this.gradient === true) {
			            context.strokeStyle = Rectangle.parent.drawGradient.call(this, context, true);
			    }
			    else {
			        context.strokeStyle = this.color;
			    }
    		    context.strokeRect(this.x,this.y,this.width,this.height);
    		}
    		context.restore();
		};

		return Rectangle;

	}();
})();

