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
			this.nbBlob = 1;
		    this.lostTime = 100;
		    this.maxAge = 100;
		    this.degreeBlob = 120;
		    this.firstAgeForLostBlob = 300;
		    this.shape = new app.shapes.Rectangle(0,0,50,35,true,"#00FFFF","img/source.gif");
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
			else if(this.age < this.firstAgeForLostBlob && this.age % 100 == 0) {
			    var divTime = document.getElementById('startBlob');
			    divTime.style.display = 'block';
			    divTime.style.top = this.shape.y + 'px';
			    divTime.style.left = this.shape.x + 'px';
			    divTime.innerHTML = this.firstAgeForLostBlob/100 - this.age/100;
			} else if(this.age >= this.firstAgeForLostBlob) {
			    var divTime = document.getElementById('startBlob');
			    divTime.style.display = 'none';
			}
			Source.parent.update.call(this, translation, map);
		}
		
		Source.prototype.isBirthday = function() {
		    return this.age >= this.firstAgeForLostBlob && this.age % this.lostTime == 0;
		}
		
		return Source;

	}();
})();
