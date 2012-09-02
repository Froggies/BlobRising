(function() {

	"use strict";
	
	app.Map = function() {

		function Map() {
		    this.showNoneEntities = true;
			this.menuWell = {};
			this.staticEntities = [];
			this.blobEntities = [];
			this.noneEntities = [];
			this.startSource = new app.entities.Source();
			this.endWell = new app.entities.Well();
			this.endWell.last = true;
			this.staticEntities.push(this.startSource);
			this.staticEntities.push(this.endWell);
		}
		
		Map.prototype.resize = function() {
		    
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
		
		Map.prototype.isFinish = function() {
		    return this.startSource.nbBlob == 0 && this.blobEntities.length == 0;
		}
		
		Map.prototype.isWin = function() {
		    return this.endWell.nbBlob > 0;
		}

		return Map;
	}();
})();
