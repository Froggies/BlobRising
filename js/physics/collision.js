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
		    this.nextDirection(blob, entity);
		    if(entity.radius > 0) {
		        var x = blob.shape.x;
                var y = blob.shape.y;
                var h = blob.shape.height;
                var l = blob.shape.width;
		        
		        var x2 = entity.shape.x;
                var y2 = entity.shape.y;
                var h2 = entity.shape.height + entity.radius;
                var l2 = entity.shape.width + entity.radius;

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
		    
		    var sinAlphaBeta = (yb - ya) / (Math.sqrt(Math.pow(xb - xa, 2) + Math.pow(yb - ya, 2)));
            var AlphaBeta = Math.asin(sinAlphaBeta)
            if (xb < xa) {AlphaBeta = 180 - AlphaBeta;}
            var alpha = AlphaBeta - 10;//???
            console.log(alpha);
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
