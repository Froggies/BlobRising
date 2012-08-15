(function() {

	"use strict";

    var 
		Entity = app.entities.Entity,
		inherit = app.js.inherit,
		isDefined = app.js.isDefined;

	app.entities.Source = function() {

		inherit(Source, Entity);
		
		var nbBlob;
		var age;
		var lostNb;
		var lostTime;
		
		function Source() {
			Source.super.constructor.apply(this);
			this.nbBlob = 10;
			this.age = 0;
		    this.lostTime = 8000;
		};
		
		Source.prototype.update = function(translation, map) {
		    // physic do nothing
			if(this.isBirthday() && this.nbBlob > 0) {
			    this.nbBlob--;
			    var subblob = new app.entities.Blob();
		        subblob.shape = new app.shapes.Rectangle(this.shape.x+30,this.shape.y+30,30,30);
		        subblob.init();
		        map.staticEntities.push(subblob);
			}
			this.incrementMyAge(map);
		}
		
		Source.prototype.incrementMyAge = function(map) {
		    this.age++;
		}
		
		Source.prototype.isBirthday = function() {
		    return this.age % this.lostTime == 0;
		}
		
		return Source;

	}();
})();
