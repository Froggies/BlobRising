(function() {

	"use strict";

	app.gameplay = {};

	app.gameplay.Entity = function() {

		function Entity(context) {
			this.formes = [];
			var x = 10, y = 10;
			this.context = context;
			this.forme = new app.shapes.Rectangle(x, y, 100, 100);
			this.physic = new app.physics.Physic(this, 1);
		}

		Entity.prototype.update = function(translation) {
			this.physic.update(translation);
		}

		Entity.prototype.draw = function() {
			this.forme.draw(this.context);
		}

		return Entity;

	}();
	
})();
