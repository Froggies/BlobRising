(function() {

	"use strict";
	
	var stringToClass = app.js.stringToClass;

	app.Map = {};

	app.Map = function() {

		function Map() {
		    this.showNoneEntities = true;
			this.staticEntities = [];
			this.menuEntities = [];
			this.blobEntities = [];
			this.noneEntities = [];
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
		            entity.draw(context);
	            }
		    }
		    len = this.blobEntities.length;
		    for(var entityIndex=0; entityIndex<len; entityIndex++) {
		        entity = this.blobEntities[entityIndex];
		        if(app.js.isDefined(entity)) {
		            if(app.js.isDefined(withUpdate) && withUpdate === true) {
	                    entity.update($V([1, 1]), context, this);
	                }
		            entity.draw(context);
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
                        entity.draw(context);
                    }
		        }
	        }
		}
		
		Map.prototype.isWin = function() {
		    var win = false;
		    if(false && this.finalPuit.blob > 0) {
		        win = true;
		    }
		    return win;
		}

		return Map;
	}();
})();
