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
		
		Entity.prototype.isCollision = function(entity) {
		    var x2 = entity.shape.x;
            var y2 = entity.shape.y;
            var h2 = entity.shape.height;
            var l2 = entity.shape.width;
                    
            if(x2+l2 < this.shape.x || x2 > this.shape.x+this.shape.width
            || y2+h2 < this.shape.y || y2 > this.shape.y+this.shape.height)
                    return false
            else                            
                    return true;
		}
		
		return Entity;
	}();
})();
