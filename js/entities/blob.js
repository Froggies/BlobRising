(function() {

	"use strict";

    var 
		Molecule = app.entities.Molecule,
		inherit = app.js.inherit,
		isDefined = app.js.isDefined,
		getClass = app.js.getObjectClass;

	app.entities.Blob = function() {

		inherit(Blob, Molecule);
		
		function Blob(width, height, startDegree) {
			Blob.parent.constructor.apply(this, arguments);
			this.nbBlob = 0;
			this.maxAge = 1000;
			this.physic = new app.physics.Physic(this, 2, startDegree);
		    this.shape = new app.shapes.Rectangle(0,0,width,height,true,true,"#00FF00", "img/goutte.png");
		    this.timeToLostMolecule = Number((this.maxAge / this.nbBlob).toFixed(0));
		};
		
		Blob.prototype.update = function(translation, context, map) {

			var newCoordinate = null;
			var classicMovement = true;

		    for(var entityIndex in map.staticEntities) {
		        var entity = map.staticEntities[entityIndex];

		        if(getClass(entity) == "Wall") {
		        	var collisionCircle = {
			        	x : entity.shape.x + entity.shape.width / 2,	
			        	y : entity.shape.y + entity.shape.height / 2,
			        	getRadius : function() {
			        		return Math.max(entity.shape.width, entity.shape.height) / 2;
			        	}
		        	};
		        	var isCollision = this.physic.isInRadius(collisionCircle);
		        	if(isCollision) {
		        		this.dead(map);
		        		classicMovement = false;
		        		return;
		        	}

		        }

		        // if(isDefined(entity.attraction)) {
		        // 	if(this.physic.isInRadius(entity.attraction)) {
		        // 		this.physic.attractTo(entity.attraction);
		        // 		return;
		        // 	}
		        // }

		        if(isDefined(entity.orbit)) {
			        if(this.physic.isInRadius(entity.orbit)) {
			            newCoordinate = this.physic.rotateAround(entity.orbit);
			            classicMovement = false;
			            return;		            
			        }	
		        }
		    }
		    if(classicMovement) {
		    	this.physic.update(translation, context.canvas.width, context.canvas.height);
		    }

		    if(this.isBirthday() && this.nbBlob > 0) {
		        this.nbBlob--;
		        if(map.showNoneEntities) {
			        var subblob = new app.entities.Molecule(this.shape.width, this.shape.height);
		            subblob.shape.x = this.shape.x;
		            subblob.shape.y = this.shape.y;
		            // in none because haven't physics
		            // can be go in blobEntities if it's necessary
		            map.noneEntities.push(subblob);
	            }
			}
			Blob.parent.incrementMyAge.call(this, translation, map);
		}
		
		Blob.prototype.isBirthday = function() {
		    return this.age % this.timeToLostMolecule == 0 && this.imAlive;
		}
		
		Blob.prototype.dead = function(map) {
		    this.imAlive = false;
		    map.nbBlobDead++;
		    app.js.arrayRemove(map.blobEntities, this)
		}
		
		return Blob;

	}();
})();
