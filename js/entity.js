(function() {

	"use strict";

	app.gameplay = {};

	app.gameplay.Entity = function() {

		function Entity(x, y) {
			this.formes = [];
			this.forme = new app.shapes.Rectangle(x, y, 100, 100);
			this.position = $V([x, y]);
		}

		Entity.prototype.update = function(translation) {
			this.position = this.position.add(translation);
			var x = this.position.elements[0];
			var y = this.position.elements[1];
			this.forme = new app.shapes.Rectangle(x, y, 100, 100);
		}

		Entity.prototype.draw = function(context) {
			this.forme.draw(context);
		}

		return Entity;

	}();
	
})();
