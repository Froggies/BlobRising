(function() {

	"use strict";
	
	app.entities = app.entities || {};

	app.entities.Entity = function() {
	
		function Entity() {
		    this.age = 0;
		    this.imAlive = true;
		    this.shape = new app.shapes.Rectangle();
		    this.draggable = false;
		}
		
		Entity.prototype.update = function(translation, map) {
			this.incrementMyAge(map);
		}

		Entity.prototype.draw = function(context, map) {
			this.shape.draw(context);
		}
		
		Entity.prototype.incrementMyAge = function(map) {
		    this.age++;
	    }
	    
	    Entity.prototype.dead = function(map) {
		    this.imAlive = false;
		    app.js.arrayRemove(map.staticEntities, this);
		}
		
		return Entity;
	}();
})();
