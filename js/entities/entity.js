(function() {

	"use strict";
	
	app.entities = app.entities || {};

	app.entities.Entity = function() {
	
	    var age;
	    var imAlive;
	    var shape;
	
		function Entity() {
		    this.age = 0;
		    this.imAlive = true;
		    this.shape = new app.shapes.Rectangle();
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
		    if(!app.js.arrayRemove(map.blobEntities, this)) {
		        app.js.arrayRemove(map.staticEntities, this)
		    }
		}
		
		return Entity;
	}();
})();
