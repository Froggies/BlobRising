(function() {

	"use strict";

	// imports
	var 
		isDefined = app.js.isDefined,
		Entity = app.entities.Entity;

		var loop;
		var isRun;
		var listSerializedMap;
		var currentIndexMap;
		var currentMap;
		var canvas;
		var context;

	app.Game = function() {

		function Game(listSeralizedMap, canvas) {
			this.loop = {};
			this.currentIndexMap = 0;
			this.listSerializedMap = listSeralizedMap;
			this.canvas = canvas;
			this.context = canvas.getContext('2d');
			this.init();
		}

		/*Game.prototype.start = function() {
		    var instance = this;
			this.loop = setInterval(function() {
			    instance.canvas.width = instance.canvas.width;//clear
			    var context = instance.canvas.getContext('2d');
			    instance.currentMap.draw(context);
			    instance.currentMap.staticEntities[0].shape.x = instance.currentMap.staticEntities[0].shape.x + 1;
			    instance.currentMap.draw(context);
		    });
		}*/

		Game.prototype.init = function() {
			this.currentMap = new app.Map();
			this.currentMap.deserialize(this.listSerializedMap[this.currentIndexMap]);
			this.currentMap.shape.width = this.canvas.width;
			this.currentMap.shape.height = this.canvas.height;
			this.currentMap.draw(this.context);
		}

		Game.prototype.clear = function() {
			this.context.canvas.width = this.context.canvas.width;
		}

		Game.prototype.start = function() {
			var that = this;
			this.loop = setInterval(function() {
				that.clear();
				that.currentMap.draw(that.context);
			}, 1000/50);
			this.isRun = true;
		}
		
		Game.prototype.end = function() {
		    clearInterval(this.loop);
		    this.isRun = false;
		    if(this.currentMap.isWin() && this.currentIndexMap < this.listSerializedMap.length) {
		        //game win
		        this.currentIndexMap = this.currentIndexMap + 1;
		    } else if(this.currentMap.isWin()) {
		        //map win
		    } else {
		        //map loose
		    }
		}

		return Game;
	}();
})();
