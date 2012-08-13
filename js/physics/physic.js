(function() {

	app.physics = {};

	var isDefined = app.js.isDefined;

	app.physics.Physic = function() {

		function Physic(entity, speed) {
			this.entity = entity;
			this.speed = speed;
			var x = this.entity.forme.x;
			var y = this.entity.forme.y;
			this.position = $V([x, y]);
		}

		Physic.prototype.update = function(translation) {
			var x = this.position.elements[0];
			var y = this.position.elements[1];

			var height = this.entity.forme.height;
			var width = this.entity.forme.width;
			var canvas = this.entity.context.canvas;
			var maxHeight = canvas.height;
			var maxWidth = canvas.width;

			console.log("x : " + x);
			console.log("y : " + y);
			console.log("maxWidth : " + maxWidth);
			console.log("maxHeight : " + maxHeight);
			console.log("width : " + width);
			console.log("height : " + height);
			var angle;
			if (y <= 0)  {
                angle = $V([x, 1]);
            }
            else if (y >= (maxHeight - height)) {
                angle = $V([x, -1]);
            }

            if (x <= 0)  {
                angle = $V([1, y]);
            }
            else if (x >= (maxWidth - width)) {
                angle = $V([-1, y]);
            }

            if(!isDefined(angle)) {
            	angle = $V([1, 1]);
            }

            console.log("angle x : " +angle.elements[0]);
            console.log("angle y : " +angle.elements[1]);

            this.position = this.position.add(angle);

			this.entity.forme = new app.shapes.Rectangle(
				this.position[0] * this.speed, 
				this.position[1] * this.speed,
				100,
				100
			);
		}

		return Physic;
	}();

})();