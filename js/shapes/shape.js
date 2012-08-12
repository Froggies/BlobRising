(function() {

	"use strict";
	
	app.shapes = app.shapes || {};


	app.shapes.Shape = function() {

		var x;
        var y;
        var width;
        var height;
        var center;        

		function Shape() {
			this.x = 0;
			this.y = 0;
			this.width = 0;
			this.height = 0;
			this.center = {};
			Shape.prototype.calculCenter.call(this);
		}

		Shape.prototype.draw = function(context) {
		    console.log("shape::draw::dans draw");
		}

        Shape.prototype.calculCenter = function() {
            this.center.x = this.x+(this.width/2);
			this.center.y = this.y+(this.height/2);
        }
        
        Shape.prototype.deserialize = function(serializedShape) {
            this.x = serializedShape.x;
            this.y = serializedShape.y;
            this.width = serializedShape.width;
            this.height = serializedShape.height;
		}

 		return Shape;
	}();
})();
