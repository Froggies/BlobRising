(function() {

	"use strict";

	var 
		Shape = app.shapes.Shape,
		inherit = app.js.inherit;

	app.shapes.Rectangle = function() {

		inherit(Rectangle, Shape);
		
		var fill;

		function Rectangle() {
			Rectangle.super.constructor.apply(this, arguments);
			this.fill = false;
		};

		Rectangle.prototype.draw = function(context) {
			Rectangle.super.draw.call(this);
			console.log(this.x);
			context.strokeStyle = 'white';
			if (this.fill === true) {
    			context.fillRect(this.x,this.y,this.width,this.height);
    		}
    		else {
    		    context.strokeRect(this.x,this.y,this.width,this.height);
    		}
		};

		return Rectangle;

	}();
})();

