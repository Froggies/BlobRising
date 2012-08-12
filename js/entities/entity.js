(function() {

	"use strict";
	
	var stringToClass = app.js.stringToClass;
	
	app.entities = app.entities || {};

	app.entities.Entity = function() {
	
	    var shape;

		function Entity() {
		}
		
		Entity.prototype.deserialize = function(serializedShape) {
		    var shapeClass = stringToClass(serializedShape.shape["class"]);
            this.shape = new shapeClass();
	        this.shape.deserialize(serializedShape.shape)
		}

		return Entity;
	}();
})();
