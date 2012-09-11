(function() {

	"use strict";

	app.Game = function() {

		function Game(listSeralizedMap, canvas) {
			this.listSerializedMap = listSeralizedMap;
			this.canvas = canvas;
			this.context = canvas.getContext('2d');
			this.restart();
		}

        Game.prototype.restart = function() {
            this.loop = {};
			this.currentIndexMap = 0;
			this.score = 0;
        }

		Game.prototype.init = function() {
			this.currentMap = app.js.deserialize(this.listSerializedMap[this.currentIndexMap], new app.Map());
			this.currentMap.resize();
			this.menu.init(this.currentMap);
		}

		Game.prototype.clear = function() {
			this.context.canvas.width = this.context.canvas.width;
		}

		Game.prototype.start = function() {
			var that = this;
			/*this.loop = setInterval(function() {
			    if(!that.currentMap.isFinish()) {
				    that.clear();
				    that.currentMap.draw(that.context, true);
				} else {
				    that.end();
				}
			}, 1000/this.timeLoop);*/
			if(!that.currentMap.isFinish()) {
			    window.requestAnimFrame(function() {
			        if(that.isRun){that.start();}
		        });
			    this.clear();
                this.currentMap.draw(this.context, true);
			    this.isRun = true;
		    } else {
			    that.end();
			}
		}
		
		Game.prototype.pause = function() {
		    this.isRun = false;
		    //clearInterval(this.loop);
		}
		
		Game.prototype.end = function() {
		    this.pause();
		    if(this.currentMap.isWin() && this.currentIndexMap + 1 < this.listSerializedMap.length) {
		        //map win
		        this.calculScore();
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
		
		Game.prototype.calculScore = function() {
		    var nbWellUses = -1;//not 0 because startWell is in staticEntities
		    var len = this.currentMap.staticEntities.length;
		    for(var index=0; index<len; index++) {
		        var entity = this.currentMap.staticEntities[index];
		        if(app.js.getObjectClass(entity) === "Well") {
		            nbWellUses++;
		        }
		    }
		
		    //calcul score : (nbBlobArrivés * 100 + (wellDépart - wellUtilisées) * 100) - (nbBlobMorts * 100)
		    this.score += (this.currentMap.endWell.nbBlob * 100 + (this.currentMap.menuWell.nb - nbWellUses) * 100) - (this.currentMap * 100);
		}

		return Game;
	}();
})();
