(function() {

	"use strict";
	
	var stringToClass = app.js.stringToClass;
	
	app.entities = app.entities || {};

	app.entities.Entity = function() {
	
	    var context;
	
		function Entity() {
			this.formes = [];
		}

		Entity.prototype.update = function(translation) {
			this.physic.update(translation);
		}

		Entity.prototype.draw = function() {
			this.forme.draw(this.context);
		}
		
		Entity.prototype.deserialize = function(serializedShape) {
		    var shapeClass = stringToClass(serializedShape.shape["class"]);
            this.shape = new shapeClass();
	        this.shape.deserialize(serializedShape.shape);
	        this.physic = new app.physics.Physic(this, 2);
		}

		return Entity;
	}();
})();
