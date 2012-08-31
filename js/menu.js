(function() {

	"use strict";

	app.Menu = function() {

		function Menu(game) {
		    this.game = game;
		    this.nbWell = 10;
		    this.isFirstAddWell = true;
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
                    console.log("Character typed: " + charCode);
                    if(charCode == 32) {
                        var helpDiv = document.getElementById('mainMenu');
                        if(game.isRun) {
	                        game.pause();
	                        helpDiv.style.display = 'block';
	                    } else {
	                        game.start();
	                        helpDiv.style.display = 'none';
                        }
                    } else if(charCode == 109) {
                        game.timeLoop++;
                        game.pause();
                        game.start();
                    }  else if(charCode == 108) {
                        game.timeLoop--;
                        game.pause();
                        game.start();
                    } else if(charCode == 115) {
                        game.currentMap.showNoneEntities = !game.currentMap.showNoneEntities;
	                    if(!game.currentMap.showNoneEntities) {
	                        game.currentMap.noneEntities = [];
	                    }
	                    game.clear();
	                    game.currentMap.draw(game.context, false);
                    }  else if(charCode == 120) {
                        if(that.isFirstAddWell) {
                            that.isFirstAddWell = false;
                            var helpDiv = document.getElementById('mainMenu');
                            var oldInnerHtml = helpDiv.innerHTML;
                            var oldDisplay = helpDiv.style.display;
                            helpDiv.innerHTML = "Move your mouse and then click to add well !" 
                            helpDiv.style.display = 'block';
                            game.canvas.addEventListener(
                                "mousedown", 
                                function(event) {
                                    helpDiv.innerHTML = oldInnerHtml;
                                    helpDiv.style.display = oldDisplay;
                                },
                                false);
                        }
                        that.addWell(game);
                    }
                }
            };
		};
		
		Menu.prototype.addWell = function(game) {
		    if(this.nbWell > 0) {
		        this.nbWell--;
                var canvas = game.canvas;
                var x = -100;
                var y = -100;
		        var entity = new app.entities.Well();
		        entity.shape.x = x;
		        entity.shape.y = y;
		        entity.draw(game.context);
		        this.entitySelected = entity;
		        game.currentMap.staticEntities.push(entity);
            }
		}
		
		Menu.prototype.onCanvasMove = function(event) {
		    var canvas = this.game.canvas;
            var x = event.clientX-document.documentElement.scrollLeft-canvas.offsetLeft;
            var y = event.clientY-document.documentElement.scrollTop-canvas.offsetTop;
            if(app.js.isDefined(this.entitySelected)) {
	            this.entitySelected.shape.x = x - this.entitySelected.shape.width / 2;
	            this.entitySelected.shape.y = y - this.entitySelected.shape.height / 2;
	            this.game.clear();
	            this.game.currentMap.draw(this.game.context, false);
	            this.entitySelected.shape.draw(this.game.context);
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
		
		return Menu;

	}();
})();

