(function() {

	app.physics = {};

	var isDefined = app.js.isDefined;

	app.physics.Physic = function() {

		function Physic(entity, speed, degree) {
			this.entity = entity;
			this.speed = speed;
			var x = this.entity.shape.x;
			var y = this.entity.shape.y;
			var rad = Math.PI * (degree) / 180;
	        var xV = Number(Math.cos(rad).toFixed(2));
	        var yV = Number(Math.sin(rad).toFixed(2));
			this.angle = $V([xV, yV]);
		}

		Physic.prototype.update = function(translation, maxWidth, maxHeight) {
			var x = this.entity.shape.x;
			var y = this.entity.shape.y;

			var height = this.entity.shape.height;
			var width = this.entity.shape.width;
    
            var rawX = x + (this.speed * this.angle.elements[0]);
            var rawY = y + (this.speed * this.angle.elements[1]);
            // optimization, we dont need much precision
            var newX = Number(rawX.toFixed(2));
            var newY = Number(rawY.toFixed(2));
            
			this.setCoordinate(newX, newY);
            
			// calculate next frame angle
			if (y <= 0)  {
                this.angle = $V([this.angle.elements[0], 1]);
            } else if (x <= 0)  {
                this.angle = $V([1, this.angle.elements[1]]);
            } else if (y <= 0 || y >= (maxHeight - height)) {
                this.angle = $V([this.angle.elements[0], -1]);
            } else if (x >= (maxWidth - width)) {
                this.angle = $V([-1, this.angle.elements[1]]);
            }
		}


		Physic.prototype.setCoordinate = function(x, y) {
			this.entity.shape.x = x; 
			this.entity.shape.y = y;
		}

        Physic.prototype.attractTo = function(circle) {
            this.angle = this.calculAngle(this.entity.shape, circle);
        }

        Physic.prototype.calculAngle = function(blob, entity) {
            var Xa = blob.x;
            var Ya = blob.y;
            var Xb = entity.x;
            var Yb = entity.y;
            
            var relativX = Xb - Xa;
            var relativY = Yb - Ya;
            
            var angle = Math.atan2(relativY,relativX)/(Math.PI/180);
            // from degree to radian
            angle = Math.PI * angle / 180;
            
            var newX = Math.cos(angle); 	  	
            var newY = Math.sin(angle);
            
            var newAngle = $V([newX, newY]);
            
            return newAngle;
        }

		Physic.prototype.rotateAround = function(circle) {
			// Blob
		    var xa = this.entity.shape.x;
            var ya = this.entity.shape.y;

            var circleVector = $V([circle.x, circle.y]);

            //some hack in case blob not on circle anymore (cause of poor math skills :p), next translation
            //wil get it into 
            relativX = circle.x - xa;
            relativY = circle.y - ya;
            var vecteurRelatif = $V([relativX, relativY]);
            var comingAngle = vecteurRelatif.angleFrom(circleVector);
            var xV = Number(Math.cos(comingAngle + Math.PI / 2).toFixed(2));
            var yV = Number(Math.sin(comingAngle + Math.PI / 2).toFixed(2));
            this.angle = $V([xV, yV]);
    
            // compute rotation angle and speed
            var rotationAngle = ((this.speed * Math.PI) / 180);
            var blobVector = $V([xa, ya]);
            var newPosition = blobVector.rotate(rotationAngle, circleVector);
            // place blob sprite on new position
			this.setCoordinate(newPosition.elements[0], newPosition.elements[1]);
            // each time elapsed on rotation speed up the blob
            this.speed = this.speed + 0.1;
		}

        //unused
		Physic.prototype.distanceWith = function(xb, yb) {
		    var xa = this.entity.shape.x;
            var ya = this.entity.shape.y;
		    return Math.sqrt(Math.pow(xa-xb, 2)+Math.pow(ya-yb, 2));
		}
		
		Physic.prototype.isInRectangle = function(blob, entity) {
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

		Physic.prototype.isInRadius = function(circle) {
            var radius = circle.getRadius();
			if(!isDefined(radius) || radius <= 0) {
				return false;
			}

            var rectangleCenterX = this.entity.shape.x + this.entity.shape.width / 2;
            var rectangleCenterY = this.entity.shape.y + this.entity.shape.height / 2;
            var rectangleWidth = this.entity.shape.width;
            var rectangleHeight = this.entity.shape.height;

            var distance = {
                x : Math.abs(circle.x - rectangleCenterX),
                y : Math.abs(circle.y - rectangleCenterY)
            };

            if(distance.x > (rectangleWidth/2 + radius)) {
                return false;
            }
            if(distance.y > (rectangleHeight/2 + radius)) {
                return false;
            }
            if(distance.x <= (rectangleWidth/2)) {
                return true;
            }
            if(distance.y <= (rectangleHeight/2)) {
                return true;
            }

            cornerDistance = Math.pow(distance.x - rectangleWidth/2, 2) + Math.pow(distance.y - rectangleHeight/2, 2);
            return (cornerDistance <= Math.pow(radius, 2));
		}

		return Physic;
	}();

})();
