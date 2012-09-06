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
			this.shape = new app.shapes.Rectangle(0,0,50,50,true,true,"#A0CD6C");
			//for debug
			//this.radius = Math.max(this.shape.width, this.shape.height);
		};
		
		Wall.prototype.update = function(translation, map) {
		    Wall.parent.update.call(this, translation, map);
		}
		
		return Wall;

	}();
})();
