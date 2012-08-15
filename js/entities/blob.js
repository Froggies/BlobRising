(function() {

	"use strict";

    var 
		Entity = app.entities.Entity,
		inherit = app.js.inherit,
		isDefined = app.js.isDefined;

	app.entities.Blob = function() {

		inherit(Blob, Entity);
		
		var age = 0;
		var timeToLive;
		var lostNb = 1;
		var lostTime = 20;
		var imAlive = true;
		
		function Blob() {
			Blob.super.constructor.apply(this);
			this.age = 0;
			this.lostNb = 1;
			this.lostTime = 10;
			this.imAlive = true;
		};
		
		Blob.prototype.defineTimeToLive = function(time) {
		    this.timeToLive = time;
		}
		
		Blob.prototype.update = function(translation) {
		    if(!isDefined(this.timeToLive)) {
		        Blob.super.update.call(this, translation);
		    }
		}

		Blob.prototype.draw = function(context, map) {
			Blob.super.draw.call(this, context);
			this.incrementMyAge(map);
			if(this.isBirthday() && !isDefined(this.timeToLive)) {
			    var subblob = new app.entities.Blob();
		        subblob.defineTimeToLive(30);
		        subblob.shape = new app.shapes.Rectangle(this.shape.x-30,this.shape.y-30,30,30);
		        map.staticEntities.push(subblob);
			}
		};
		
		Blob.prototype.incrementMyAge = function(map) {
		    this.age++;
		    if(isDefined(this.timeToLive) && isDefined(map)) {
		        this.timeToLive--;
		        this.shape.width--;
		        this.shape.height--;
		        if(this.timeToLive <= 0) {
		            this.dead(map);
		        }
	        }
		}
		
		Blob.prototype.isBirthday = function() {
		    return this.age % this.lostTime == 0 && this.imAlive;
		}
		
		Blob.prototype.dead = function(map) {
		    this.imAlive = false;
		    app.js.arrayRemove(map.staticEntities, this);
		}

		return Blob;

	}();
})();

