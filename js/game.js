(function() {

	"use strict";

	app.Game = function() {

		function Game(listSeralizedMap, canvas) {
		    this.endOfGameDiv = document.getElementById('endOfGame');
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
			this.menu.init(this.currentMap);
		}

		Game.prototype.clear = function() {
			this.context.canvas.width = this.context.canvas.width;
		}

		Game.prototype.start = function() {
			var that = this;
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
		}
		
		Game.prototype.end = function() {
		    var that = this;
		    this.pause();
		    if(this.currentMap.isWin() && this.currentIndexMap + 1 < this.listSerializedMap.length) {
		        //map win
		        this.calculScore();
		       
                this.createPopup("Congrats ! You won this level !! <br :/> <br />You won by saving  "+this.currentMap.endWell.nbBlob+" Blobs. <br />In this level your score is : "+this.scoreLastMap+" points. <br /> <br />Let's see how you will deal with the next level !<br /> <div style='float:right'><div id='replayLevel' class='button'>Replay level</div><div id='nextLevel' class='button'>Next level</div></div>");
		    } else if(this.currentMap.isWin()) {
		        //game win
		        window.alert("YOU WIN GAME !! With "+this.score+" Blob");
		    } else {
		        //map loose
		        this.score = this.score - 100;
		        this.createPopup("Unfortunatly you lost this level... <br /> <br />In this level your score is : -100 points. <br />Try again to save Blobs ! <div id='replayLevel' class='button'>Replay level</div>");
		    }
		    document.getElementById('score').innerHTML = "Score : "+this.score+" Blob";
		}
		
        Game.prototype.onNextLevelClick = function(event) {	
		      this.currentIndexMap = this.currentIndexMap + 1;
              this.createStartGame();
        }	
        
        Game.prototype.onReplayLevelClick = function(event) {	
              this.createStartGame();
        }
        
        Game.prototype.createStartGame = function() {	
		      this.endOfGameDiv.style.display = "none";
              var showNoneEntities = this.currentMap.showNoneEntities;
              this.clear();
              this.init();
		      this.currentMap.showNoneEntities = showNoneEntities;
		      this.start();
        }
        
        Game.prototype.createPopup = function(text) {
            var that = this;
            this.endOfGameDiv.innerHTML = text;
	        this.endOfGameDiv.style.display = "block";
            
			this.endOfGameNextLevel = document.getElementById('nextLevel');
            if(app.js.isDefined(this.endOfGameNextLevel)) {
		        this.endOfGameNextLevel.addEventListener(
                    "mousedown", 
                    function(event) {app.Game.prototype.onNextLevelClick.call(that, event);},
                    false);
            }
	        
	        this.endOfGameReplayLevel = document.getElementById('replayLevel');
	        this.endOfGameReplayLevel.addEventListener(
                "mousedown", 
                function(event) {app.Game.prototype.onReplayLevelClick.call(that, event);},
                false);
        }
        
		Game.prototype.calculScore = function() {
		    var nbEntitiesUses = 0;//not 0 because startWell is in staticEntities
		    var len = this.currentMap.staticEntities.length;
		    for(var index=0; index<len; index++) {
		        var entity = this.currentMap.staticEntities[index];
		        if(entity.isFromMenu === true) {
		            nbEntitiesUses++;
		        }
		    }
		    var nbEntitiesInit = this.currentMap.menuRotate.nb + this.currentMap.menuMagnet.nb;
		    var nbBlobDead = this.currentMap.nbBlobDead - this.currentMap.endWell.nbBlob;
		    //calcul score : (nbBlobArrivés * 100 + (wellDépart - wellUtilisées) * 100) - (nbBlobMorts * 100)
		    this.scoreLastMap = (this.currentMap.endWell.nbBlob * 100 + (nbEntitiesInit - nbEntitiesUses) * 100) - (nbBlobDead * 100);
		    this.score += this.scoreLastMap;
		}

		return Game;
	}();
})();
