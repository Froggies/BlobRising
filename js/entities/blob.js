(function() {

	"use strict";

    var 
		Entity = app.entities.Entity,
		inherit = app.js.inherit,
		isDefined = app.js.isDefined;

	app.entities.Blob = function() {

		inherit(Blob, Entity);
		
		var timeToLive = 0;
		var imAlive = true;
		
		function Blob() {
			Blob.super.constructor.apply(this);
		};
		
		Blob.prototype.defineTimeToLive = function(time) {
		    this.timeToLive = time;
		}

		Blob.prototype.draw = function(context, map) {
			Blob.super.draw.call(this, context);
			console.log("##########blob::draw::enter");
			if(isDefined(this.timeToLive) && isDefined(map)) {
			    console.log("##########blob::draw::beforebirthday");
			    this.birthday(map);
			    
			    if(this.isBirthday() && imAlive) {
			        console.log("##########blob::draw::IMALIVE");
			        var time = this.timeToLive-10;
			        if(time > 10000) {
			            console.log("##########blob::draw::SUBBLOB");
			            var subblob = new app.entities.Blob();
		                subblob.defineTimeToLive(time);
		                subblob.shape = new app.shapes.Rectangle(this.shape.x-time,this.shape.y-time,time,time);
		                map.staticEntities.push(subblob);
		            }
			    }
			} else {
			    var subblob = new app.entities.Blob();
		        subblob.defineTimeToLive(30);
		        subblob.shape = new app.shapes.Rectangle(this.shape.x-30,this.shape.y-30,30,30);
		        map.staticEntities.push(subblob);
			}
		};
		
		Blob.prototype.birthday = function(map) {
		    this.timeToLive--;
		    this.shape.width--;
		    this.shape.height--;
		    if(this.timeToLive == 0) {
		        this.dead(map);
		    }
		}
		
		Blob.prototype.isBirthday = function() {
		    return this.timeToLive % 10 == 0;
		}
		
		Blob.prototype.dead = function(map) {
		    imAlive = false;
		    console.log("##########blob::dead::IMDEAD");
		    app.js.arrayRemove(map.staticEntities, this);
		}

		return Blob;

	}();
})();

