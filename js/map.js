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
			this.startSource = new app.entities.Source();
			this.endWell = new app.entities.Well();
			this.endWell.last = true;
			this.endWell.shape.color = "#FF00AA";
			this.staticEntities.push(this.startSource);
			this.staticEntities.push(this.endWell);
			this.nbBlobDead = 0;

			this.deadlyEntities = [];
			this.attractiveEntities = [];
			this.orbitalEntities = [];
		}
		
		Map.prototype.resize = function() {
		    var canvas = document.getElementById("canvas");
		    var actualWidth = window.innerWidth;
		    var actualHeight = window.innerHeight;
		    var len = this.staticEntities.length;
		    var entity;
		    for(var entityIndex=0; entityIndex<len; entityIndex++) {
		        entity = this.staticEntities[entityIndex];
		        if(app.js.isDefined(entity) && app.js.isDefined(this.initSize)) {
		            entity.shape.x = (actualWidth * entity.shape.x) / this.initSize.width;
		            entity.shape.y = (actualHeight * entity.shape.y) / this.initSize.height;
	            }
		    }
		}
		
		Map.prototype.draw = function(context, withUpdate) {
		    var len = this.staticEntities.length;
		    var entity;
		    for(var entityIndex=0; entityIndex<len; entityIndex++) {
		        entity = this.staticEntities[entityIndex];
		        if(app.js.isDefined(entity)) {
		            if(app.js.isDefined(withUpdate) && withUpdate === true) {
	                    entity.update($V([1, 1]), this);
                    }
		            entity.draw(context, this);
	            }
		    }
		    len = this.blobEntities.length;
		    for(var entityIndex=0; entityIndex<len; entityIndex++) {
		        entity = this.blobEntities[entityIndex];
		        if(app.js.isDefined(entity)) {
		            if(app.js.isDefined(withUpdate) && withUpdate === true) {
	                    entity.update($V([1, 1]), context, this);
	                }
		            entity.draw(context, this);
	            }
		    }
		    if(this.showNoneEntities) {
		        len = this.noneEntities.length;
		        for(var entityIndex=0; entityIndex<len; entityIndex++) {
		            entity = this.noneEntities[entityIndex];
		            if(app.js.isDefined(entity)) {
		                if(app.js.isDefined(withUpdate) && withUpdate === true) {
                            entity.update($V([1, 1]), this);
                        }
                        entity.draw(context, this);
                    }
		        }
	        }
		}

		Map.prototype.addEntity = function(entity) {
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
				if("Wall" === getClass(this.staticEntities[i])) {
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
