(function() {

	"use strict";

	app.gameplay = {};

	app.gameplay.Entity = function() {

		function Entity(x, y) {
			this.position = $V([x, y]);
			this.formes = [];
		}

		Entity.prototype.update = function(translation) {
			this.position = this.position.add(translation);
		}

		Entity.prototype.draw = function(canvas) {

		return Entity;
	}();
	
})();