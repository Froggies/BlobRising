(function() {

	"use strict";

	// imports
	var 
		isDefined = app.js.isDefined,
		Entity = app.entities.Entity;

	app.Game = function() {

		function Game(listSeralizedMap, context) {
			this.loop = {};
			this.currentIndexMap = 0;
			this.context = context;
			this.listSerializedMap = listSeralizedMap;
		}

		Game.prototype.init = function() {
			this.currentMap = new app.Map(this.listSerializedMap[this.currentIndexMap]);
		    this.currentMap.draw(this.context);
			this.entity = new Entity(this.context);
			this.entity.draw();
		}

		Game.prototype.clear = function() {
			var canvas = this.context.canvas;
			this.context.clearRect(
				0, 0, canvas.width, canvas.height
			);
		}

		Game.prototype.start = function() {
			this.init();
			var that = this;
			this.loop = setInterval(function() {
				that.entity.update($V([1, 1]));
				that.clear();
				that.entity.draw();
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
