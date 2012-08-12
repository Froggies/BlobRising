(function() {

	"use strict";

	app.Game = function() {

		var loop;
		var isRun;
		var listSerializedMap;
		var currentIndexMap;
		var currentMap;
		var drawContext;

		function Game(listSeralizedMap, drawContext) {
			this.loop = {};
			this.isRun = false;
			this.currentIndexMap = 0;
			this.listSerializedMap = listSeralizedMap;
			this.drawContext = drawContext;
		}

		Game.prototype.start = function() {
		    this.currentMap = new app.Map(this.listSerializedMap[this.currentIndexMap]);
		    this.currentMap.draw(this.drawContext);
			this.loop = setInterval(function() {
			    console.log("loop game");
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
