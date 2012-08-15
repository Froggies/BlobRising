(function() {

	"use strict";
	
	app.entities = app.entities || {};

	app.entities.Entity = function() {
	
		function Entity() {
		}
		
		Entity.prototype.init = function() {
		    this.physic = new app.physics.Physic(this, 2);
		}

		Entity.prototype.update = function(translation, map) {
			// TO BE OVERRIDE
		}

		Entity.prototype.draw = function(context) {
			this.shape.draw(context);
		}
		
		return Entity;
	}();
})();
