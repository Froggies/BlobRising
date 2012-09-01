(function() {

	"use strict";

	app.Menu = function() {

		function Menu(game) {
		    this.game = game;
		    this.nbWell = 10;
		    this.nbWellInit = 10;
		    this.isFirstAddWell = true;
		    this.scoreDiv = document.getElementById('score');
		    this.helpDiv = document.getElementById('mainMenu');
            this.firstInnerHTML = this.helpDiv.innerHTML;
            this.firstDisplay = this.helpDiv.style.display;
            var that = this;
            
            this.game.canvas.addEventListener(
                "mousemove", 
                function(event) {app.Menu.prototype.onCanvasMove.call(that, event);},
                false);
                
            this.game.canvas.addEventListener(
                "mousedown", 
                function(event) {app.Menu.prototype.onCanvasClick.call(that, event);},
                false);
            
            document.onkeypress = function(e) {
                e = e || window.event;
                var charCode = (typeof e.which == "number") ? e.which : e.keyCode;
                if (charCode) {
                    // console.log("Character typed: " + charCode);
                    if(charCode == 32) {
                        if(game.isRun) {
	                        game.pause();
	                        that.showHelp();
	                    } else {
	                        game.start();
	                        that.hideHelp();
                        }
                    } else if(charCode == 109) {
                        that.showHelp("Speed : " + game.timeLoop, 500);
                        game.timeLoop += 10;
                        if(game.isRun) {
                            game.pause();
                            game.start();
                        }
                    }  else if(charCode == 108) {
                        that.showHelp("Speed : " + game.timeLoop, 500);
                        if(game.timeLoop > 0) {
                            game.timeLoop -= 10;
                            if(game.isRun) {
                                game.pause();
                                game.start();
                            }
                        }
                    } else if(charCode == 115) {
                        game.currentMap.showNoneEntities = !game.currentMap.showNoneEntities;
	                    if(!game.currentMap.showNoneEntities) {
	                        game.currentMap.noneEntities = [];
	                    }
	                    game.clear();
	                    game.currentMap.draw(game.context, false);
                    } else if(charCode == 120) {
                        if(that.isFirstAddWell === true) {
                            that.isFirstAddWell = false;
                            that.showHelp("Move your mouse and then click to add well !", "mousedown");
                        }
                        that.addWell(game);
                    }
                }
            };
		}
		
		Menu.prototype.showHelp = function(msg, time) {
            this.helpDiv.style.display = 'block';
		    if(!app.js.isDefined(msg) && !app.js.isDefined(time)) {//normal logo
		        this.scoreDiv.style.display = 'block';
		        this.helpDiv.innerHTML = this.firstInnerHTML;
	        } else if(time === "mousedown") {
	            this.helpDiv.innerHTML = msg;
	            var that = this;
	            this.game.canvas.addEventListener(
                    "mousedown", 
                    function(event) {
                        that.hideHelp();
                        that.game.canvas.removeEventListener(this);
                    },
                    false);
		    } else {
		        clearTimeout(this.timeout);
		        this.helpDiv.innerHTML = msg;
		        var that = this;
                this.timeout = setTimeout(
                    function(event) {
                        that.hideHelp();
                    }, time);
		    }
		}
		
		Menu.prototype.hideHelp = function() {
		    if(this.game.isRun) {
		        this.helpDiv.style.display = 'none';
                this.scoreDiv.style.display = 'none';
            } else {
                //return to standard menu
                this.showHelp();
            }
		}
		
		Menu.prototype.addWell = function(game) {
		    if(this.nbWell > 0) {
		        this.nbWell--;
                var canvas = game.canvas;
                var x = -100;
                var y = -100;
		        var entity = app.js.clone(game.currentMap.menuWell);
		        entity.shape.x = x;
		        entity.shape.y = y;
		        entity.draw(game.context);
		        entity.isFromMenu = true;
		        this.entitySelected = entity;
		        game.currentMap.staticEntities.push(entity);
            }
		}
		
		Menu.prototype.onCanvasMove = function(event) {
		    var canvas = this.game.canvas;
            var x = event.clientX-document.documentElement.scrollLeft-canvas.offsetLeft;
            var y = event.clientY-document.documentElement.scrollTop-canvas.offsetTop;
            if(app.js.isDefined(this.entitySelected) && this.entitySelected.imAlive) {
	            this.entitySelected.shape.x = x - this.entitySelected.shape.width / 2;
	            this.entitySelected.shape.y = y - this.entitySelected.shape.height / 2;
	            this.game.clear();
	            this.game.currentMap.draw(this.game.context, false);
	            this.entitySelected.shape.draw(this.game.context);
	            this.showHelp("Well : " + this.nbWell + "/" + this.nbWellInit, 1000);
            }
        }
        
        Menu.prototype.onCanvasClick = function(event) {
		    var canvas = this.game.canvas;
            var x = event.clientX-document.documentElement.scrollLeft-canvas.offsetLeft;
            var y = event.clientY-document.documentElement.scrollTop-canvas.offsetTop;
		    if(!app.js.isDefined(this.entitySelected)) {
	          var entitiesCount = this.game.currentMap.staticEntities.length;
	          var found = false;
	          for(var i=0; i<entitiesCount && !found; i++) {
	            var entity = this.game.currentMap.staticEntities[i];
	            if(this.isClick(entity, x, y)) {
	                found = true;
	                this.entitySelected = entity;
	            }
	          }  
	        } else if(app.js.isDefined(this.entitySelected)) {
	            this.entitySelected.shape.x = x;
	            this.entitySelected.shape.y = y;
	            this.game.currentMap.staticEntities.push(this.entitySelected);
	            this.game.clear();
	            this.game.currentMap.draw(this.game.context, false);
	            this.entitySelected = null;
	        }
		}
		
		Menu.prototype.isClick = function(entity, x, y) {
		    if(entity.isFromMenu === true) {
                var h = 1;
                var l = 1;
		        
		        var x2 = entity.shape.x;
                var y2 = entity.shape.y;
                var h2 = entity.shape.height;
                var l2 = entity.shape.width;
                        
                if(x2+l2 < x || x2 > x+l || y2+h2 < y || y2 > y+h) {
                    return false;
                } else {                         
                    return true;
                }
            }
            return false;
		}
		
		return Menu;

	}();
})();

