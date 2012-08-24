(function() {

	"use strict";

    var 
		Entity = app.entities.Entity,
		inherit = app.js.inherit,
		isDefined = app.js.isDefined;

	app.entities.Source = function() {

		inherit(Source, Entity);
		
		function Source() {
			Source.parent.constructor.apply(this);
			this.nbBlob = 100;
		    this.lostTime = 100;
		};
		
		Source.prototype.update = function(translation, map) {
			if(this.isBirthday() && this.nbBlob > 0) {
			    this.nbBlob--;
			    var subblob = new app.entities.Blob();
		        subblob.shape = new app.shapes.Ellipse(this.shape.x,this.shape.y,30,30);
		        subblob.shape.gradient = true;
		        subblob.shape.color = "#00FF00";
		        subblob.shape.fill = false;
		        subblob.init();
		        map.blobEntities.push(subblob);
			}
			Source.parent.update.call(this, translation, map);
		}
		
		Source.prototype.isBirthday = function() {
		    return this.age % this.lostTime == 0;
		}
		
		return Source;

	}();
})();
