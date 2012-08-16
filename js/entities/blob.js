(function() {

	"use strict";

    var 
		Molecule = app.entities.Molecule,
		inherit = app.js.inherit,
		isDefined = app.js.isDefined;

	app.entities.Blob = function() {

		inherit(Blob, Molecule);
		
		var nbBlob;
		var timeToLostMolecule;
		var physic;
		
		function Blob() {
			Blob.super.constructor.apply(this);
			this.nbBlob = 100;
		};
		
		Blob.prototype.init = function() {
		    Blob.super.init.call(this);
		    this.physic = new app.physics.Physic(this, 2);
		    this.timeToLostMolecule = (this.maxAge / this.nbBlob);
		    this.timeToLostMolecule = Number(this.timeToLostMolecule.toFixed(0));
		}
		
		Blob.prototype.update = function(translation, map) {
		    for(var entityIndex in map.blobEntities) {
		        var entity = map.staticEntities[entityIndex];
		        if(app.js.getObjectClass(entity) == "Wall" && this.isCollision(entity)) {
		            this.dead(map);
		        }
		    }
		    if(this.isBirthday() && this.nbBlob > 0) {
		        this.nbBlob--;
			    var subblob = new app.entities.Molecule();
		        subblob.shape = new app.shapes.Rectangle();
		        subblob.shape.width = this.shape.width;
		        subblob.shape.height = this.shape.height;
		        subblob.shape.x = this.shape.x;
		        subblob.shape.y = this.shape.y;
		        subblob.maxAge = 100;
		        subblob.init();
		        // in static because haven't physics
		        // can be go in blobEntities if it's necessary
		        map.staticEntities.push(subblob);
			}
			this.physic.update(translation);
			Blob.super.update.call(this, translation, map);
		}
		
		Blob.prototype.isBirthday = function() {
		    return this.age % this.timeToLostMolecule == 0 && this.imAlive;
		}
		
		return Blob;

	}();
})();

