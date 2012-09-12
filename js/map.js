(function() {

	"use strict";

	var getClass = app.js.getObjectClass;
	
	app.Map = function() {

		function Map() {
		    this.showNoneEntities = true;
			this.menuRotate = {};
			this.menuMagnet = {};
			this.staticEntities = [];
			this.blobEntities = [];
			this.noneEntities = [];
			this.menuEntities = [];
			this.startSource = new app.entities.Source();
			this.endWell = new app.entities.Well();
			this.endWell.last = true;
			this.endWell.shape.color = "#80FF02";
			this.endWell.shape.urlImage = "img/wellFinal.gif";
			this.staticEntities.push(this.startSource);
			this.staticEntities.push(this.endWell);
			this.nbBlobDead = 0;
			this.staticBuffering = false;

			this.deadlyEntities = [];
			this.attractiveEntities = [];
			this.orbitalEntities = [];
		}
		
		Map.prototype.buffering = function() {
		    if(!app.js.isDefined(this.canvasBuffer)) {
		        this.canvasBuffer = document.createElement('canvas');
		        this.canvasBuffer.width = 1024;
	            this.canvasBuffer.height = 600;
            } else {
                this.canvasBuffer.width = this.canvasBuffer.width;
            }
		    var context = this.canvasBuffer.getContext('2d');
		    var len = this.staticEntities.length;
		    var entity;
		    for(var entityIndex=0; entityIndex<len; entityIndex++) {
		        entity = this.staticEntities[entityIndex];
		        if(app.js.isDefined(entity)) {
		            entity.draw(context, this);
	            }
		    }
		    this.staticBuffering = true;
		}
		
		Map.prototype.draw = function(context, withUpdate) {
		    //static entities
		    if(this.staticBuffering === false) {
		        this.buffering();
		    }
		    context.drawImage(this.canvasBuffer, 0, 0);
		    if(withUpdate === true) {
		        var len = this.staticEntities.length;
		        var entity;
		        for(var entityIndex=0; entityIndex<len; entityIndex++) {
		            entity = this.staticEntities[entityIndex];
		            if(app.js.isDefined(entity)) {
                        entity.update(this);
	                }
		        }
	        }
		    //menu entities
		    len = this.menuEntities.length;
		    for(var entityIndex=0; entityIndex<len; entityIndex++) {
		        entity = this.menuEntities[entityIndex];
		        if(app.js.isDefined(entity)) {
		            entity.draw(context, this);
	            }
		    }
		    //none entities
		    if(this.showNoneEntities) {
		        len = this.noneEntities.length;
		        for(var entityIndex=0; entityIndex<len; entityIndex++) {
		            entity = this.noneEntities[entityIndex];
		            if(app.js.isDefined(entity)) {
		                if(withUpdate === true) {
                            entity.update(this);
                        }
                        entity.draw(context, this);
                    }
		        }
	        }
	        //blob
		    len = this.blobEntities.length;
		    for(var entityIndex=0; entityIndex<len; entityIndex++) {
		        entity = this.blobEntities[entityIndex];
		        if(app.js.isDefined(entity)) {
		            if(withUpdate === true) {
	                    entity.update(context, this);
	                }
		            entity.draw(context, this);
	            }
		    }
		}

		Map.prototype.addEntity = function(entity) {
			entity.draggable = false;
			this.staticBuffering = false;
			this.staticEntities.push(entity);
			this.clearIterators();
		}

		Map.prototype.clearIterators = function() {
			this.deadlyEntities = [];
			this.attractiveEntities = [];
			this.orbitalEntities = [];
		}

		Map.prototype.getDeadlyEntities = function() {
			if(this.deadlyEntities.length > 0) {
				return this.deadlyEntities;
			}

			for(var i = 0; i < this.staticEntities.length; i++) {
				if("Wall" === this.staticEntities[i].className) {
					this.deadlyEntities.push(this.staticEntities[i]);
				}
			}

			return this.deadlyEntities;
		}

		Map.prototype.getAttractiveEntities = function() {
			if(this.attractiveEntities.length > 0) {
				return this.attractiveEntities;
			}

			for(var i = 0; i < this.staticEntities.length; i++) {
				if(this.staticEntities[i].hasOwnProperty("attraction")) {
					this.attractiveEntities.push(this.staticEntities[i]);
				}
			}

			return this.attractiveEntities;
		}

		Map.prototype.getOrbitalEntities = function() {
			if(this.orbitalEntities.length > 0) {
				return this.orbitalEntities;
			}

			for(var i = 0; i < this.staticEntities.length; i++) {
				if(this.staticEntities[i].hasOwnProperty("orbit")) {
					this.orbitalEntities.push(this.staticEntities[i]);
				}
			}

			return this.orbitalEntities;
		}
		
		Map.prototype.isFinish = function() {
		    return this.startSource.nbBlob == 0 && this.blobEntities.length == 0;
		}
		
		Map.prototype.isWin = function() {
		    return this.endWell.nbBlob > 0;
		}

		return Map;
	}();
})();
