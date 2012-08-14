(function() {

	"use strict";
	
	var stringToClass = app.js.stringToClass;
	
	app.entities = app.entities || {};

	app.entities.Entity = function() {
	
		function Entity() {
		}

		Entity.prototype.update = function(translation) {
		    this.physic = new app.physics.Physic(this, 2);
			this.physic.update(translation);
		}

		Entity.prototype.draw = function(context) {
			this.shape.draw(context);
		}
		
		return Entity;
	}();
})();
