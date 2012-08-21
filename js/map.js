(function() {

	"use strict";
	
	var stringToClass = app.js.stringToClass;

	app.Map = {};

    var shape;
    var staticEntities;
    var menuEntities;
    var blobEntities;
    var noneEntities;

	app.Map = function() {

		function Map() {
		    this.shape = new app.shapes.Rectangle();
		    this.shape.x = 0;
		    this.shape.y = 0;
			this.staticEntities = [];
			this.menuEntities = [];
			this.blobEntities = [];
			this.noneEntities = [];
		}
		
		Map.prototype.init = function(context) {
		    var len = this.staticEntities.length;
		    var entity;
		    for(var entityIndex=0; entityIndex<len; entityIndex++) {
		        entity = this.staticEntities[entityIndex];
		        entity.init();
		    }
		}
		
		Map.prototype.draw = function(context, withUpdate) {
		    this.shape.draw(context);
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
		    len = this.noneEntities.length;
		    for(var entityIndex=0; entityIndex<len; entityIndex++) {
		        entity = this.noneEntities[entityIndex];
		        if(app.js.isDefined(entity)) {
		            if(app.js.isDefined(withUpdate) && withUpdate === true) {
                        entity.update($V([1, 1]), this);
                    }
                    entity.draw(context);
                } else {
                    app.js.log(10,"m@n", "TRACE :", this);
                    console.trace();
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
