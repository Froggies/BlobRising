(function() {

	"use strict";

    var 
		Entity = app.entities.Entity,
		inherit = app.js.inherit,
		isDefined = app.js.isDefined;

	app.entities.Molecule = function() {

		inherit(Molecule, Entity);
		
		var age;
		var maxAge;
		var imAlive;
		var initialWidth;
		var initialHeight;
		
		function Molecule() {
			Molecule.super.constructor.apply(this);
			this.age = 0;
			this.maxAge = 1000;
			this.imAlive = true;
		};
		
		Molecule.prototype.init = function() {
		    Molecule.super.init.call(this);
		    this.initialWidth = this.shape.width;
		    this.initialHeight = this.shape.height;
		}
		
		Molecule.prototype.update = function(translation, map) {
		    this.incrementMyAge(map);
		}
		
		Molecule.prototype.incrementMyAge = function(map) {
		    this.age++;
	        if(this.age < this.maxAge && this.shape.width > 0) {
                this.shape.width = this.initialWidth - ((this.initialWidth / this.maxAge) * this.age);
                this.shape.height = this.initialHeight - ((this.initialHeight / this.maxAge) * this.age);
	        } else {
	            this.dead(map);
	        }
		}
		
		Molecule.prototype.dead = function(map) {
		    this.imAlive = false;
		    app.js.arrayRemove(map.staticEntities, this);
		}

		return Molecule;

	}();
})();

