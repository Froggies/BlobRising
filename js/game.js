(function() {

	"use strict";

	var 
		isDefined = app.js.isDefined,
		Entity = app.entities.Entity;

		var loop;
		var isRun;
		var listSerializedMap;
		var currentIndexMap;
		var currentMap;
		var context;
		var canvas;

	app.Game = function() {

		function Game(listSeralizedMap, canvas) {
			this.loop = {};
			this.currentIndexMap = 0;
			this.listSerializedMap = listSeralizedMap;
			this.canvas = canvas;
			this.context = canvas.getContext('2d');
			this.timeLoop = 50;
			this.init();
		}

		Game.prototype.init = function() {
			this.currentMap = app.js.deserialize(this.listSerializedMap[this.currentIndexMap]);
			this.currentMap.shape.width = this.context.canvas.width;
			this.currentMap.shape.height = this.context.canvas.height;
			this.currentMap.init();
			this.currentMap.draw(this.context, false);
		}

		Game.prototype.clear = function() {
			this.context.canvas.width = this.context.canvas.width;
		}

		Game.prototype.start = function() {
			var that = this;
			this.loop = setInterval(function() {
				that.clear();
				that.currentMap.draw(that.context, true);
			}, 1000/this.timeLoop);
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
