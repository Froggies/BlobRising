(function() {

	"use strict";
	
	app.editor = app.editor || {};

    var 
		Entity = app.entities.Entity,
		isDefined = app.js.isDefined;

	app.editor.Editor = function() {

		function Editor(game) {
		    this.game = game;
		    this.selected = "";
		    this.buildSerializationDiv(); 
		    this.buildMenuEntities();
		    this.destroyCurrentMap();
		    this.serialization = new app.editor.Serialization(game.currentMap);
		}
		
		Editor.prototype.buildSerializationDiv = function() {
		    var div = this.buildDiv("Serialization");
            var that = this;
            div.onclick = function() {
                that.serialization.show();
            };
            document.body.appendChild(div);
		}
		
		Editor.prototype.buildMenuEntities = function() {
            var that = this;
            this.game.canvas.addEventListener(
                "mousedown", 
                function(event) {app.editor.Editor.prototype.onCanvasClick.call(that, event);},
                false);
            var divEntitySelected = this.buildDiv("Selected");
            document.body.appendChild(divEntitySelected);
		    var div = this.buildDiv("Source");
            div.onclick = function() {
                that.selected = "Source";
                divEntitySelected.innerHTML = that.selected;
            };
            document.body.appendChild(div);
            div = this.buildDiv("Wall");
            div.onclick = function() {
                that.selected = "Wall";
                divEntitySelected.innerHTML = that.selected;
            };
            document.body.appendChild(div);
            div = this.buildDiv("Well");
            div.onclick = function() {
                that.selected = "Well";
                divEntitySelected.innerHTML = that.selected;
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
		    if(this.selected != "") {
                var objClass = app.js.stringToClass("app.entities."+this.selected);
                var entity = new objClass();
                entity.shape.x = x;
                entity.shape.y = y;
                entity.draw(canvas.getContext('2d'));
                this.game.currentMap.staticEntities.push(entity);
	        } else if(!app.js.isDefined(this.entitySelected)) {
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
	            this.game.clear();
	            this.game.currentMap.draw(this.game.context, false);
	            this.entitySelected = null;
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
