(function() {

	"use strict";

    var 
		Entity = app.entities.Entity,
		inherit = app.js.inherit,
		isDefined = app.js.isDefined;

	app.entities.Molecule = function() {

		inherit(Molecule, Entity);
		
		function Molecule(width, height) {
			Molecule.parent.constructor.apply(this);
			this.maxAge = 100;
			this.shape = new app.shapes.Rectangle(0,0,width,height,false,true,"#FF0000", null,null,"img/blobSprite.gif");
		    this.initialWidth = width;
		    this.initialHeight = height;
		};

        Molecule.prototype.draw = function(context, map) {
			this.shape.draw(context, this.physic);
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
		    app.js.arrayRemove(map.noneEntities, this)
		}
		
		return Molecule;

	}();
})();

