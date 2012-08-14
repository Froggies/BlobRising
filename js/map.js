(function() {

	"use strict";
	
	var stringToClass = app.js.stringToClass;

	app.Map = {};

    var shape;
    var staticEntities;
    var menuEntities;

	app.Map = function() {

		function Map() {
		    this.shape = new app.shapes.Rectangle();
		    this.shape.x = 0;
		    this.shape.y = 0;
			this.staticEntities = [];
			this.menuEntities = [];
		}
		
		Map.prototype.draw = function(context) {
		    this.shape.draw(context);
		    for(var entityIndex in this.staticEntities) {
		        var entity = this.staticEntities[entityIndex];
		        entity.context = context;
		        console.log("map::deserialize::draw");
		        console.log(entity);
		        entity.update($V([1, 1]));
		        if(entity instanceof app.entities.Blob) {
		            entity.draw(context, this);
		        } else {
		            entity.draw(context);
		        }
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
