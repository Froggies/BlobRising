(function() {

	"use strict";

    var 
		Molecule = app.entities.Molecule,
		inherit = app.js.inherit,
		isDefined = app.js.isDefined;

	app.entities.Blob = function() {

		inherit(Blob, Molecule);
		
		function Blob(width, height) {
			Blob.parent.constructor.apply(this, arguments);
			this.nbBlob = 100;
			this.maxAge = 1000;
			this.physic = new app.physics.Physic(this, 2);
		    this.shape = new app.shapes.Ellipse(0,0,width,height,true,true,"#00FF00");
		    this.timeToLostMolecule = Number((this.maxAge / this.nbBlob).toFixed(0));
		};
		
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
		        if(map.showNoneEntities) {
			        var subblob = new app.entities.Molecule(this.shape.width, this.shape.height);
		            subblob.init();
		            subblob.shape.x = this.shape.x;
		            subblob.shape.y = this.shape.y;
		            // in none because haven't physics
		            // can be go in blobEntities if it's necessary
		            map.noneEntities.push(subblob);
	            }
			}
			this.physic.update(translation, context.canvas.width, context.canvas.height);
			Blob.parent.update.call(this, translation, map);
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

