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
            
			this.entity.shape.x = newX; 
			this.entity.shape.y = newY;
            
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

		return Physic;
	}();

})();
