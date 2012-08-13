(function() {

	"use strict";
	
	var stringToClass = app.js.stringToClass;

	app.Map = function() {

        var shape;
        var staticEntities;
        var menuEntities;

		function Map() {
		    this.shape = new app.shapes.Rectangle();
		    this.shape.x = 0;
		    this.shape.y = 0;
			this.staticEntities = [];
			this.menuEntities = [];
		}
		
		Map.prototype.deserialize = function(serializedMap) {
		    for(var entityIndex in serializedMap.staticEntities) {
	            console.log("map::deserialize::deserialize");
	            var entityClass = stringToClass(serializedMap.staticEntities[entityIndex]["class"]);
	            var entity = new entityClass();
	            console.log(entity);
	            entity.deserialize(serializedMap.staticEntities[entityIndex])
	            this.staticEntities.push(entity);
		    }
		    this.finalPuit = {blob:0};
		}
		
		Map.prototype.draw = function(context) {
		    this.shape.draw(context);
		    for(var entityIndex in this.staticEntities) {
		        var entity = this.staticEntities[entityIndex];
		        console.log("map::deserialize::draw");
		        console.log(entity);
		        entity.shape.draw(context);
		    }
		}
		
		Map.prototype.isWin = function() {
		    var win = false;
		    if(this.finalPuit.blob > 0) {
		        win = true;
		    }
		    return win;
		}

		return Map;
	}();
})();
