(function() {

	app.physics = {};

	var isDefined = app.js.isDefined;

	app.physics.Physic = function() {

		function Physic(entity, speed) {
			this.entity = entity;
			this.speed = speed;
			var x = this.entity.shape.x;
			var y = this.entity.shape.y;
			this.position = $V([x, y]);
			this.angle = $V([1, -0.4]);
		}

		Physic.prototype.update = function(translation) {
			var x = this.position.elements[0];
			var y = this.position.elements[1];

			var height = this.entity.shape.height;
			var width = this.entity.shape.width;
			var canvas = this.entity.context.canvas;
			var maxHeight = canvas.height;
			var maxWidth = canvas.width;

            var rawX = x + (this.speed * this.angle.elements[0]);
            var rawY = y + (this.speed * this.angle.elements[1]);
            // optimization, we dont need much precision
            var newX = Number(rawX.toFixed(2));
            var newY = Number(rawY.toFixed(2));

            this.position = $V([newX, newY]);

			this.entity.shape.x = this.position.elements[0]; 
			this.entity.shape.y = this.position.elements[1];
            
            if(app.js.getObjectClass(this.entity) == "Molecule") {
		        console.log(this.entity.shape.x);
	        }            
            
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
            if(app.js.getObjectClass(this.entity) == "Molecule") {
		        console.log(this.entity.shape.x);
	        }
		}

		return Physic;
	}();

})();
