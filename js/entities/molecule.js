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
			Molecule.parent.constructor.apply(this);
			this.maxAge = 1000;
		};
		
		Molecule.prototype.init = function() {
		    Molecule.parent.init.call(this);
		    //this.mphysic = new app.physics.Physic(this, 2);
		    this.initialWidth = this.shape.width;
		    this.initialHeight = this.shape.height;
		}
		
		Molecule.prototype.incrementMyAge = function(map) {
		    Molecule.parent.incrementMyAge.call(this, map);
	        if(this.age < this.maxAge && this.shape.width > 0) {
                this.shape.width = this.initialWidth - ((this.initialWidth / this.maxAge) * this.age);
                this.shape.height = this.initialHeight - ((this.initialHeight / this.maxAge) * this.age);
	        } else {
	            this.dead(map);
	        }
		}
		
		Molecule.prototype.dead = function(map) {
		    this.imAlive = false;
		    app.js.log(1,"m@n", map.noneEntities, this);
		    app.js.arrayRemove(map.noneEntities, this)
		}
		
		return Molecule;

	}();
})();

