(function() {

	"use strict";

    var 
		Entity = app.entities.Entity,
		inherit = app.js.inherit,
		isDefined = app.js.isDefined;

	app.entities.Source = function() {

		inherit(Source, Entity);
		
		var nbBlob;
		var lostNb;
		var lostTime;
		
		function Source() {
			Source.super.constructor.apply(this);
			this.nbBlob = 100;
		    this.lostTime = 100;
		};
		
		Source.prototype.update = function(translation, map) {
			if(this.isBirthday() && this.nbBlob > 0) {
			    this.nbBlob--;
			    var subblob = new app.entities.Blob();
		        subblob.shape = new app.shapes.Rectangle(this.shape.x+30,this.shape.y+30,30,30);
		        subblob.init();
		        map.blobEntities.push(subblob);
			}
			Source.super.update.call(this, translation, map);
		}
		
		Source.prototype.isBirthday = function() {
		    return this.age % this.lostTime == 0;
		}
		
		return Source;

	}();
})();
