(function() {

	"use strict";

	app.Menu = function() {

		function Menu(game) {
		    this.game = game;
		    this.isFirstAddWell = true;
		    this.scoreDiv = document.getElementById('score');
		    this.helpDiv = document.getElementById('mainMenu');
		    this.endOfGameDiv = document.getElementById('endOfGame');
		    this.startBlobDiv = document.getElementById('startBlob');
		    this.endOfGameDiv.style.display = "none";
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
                    //console.log("Character typed: " + charCode);
                    if(charCode == 32) {
                        if(game.isRun && !game.currentMap.isFinish()) {
	                        game.pause();
	                        that.showHelp();
	                    } else if(!game.currentMap.isFinish()) {
	                        game.start();
	                        that.showMapName();
                        }
                    } else if(charCode == 114) {
                        game.pause();
                        that.showHelp();
                        game.restart();
                        game.init();
                    } else if(charCode == 38) {
                        game.currentIndexMap++;
                        game.init();
                    } else if (charCode == 108) {
                        game.clear();
                        game.init();
                        game.start();  
           			    that.showMapName();
                        that.showHelp("This level has been restarted", "1000");                
                    } else if(game.isRun) {
                        if(charCode == 115) {
                            game.currentMap.showNoneEntities = !game.currentMap.showNoneEntities;
	                        if(!game.currentMap.showNoneEntities) {
	                            game.currentMap.noneEntities = [];
	                        }
	                        game.currentMap.staticBuffering = false;
	                        game.clear();
	                        game.currentMap.draw(game.context, false);
                        } else if(charCode == 120 || charCode == 99) {
                            if(that.isFirstAddWell === true) {
                                that.isFirstAddWell = false;
                                that.showHelp("Move your mouse and then click to add well !", "mousedown");
                            }
                            if(charCode == 120) {
                                if(that.nbRotate > 0) {
                                    that.addEntity(game, app.js.clone(game.currentMap.menuRotate));
                                } else {
                                    that.showHelp("You have no more rotate machine !", "1000");
                                }
                            } else {
                                if(that.nbMagnet > 0) {
                                    that.addEntity(game, app.js.clone(game.currentMap.menuMagnet));
                                } else {
                                    that.showHelp("You have no more magnet machine !", "1000");
                                }
                            }
                        }
                    }
                }
            };
		}
		
		Menu.prototype.init = function(map) {
		    this.nbRotate = map.menuRotate.nb;
		    this.nbRotateInit = this.nbRotate;
		    this.nbMagnet = map.menuMagnet.nb;
		    this.nbMagnetInit = this.nbMagnet;
		    this.updateMenuEntities();
		}
		
		Menu.prototype.showMapName = function() {
		    this.showHelp("You are on <div class='keyboard'>"+this.game.currentMap.mapName+"</div> map", 3000);
		}
		
		Menu.prototype.addEntity = function(game, entity) {
		    if(this.entitySelected != null && this.entitySelected.hasPosed) {
		        this.showHelp("You must put your machine before add another !", "1000");
		    } else {
                var canvas = game.canvas;
                var x = -1000;
                var y = -1000;
	            entity.shape.x = x;
	            entity.shape.y = y;
	            entity.draw(game.context, game.currentMap);
	            entity.isFromMenu = true;
	            entity.isDraggable = true;
	            this.entitySelected = entity;
	            entity.draggable = true;
	            entity.hasPosed = false;
	            game.currentMap.menuEntities = [];
	            //just for see it ! 
	            //it really added (recalcul staticEntities tab with map.addEntity()) in mousedown
	            game.currentMap.menuEntities.push(entity);
            }
		}
		
		Menu.prototype.showHelp = function(msg, time) {
            this.helpDiv.style.display = 'block';
            this.lastStartBlobDiv = this.startBlobDiv.style.display;
		    if(!app.js.isDefined(msg) && !app.js.isDefined(time)) {//normal menu
		        this.startBlobDiv.style.display = 'none';
		        this.helpDiv.className = "mainMenu";
		        this.scoreDiv.style.display = 'block';
		        this.helpDiv.innerHTML = this.firstInnerHTML;
	        } else {
	            this.helpDiv.className = "helpInGame";
	            if(time === "mousedown") {
	                this.helpDiv.innerHTML = msg;
	                var that = this;
	                this.game.canvas.addEventListener(
                        "mousedown", 
                        function(event) {
                            that.hideHelp();
                            //that.game.canvas.removeEventListener("mousedown", this, false);
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
		}
		
		Menu.prototype.hideHelp = function() {
		    if(this.game.isRun) {
		        this.startBlobDiv.style.display = this.lastStartBlobDiv;
		        this.helpDiv.style.display = 'none';
                this.scoreDiv.style.display = 'none';
            }
            else if (!this.game.currentMap. isFinish()){
                //return to standard menu
                this.showHelp();
            }
		}
		
		Menu.prototype.updateMenuEntities = function() {
            document.getElementById("nbMenuRotate").innerHTML = this.nbRotate + "/" + this.nbRotateInit;
            document.getElementById("nbMenuMagnet").innerHTML = this.nbMagnet + "/" + this.nbMagnetInit;
        }
		
		Menu.prototype.onCanvasMove = function(event) {
		    var canvas = this.game.canvas;
            var x = event.clientX-document.documentElement.scrollLeft-canvas.offsetLeft;
            var y = event.clientY-document.documentElement.scrollTop-canvas.offsetTop;
            if(app.js.isDefined(this.entitySelected) && this.entitySelected.imAlive) {
	            this.setEntityPosition(x,y);
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
	                app.js.arrayRemove(this.game.currentMap.staticEntities, this.entitySelected);
	                this.game.currentMap.staticBuffering = false;
	                this.game.currentMap.menuEntities.push(this.entitySelected);
	                this.game.currentMap.clearIterators();
	            }
	          }  
	        } else if(app.js.isDefined(this.entitySelected)) {
	            if(this.entitySelected.className == "Rotate" && this.entitySelected.hasPosed === false) {
                    this.nbRotate--;
                } else if(this.entitySelected.hasPosed === false) {
                    this.nbMagnet--;
                }
                this.entitySelected.hasPosed = true;
	            this.updateMenuEntities();
	            this.setEntityPosition(x,y);
	            this.entitySelected.draggable = false;
	            app.js.arrayRemove(this.game.currentMap.menuEntities, this.entitySelected);
	            this.game.currentMap.addEntity(this.entitySelected);
	            this.game.clear();
	            this.game.currentMap.draw(this.game.context, false);
	            this.entitySelected = null;
	        }
		}
		
		Menu.prototype.setEntityPosition = function(x, y) {
		    this.entitySelected.shape.x = x - this.entitySelected.shape.width / 2;
	        this.entitySelected.shape.y = y - this.entitySelected.shape.width / 2;
		}
		
		Menu.prototype.isClick = function(entity, x, y) {
		    if(entity.isFromMenu === true && entity.isDraggable === true) {
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

