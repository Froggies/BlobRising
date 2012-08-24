(function() {

	"use strict";
	
	app.entities = app.entities || {};

	app.entities.Entity = function() {
	
		function Entity() {
		    this.age = 0;
		    this.imAlive = true;
		    this.shape = new app.shapes.Rectangle();
		    this.collision = new app.physics.Collision();
		    this.radius = 0;
		}
		
		Entity.prototype.update = function(translation, map) {
			this.incrementMyAge(map);
		}

		Entity.prototype.draw = function(context) {
			if(app.js.isDefined(this.radius)) {
			    var e = new app.shapes.Ellipse();
			    e.x = this.shape.x + (this.shape.width/2);
			    e.y = this.shape.y + (this.shape.height/2);
			    e.width = this.radius;
			    e.height = this.radius;
			    e.color = "rgba(0,0,0,1)";
	//		    e.fill = true;
	//		    e.gradient = true;
                context.save();                
			    context.shadowColor = this.shape.color;
                context.shadowOffsetX = 0;
                context.shadowOffsetY = 0;
                context.shadowBlur = 6;
			    
			    e.draw(context);
			    context.restore();
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
