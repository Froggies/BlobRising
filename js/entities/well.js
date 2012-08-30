(function() {

	"use strict";

    var 
		Entity = app.entities.Entity,
		inherit = app.js.inherit,
		isDefined = app.js.isDefined;

	app.entities.Well = function() {

		inherit(Well, Entity);
		
		function Well() {
			Well.parent.constructor.apply(this);
			this.nbBlobMax = 5;
			this.nbBlob = 0;
			this.isFinal = false;
			this.shape = new app.shapes.Rectangle(0,0,50,35,true,true,"#FF30F0");
			this.radius = Math.max(this.shape.width, this.shape.height) + 80;
		};
		
		Well.prototype.update = function(translation, map) {
		    if(this.nbBlobMax <= this.nbBlob && this.isFinal !== true) {
		        this.dead(map);
		    } else {
		        Well.parent.update.call(this, translation, map);
		    }
		}
		
		return Well;

	}();
})();

