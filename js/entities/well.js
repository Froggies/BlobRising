(function() {

	"use strict";

    var 
		Entity = app.entities.Entity,
		inherit = app.js.inherit,
		isDefined = app.js.isDefined;

	app.entities.Well = function() {

		inherit(Well, Entity);
		
		var nbBlobMax;
		
		function Well() {
			Well.super.constructor.apply(this);
			this.nbBlobMax = 1;
		};
		
		Well.prototype.update = function(translation, map) {
		    if(this.nbBlobMax <= 0) {
		        this.dead(map);
		    } else {
		        Well.super.update.call(this, translation, map);
		    }
		}
		
		return Well;

	}();
})();

