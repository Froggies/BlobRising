(function() {

	"use strict";

	app.Game = function() {

		var loop;
		var isRun;
		var listSerializedMap;
		var currentIndexMap;
		var currentMap;
		var canvas;

		function Game(listSeralizedMap, canvas) {
			this.loop = {};
			this.isRun = false;
			this.currentIndexMap = 0;
			this.listSerializedMap = listSeralizedMap;
			this.canvas = canvas;
			this.currentMap = new app.Map();
			this.currentMap.shape.width = canvas.width;
			this.currentMap.shape.height = canvas.height;
			this.currentMap.draw(canvas.getContext('2d'));
		}

		Game.prototype.start = function() {
		    this.currentMap.deserialize(this.listSerializedMap[this.currentIndexMap]);
		    var instance = this;
			this.loop = setInterval(function() {
			    instance.canvas.width = instance.canvas.width;//clear
			    var context = instance.canvas.getContext('2d');
			    instance.currentMap.draw(context);
			    instance.currentMap.staticEntities[0].shape.x = instance.currentMap.staticEntities[0].shape.x + 1;
			    instance.currentMap.draw(context);
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
