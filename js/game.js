(function() {

	"use strict";

	app.Game = function() {

		function Game(listSeralizedMap, canvas) {
			this.loop = {};
			this.currentIndexMap = 0;
			this.listSerializedMap = listSeralizedMap;
			this.canvas = canvas;
			this.context = canvas.getContext('2d');
			this.timeLoop = 50;
			this.score = 0;
		}

		Game.prototype.init = function() {
			this.currentMap = app.js.deserialize(this.listSerializedMap[this.currentIndexMap], new app.Map());
			this.currentMap.draw(this.context, false);
			this.menu.init(this.currentMap);
		}

		Game.prototype.clear = function() {
			this.context.canvas.width = this.context.canvas.width;
		}

		Game.prototype.start = function() {
			var that = this;
			this.loop = setInterval(function() {
			    if(!that.currentMap.isFinish()) {
				    that.clear();
				    that.currentMap.draw(that.context, true);
				} else {
				    that.end();
				}
			}, 1000/this.timeLoop);
			this.isRun = true;
		}
		
		Game.prototype.pause = function() {
		    this.isRun = false;
		    clearInterval(this.loop);
		}
		
		Game.prototype.end = function() {
		    clearInterval(this.loop);
		    this.isRun = false;
		    if(this.currentMap.isWin() && this.currentIndexMap + 1 < this.listSerializedMap.length) {
		        //map win
		        this.score += this.currentMap.endWell.nbBlob;
		        document.getElementById('score').innerHTML = "Score : "+this.score+" Blob";
		        window.alert("WITH "+this.currentMap.endWell.nbBlob+" BLOB, YOU WIN LEVEL !!");
		        var showNoneEntities = this.currentMap.showNoneEntities;
		        this.currentIndexMap = this.currentIndexMap + 1;
		        this.init();
		        this.currentMap.showNoneEntities = showNoneEntities;
		        this.clear();
		        this.currentMap.draw(this.context, false);
		        this.pause();
		    } else if(this.currentMap.isWin()) {
		        //game win
		        window.alert("YOU WIN GAME !! With "+this.score+" Blob");
		    } else {
		        //map loose
		        window.alert("YOU LOOSE !!");
		        this.score--;
		        this.clear();
		        this.init();
		        this.start();
		    }
		}

		return Game;
	}();
})();
