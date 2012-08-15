(function() {

	"use strict";

    var 
		Entity = app.entities.Entity,
		inherit = app.js.inherit,
		isDefined = app.js.isDefined;

	app.entities.Molecule = function() {

		inherit(Molecule, Entity);
		
		var maxAge;
		var initialWidth;
		var initialHeight;
		
		function Molecule() {
			Molecule.super.constructor.apply(this);
			this.maxAge = 1000;
		};
		
		Molecule.prototype.init = function() {
		    Molecule.super.init.call(this);
		    this.initialWidth = this.shape.width;
		    this.initialHeight = this.shape.height;
		}
		
		Molecule.prototype.incrementMyAge = function(map) {
		    Molecule.super.incrementMyAge.call(this, map);
	        if(this.age < this.maxAge && this.shape.width > 0) {
                this.shape.width = this.initialWidth - ((this.initialWidth / this.maxAge) * this.age);
                this.shape.height = this.initialHeight - ((this.initialHeight / this.maxAge) * this.age);
	        } else {
	            this.dead(map);
	        }
		}
		
		return Molecule;

	}();
})();

