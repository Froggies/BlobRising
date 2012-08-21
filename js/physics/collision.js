(function() {

	var isDefined = app.js.isDefined;

	app.physics.Collision = function() {

		function Collision() {
		}
		
		Collision.prototype.isCollision = function(blob, entity) {
		    var x = blob.shape.x;
            var y = blob.shape.y;
            var h = blob.shape.height;
            var l = blob.shape.width;
		    
		    var x2 = entity.shape.x;
            var y2 = entity.shape.y;
            var h2 = entity.shape.height;
            var l2 = entity.shape.width;
                    
            if(x2+l2 < x || x2 > x+l || y2+h2 < y || y2 > y+h) {
                return false;
            } else {                            
                return true;
            }
		}
		
		Collision.prototype.isInRaduis = function(blob, entity) {
		    if(entity.radius > 0) {
		        var x = blob.shape.x;
                var y = blob.shape.y;
                var h = blob.shape.height;
                var l = blob.shape.width;
		        
		        var x2 = entity.shape.x - entity.radius/4;
                var y2 = entity.shape.y - entity.radius/4;
                var h2 = entity.radius;
                var l2 = entity.radius;

                if(x2+l2 < x || x2 > x+l || y2+h2 < y || y2 > y+h) {
                    return false;
                } else {        
                    return true;
                }
            }
            return false;
		}
		
		Collision.prototype.nextDirection = function(blob, entity) {
		    var xa = blob.shape.x;
            var ya = blob.shape.y;
	        
	        var xb = entity.shape.x;
            var yb = entity.shape.y;
            
            relativX = xb - xa;
            relativZ = yb - ya;

            var angle = Math.atan2(relativZ,relativX)/(Math.PI/180);
            var newX = Math.cos(angle);
            var newY = Math.sin(angle);
            var newAngle;
            if(xa < xb && ya < yb) {
                app.js.log(1, "m@n", "gauche dessus", this);
                newAngle = $V([-newX, -newY]);
            } else if(xa < xb && ya > yb) {
                app.js.log(1, "m@n", "gauche dessous", this);
                newAngle = $V([newX, -newY]);
            } else if(xa > xb && ya < yb) {
                app.js.log(1, "m@n", "droite dessus", this);
                newAngle = $V([-newX, newY]);
            } else {
                app.js.log(1, "m@n", "droite dessous", this);
                newAngle = $V([newX, newY]);
            }
            if(app.js.getObjectClass(entity) == "Well" && blob.physic.angle.angleFrom(newAngle) < 1) {
                blob.physic.angle = newAngle;
            }
		}
		
		Collision.prototype.pointDistant = function(blob, entity) {
		    var x = blob.shape.center.x;
            var y = blob.shape.center.y;
            var x2 = entity.shape.center.x;
            var y2 = entity.shape.center.y;
		    return Math.sqrt(Math.pow(x2-x, 2)+Math.pow(y2-y, 2));
		}
	    
	    return Collision;
	}();

})();
