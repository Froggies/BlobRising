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
		    this.maxAge = 100;
		    this.shape = new app.shapes.Rectangle(0,0,50,50,true,true,"#00FFFF");
		    this.timeToLostMolecule = Number((this.maxAge / this.nbBlob).toFixed(0));
		};
		
		Source.prototype.update = function(translation, map) {
			if(this.isBirthday() && this.nbBlob > 0) {
			    this.nbBlob--;
			    var subblob = new app.entities.Blob(30,30,Math.floor(Math.random()*361));
		        subblob.shape.x = this.shape.x;
		        subblob.shape.y = this.shape.y;
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
