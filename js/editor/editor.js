(function() {

	"use strict";
	
	app.editor = app.editor || {};

    var isDefined = app.js.isDefined;

	app.editor.Editor = function() {

		function Editor(game) {
		    this.game = game;
		    this.buildSerializationDiv(); 
		    this.buildMenuEntities();
		    this.destroyCurrentMap();
		    this.serialization = new app.editor.Serialization();
		}
		
		Editor.prototype.buildSerializationDiv = function() {
		    var div = this.buildDiv("Serialization");
            var that = this;
            div.onclick = function() {
                that.serialization.show(that.game.currentMap);
            };
            document.body.appendChild(div);
		}
		
		Editor.prototype.buildMenuEntities = function() {
            var that = this;
            this.game.canvas.addEventListener(
                "mousedown", 
                function(event) {app.editor.Editor.prototype.onCanvasClick.call(that, event);},
                false);
            this.game.canvas.addEventListener(
                "mousemove", 
                function(event) {app.editor.Editor.prototype.onCanvasMove.call(that, event);},
                false);
		    var div = this.buildDiv("Source");
            div.onclick = function() {
                if(isDefined(that.entitySelected)) {
                    that.entitySelected = null;
                    that.game.clear();
                    that.game.currentMap.draw(that.game.context, false);
                } else {
                    var objClass = app.js.stringToClass("app.entities.Source");
                    var entity = new objClass();
                    entity.className = "Source";
                    that.entitySelected = entity;
                }
            };
            document.body.appendChild(div);
            div = this.buildDiv("Wall");
            div.onclick = function() {
                if(isDefined(that.entitySelected)) {
                    that.entitySelected = null;
                    that.game.clear();
                    that.game.currentMap.draw(that.game.context, false);
                } else {
                    var objClass = app.js.stringToClass("app.entities.Wall");
                    var entity = new objClass();
                    that.entitySelected = entity;
                }
            };
            document.body.appendChild(div);
            div = this.buildDiv("Well");
            div.onclick = function() {
                if(isDefined(that.entitySelected)) {
                    that.entitySelected = null;
                    that.game.clear();
                    that.game.currentMap.draw(that.game.context, false);
                } else {
                    var objClass = app.js.stringToClass("app.entities.Well");
                    var entity = new objClass();
                    that.entitySelected = entity;
                }
            };
            document.body.appendChild(div);
		}
		
		Editor.prototype.destroyCurrentMap = function() {
		    this.game.listSerializedMap = [""];
		    this.game.init();
		    this.game.currentMap.draw(this.game.context, false);
		}
		
		Editor.prototype.onCanvasClick = function(event) {
		    var canvas = this.game.canvas;
            var x = event.clientX-document.documentElement.scrollLeft-canvas.offsetLeft;
            var y = event.clientY-document.documentElement.scrollTop-canvas.offsetTop;
		    if(!isDefined(this.entitySelected)) {
	          var entitiesCount = this.game.currentMap.staticEntities.length;
	          var found = false;
	          for(var i=0; i<entitiesCount && !found; i++) {
	            var entity = this.game.currentMap.staticEntities[i];
	            if(this.isClick(entity, x, y)) {
	                found = true;
	                this.entitySelected = entity;
	            }
	          }  
	        } else if(isDefined(this.entitySelected)) {
	            this.entitySelected.shape.x = x;
	            this.entitySelected.shape.y = y;
	            this.game.currentMap.staticEntities.push(this.entitySelected);
	            this.game.clear();
	            this.game.currentMap.draw(this.game.context, false);
	            this.entitySelected = null;
	        }
		}
		
		Editor.prototype.onCanvasMove = function(event) {
		    var canvas = this.game.canvas;
            var x = event.clientX-document.documentElement.scrollLeft-canvas.offsetLeft;
            var y = event.clientY-document.documentElement.scrollTop-canvas.offsetTop;
            if(isDefined(this.entitySelected)) {
	            this.entitySelected.shape.x = x - this.entitySelected.shape.width / 2;
	            this.entitySelected.shape.y = y - this.entitySelected.shape.height / 2;
	            this.game.clear();
	            this.game.currentMap.draw(this.game.context, false);
	            this.entitySelected.shape.draw(this.game.context);
            }
        }
		
		Editor.prototype.isClick = function(entity, x, y) {
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
		
		Editor.prototype.buildDiv = function(name) {
		    var div = document.createElement("div");
		    div.innerHTML = name;
            div.style.color = 'white';
            div.style.border = '1px solid white';
            div.style.display = 'inline-block';
            div.style.width = '100px';
            div.style.height = '50px';
            div.style.margin = 'auto';
            return div;
		}
		
    return Editor;

	}();
})();
