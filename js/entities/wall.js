(function() {

	"use strict";

    var 
		Entity = app.entities.Entity,
		inherit = app.js.inherit,
		isDefined = app.js.isDefined;

	app.entities.Wall = function() {

		inherit(Wall, Entity);
		
		function Wall() {
			Wall.super.constructor.apply(this);
		};
		
		Wall.prototype.update = function(translation, map) {
		    Wall.super.update.call(this, translation, map);
		    for(var entityIndex in map.blobEntities) {
		        var entity = map.blobEntities[entityIndex];
		        if(this.isCollision(entity)) {
		            entity.dead(map);
		        }
		    }
		}
		
		Wall.prototype.isCollision = function(entity) {
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
		
		return Wall;

	}();
})();

