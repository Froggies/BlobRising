(function() {

	"use strict";
	
	app.shapes = app.shapes || {};


	app.shapes.Shape = function() {

		function Shape(x, y, width, height) {
			this.x = x;
			this.y = y;
			this.width = width;
			this.height = height;
			this.center = {};
			this.calculCenter();
		}

		Shape.prototype.draw = function(context) {
		    // console.log("dans draw");
		}

        Shape.prototype.calculCenter = function() {
            this.center.x = this.x+(this.width/2);
			this.center.y = this.y+(this.height/2);
        }

 		return Shape;
	}();
})();
