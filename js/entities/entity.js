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
		    this.collision = new app.physics.Collision();
		    this.radius = 0;
		}
		
		Entity.prototype.init = function() {
		    this.shape.init();
		}

		Entity.prototype.update = function(translation, map) {
			this.incrementMyAge(map);
		}

		Entity.prototype.draw = function(context) {
			if(app.js.isDefined(this.radius)) {
			    var r = new app.shapes.Rectangle();
			    r.x = this.shape.x - (this.radius/4);
			    r.y = this.shape.y - (this.radius/4);
			    r.width = this.radius;
			    r.height = this.radius;
			    r.draw(context);
			}
			this.shape.draw(context);
		}
		
		Entity.prototype.incrementMyAge = function(map) {
		    this.age++;
	    }
	    
	    Entity.prototype.dead = function(map) {
		    this.imAlive = false;
		    app.js.arrayRemove(map.staticEntities, this);
		}
		
		Entity.prototype.isCollision = function(entity) {
		    return this.collision.isCollision(this, entity);
		}
		
		return Entity;
	}();
})();
