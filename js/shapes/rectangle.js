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
			console.log("draw x : : " + this.x);
			console.log("draw y : : " + this.y);
			if (this.fill === true) {
			    context.fillStyle = '#FF33A1';
    			context.fillRect(this.x,this.y,this.width,this.height);
    		}
    		else {
    		    context.strokeStyle = '#01ffdd';
    		    context.strokeRect(this.x,this.y,this.width,this.height);
    		}
		};

		return Rectangle;

	}();
})();

