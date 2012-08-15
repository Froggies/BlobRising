(function() {

	"use strict";
	
	app.entities = app.entities || {};

	app.entities.Entity = function() {
	
	    var age;
	    var imAlive;
	
		function Entity() {
		    this.age = 0;
		    this.imAlive = true;
		}
		
		Entity.prototype.init = function() {
		    
		}

		Entity.prototype.update = function(translation, map) {
			this.incrementMyAge(map);
		}

		Entity.prototype.draw = function(context) {
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
