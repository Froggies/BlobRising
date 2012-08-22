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
		    this.shape.fill=true;
		}
		
		Blob.prototype.update = function(translation, context, map) {
		    for(var entityIndex in map.staticEntities) {
		        var entity = map.staticEntities[entityIndex];
		        var isCollision = this.isCollision(entity);
		        if(app.js.getObjectClass(entity) == "Wall" && isCollision) {
		            this.dead(map);
		        } else if(app.js.getObjectClass(entity) == "Well" && isCollision) {
		            this.dead(map);
		            entity.nbBlobMax--;
		        }
		        var isInRadius = this.collision.isInRaduis(this, entity);
		        if(app.js.getObjectClass(entity) == "Well" && isInRadius) {
		            this.collision.nextDirection(this, entity);
		        }
		        
		    }
		    if(this.isBirthday() && this.nbBlob > 0) {
		        this.nbBlob--;
			    var subblob = new app.entities.Molecule();
		        subblob.shape = new app.shapes.Ellipse();
		        subblob.shape.width = this.shape.width;
		        subblob.shape.height = this.shape.height;
		        subblob.shape.x = this.shape.x;
		        subblob.shape.y = this.shape.y;
		        subblob.shape.gradient = true;
		        subblob.shape.fill = false;
		        subblob.shape.color = "#FF00FF";
		        subblob.maxAge = 100;
		        subblob.init();
		        //var xv = this.physic.angle.elements[0];
		        //xv = xv/2;
		        //var yv = this.physic.angle.elements[1];
		        //yv = yv/2;
		        //subblob.mphysic.angle = $V([xv, yv]);
		        // in none because haven't physics
		        // can be go in blobEntities if it's necessary
		        map.noneEntities.push(subblob);
			}
			this.physic.update(translation, context.canvas.width, context.canvas.height);
			Blob.super.update.call(this, translation, map);
		}
		
		Blob.prototype.isBirthday = function() {
		    return this.age % this.timeToLostMolecule == 0 && this.imAlive;
		}
		
		Blob.prototype.dead = function(map) {
		    this.imAlive = false;
		    app.js.arrayRemove(map.blobEntities, this)
		}
		
		return Blob;

	}();
})();

