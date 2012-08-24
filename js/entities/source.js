(function() {

	"use strict";

    var 
		Entity = app.entities.Entity,
		inherit = app.js.inherit,
		isDefined = app.js.isDefined;

	app.entities.Source = function() {

		inherit(Source, Entity);
		
		function Source() {
		    this.class = "Source";
			Source.parent.constructor.apply(this);
			this.nbBlob = 10;
		    this.lostTime = 100;
		    this.maxAge = 100;
		    this.degreeBlob = 120;
		    this.shape = new app.shapes.Rectangle(0,0,50,35,true,true,"#00FFFF");
		    this.timeToLostMolecule = Number((this.maxAge / this.nbBlob).toFixed(0));
		};
		
		Source.prototype.update = function(translation, map) {
			if(this.isBirthday() && this.nbBlob > 0) {
			    this.nbBlob--;
			    var subblob = new app.entities.Blob(30,30,this.degreeBlob);
		        subblob.shape.x = this.shape.x + this.shape.width/2;
		        subblob.shape.y = this.shape.y + this.shape.height/2;
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
