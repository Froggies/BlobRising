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
			this.nbBlob = 50;
			this.maxAge = 500;
			this.physic = new app.physics.Physic(this, 2, startDegree);
		    this.shape = new app.shapes.Rectangle(0,0,width,height,true,true,"#00FF00", "img/goutte.png");
		    this.timeToLostMolecule = Number((this.maxAge / this.nbBlob).toFixed(0));
		};
		
		Blob.prototype.update = function(translation, context, map) {

			var newCoordinate = null;
			var classicMovement = true;
			var returnToMainLoop = false;

			var deadlyEntities = map.getDeadlyEntities();
			for(var i = 0; i < deadlyEntities.length; i++) {
				var entity = deadlyEntities[i];
	        	var collisionCircle = {
		        	x : entity.shape.x + entity.shape.width / 2,	
		        	y : entity.shape.y + entity.shape.height / 2,
		        	getRadius : function() {
		        		return Math.max(entity.shape.width, entity.shape.height) / 2;
		        	}
	        	};
	        	if(this.physic.isInRadius(collisionCircle)) {
	        		this.dead(map);
	        		classicMovement = false;
	        		returnToMainLoop = true;
	        		break;
	        	}
			}

			if(!returnToMainLoop) {
				var attractiveEntities = map.getAttractiveEntities();
				for(var i = 0; i < attractiveEntities.length; i++) {
					var entity = attractiveEntities[i];
		        	if(this.physic.isInRadius(entity.attraction)) {
		        		if(entity.attracted === false) {
			        		this.physic.attractTo(entity.attraction);
			        		entity.attracted = true;
			        		returnToMainLoop = true;
			        	}
		        	} else {
		        		entity.attracted = false;
		        	}
				}
			}

			if(!returnToMainLoop) {
				var orbitalEntities = map.getOrbitalEntities();
				for(var i = 0; i < orbitalEntities.length; i++) {
					var entity = orbitalEntities[i];
			        if(this.physic.isInRadius(entity.orbit)) {
			            newCoordinate = this.physic.rotateAround(entity.orbit);
			            classicMovement = false;
			            break;	            
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
			Blob.parent.incrementMyAge.call(this, map);
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
