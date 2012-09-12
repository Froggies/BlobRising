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
		    
	        var deb = "Congrats ! You won";
	        var bySaving = "<br /> <br />You won by saving  "+this.currentMap.endWell.nbBlob+" Blobs. <br />";
	        var strPoints = " points. <br /> <br />";
	        var divReplay = "<div id='replayLevel' class='button'>Replay level</div>";
	        var divTweetDeb = "<div id='tweetScore' class='button btnTweet'><a href='";
	        var endPopup = "' target='_blank'>Tweet my score</a></div></div>";
	        var strLevelScore = "In this level your score is :";


		    if(this.currentMap.isWin() && this.currentIndexMap + 1 < this.listSerializedMap.length) {
		        //map win
	            this.calculScore();
                this.createPopup(deb+" this level !! "+bySaving+strLevelScore+this.scoreLastMap+strPoints+"Let's see how you will deal with the next level !<br /> <div style='float:right'>"+divReplay+"<div id='nextLevel' class='button'>Next level</div>"+divTweetDeb+this.createTweetUrl(false, this.currentIndexMap, this.scoreLastMap, this.currentMap.endWell.nbBlob)+endPopup);
		    } else if(this.currentMap.isWin()) {
		        //game win
		        this.createPopup(deb+" the Blob Rising game !! "+bySaving+"Your final score is : "+this.scoreLastMap+strPoints+"<div style='float:right'>"+divReplay+"<div id='replayGame' class='button'>Replay game</div>"+divTweetDeb+this.createTweetUrl(true, this.currentIndexMap,this.scoreLastMap,this.currentMap.endWell.nbBlob)+endPopup);
		    } else {
		        //map loose
		        this.score = this.score - 100;
		        this.createPopup("Unfortunately you lost this level... <br /> <br />"+strLevelScore+this.score+strPoints+" <br />Try again to save Blobs ! <br /><div style='float:right'>"+divReplay+divTweetDeb+this.createTweetUrl(false,this.currentIndexMap,this.score,this.currentMap.endWell.nbBlob)+endPopup);
		    }
		    document.getElementById('score').innerHTML = "Score : "+this.score+" Blob";
		}
		
		Game.prototype.createTweetUrl = function(isEndGame, numLevel, score, nbBlobSaved) {
		    var urlTweeterIntent = "https://twitter.com/intent/tweet?text=I played Blob Rising";
		    var endOfUrl = " with "+score+" points. I saved "+nbBlobSaved+" Blobs. Try it yourself !&url=http://blobrising.github.com/BlobRising/&via=BlobRising&related=BlobRising";
		    if (isEndGame) {
		        return encodeURI(urlTweeterIntent+" and I won the game"+endOfUrl);
		    }
		    else {
		        return encodeURI(urlTweeterIntent+", I have done the level "+numLevel+endOfUrl);
		    }
		}
		
		
        Game.prototype.onNextLevelClick = function(event) {	
		      this.currentIndexMap = this.currentIndexMap + 1;
              this.createStartGame();
        }	
        
        Game.prototype.onReplayLevelClick = function(event) {	
              this.createStartGame();
        }
        
        Game.prototype.onReplayGameClick = function(event) {	
              this.createStartGame();
        }
        
        Game.prototype.onTweetScoreClick = function(event) {	
              
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
                this.endOfGameNextLevel.style.display = 'inline-block';
		        this.endOfGameNextLevel.addEventListener(
                    "mousedown", 
                    function(event) {app.Game.prototype.onNextLevelClick.call(that, event);},
                    false);
            }
            
            this.endOfGameReplayGame = document.getElementById('replayGame');
            if(app.js.isDefined(this.endOfGameReplayGame)) {
                this.endOfGameReplayGame.style.display = 'inline-block';
		        this.endOfGameReplayGame.addEventListener(
                    "mousedown", 
                    function(event) {app.Game.prototype.onReplayGameClick.call(that, event);},
                    false);
            }
            
            this.endOfGameTweetScore = document.getElementById('tweetScore');
            if(app.js.isDefined(this.endOfGameTweetScore)) {
                this.endOfGameTweetScore.style.display = 'inline-block';
		        this.endOfGameTweetScore.addEventListener(
                    "mousedown", 
                    function(event) {app.Game.prototype.onTweetScoreClick.call(that, event);},
                    false);
            }
	        
	        this.endOfGameReplayLevel = document.getElementById('replayLevel');
	        if(app.js.isDefined(this.endOfGameTweetScore)) {
	            this.endOfGameReplayLevel.style.display = 'inline-block';
	            this.endOfGameReplayLevel.addEventListener(
                    "mousedown", 
                    function(event) {app.Game.prototype.onReplayLevelClick.call(that, event);},
                    false);
            }
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
