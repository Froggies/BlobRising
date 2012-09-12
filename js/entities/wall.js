(function() {

	"use strict";

    var 
		Entity = app.entities.Entity,
		inherit = app.js.inherit,
		isDefined = app.js.isDefined;

	app.entities.Wall = function() {

		inherit(Wall, Entity);
		
		function Wall() {
			Wall.parent.constructor.apply(this);
			this.className = "Wall";
			this.shape = new app.shapes.Rectangle(0,0,50,50,"#A0CD6C",null,"img/wall_pattern.gif");
		};
		
		return Wall;

	}();
})();
