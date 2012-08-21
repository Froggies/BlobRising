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
		}
		
		return Wall;

	}();
})();

