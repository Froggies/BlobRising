(function() {

	"use strict";
	
	app.editor = app.editor || {};

    var 
		Entity = app.entities.Entity,
		isDefined = app.js.isDefined;

	app.editor.Editor = function() {

		function Editor(game) {
		    this.game = game;
		    this.buildSerializationDiv(); 
		    this.buildMenuEntities();
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
		
		Editor.prototype.onCanvasClick = function(event) {
            var canvas = this.game.canvas;
            var x = event.clientX-document.documentElement.scrollLeft-canvas.offsetLeft;
            var y= event.clientY-document.documentElement.scrollTop-canvas.offsetTop;
            var objClass = app.js.stringToClass("app.entities."+this.selected);
	        var entity = new objClass();
	        entity.shape.x = x;
	        entity.shape.y = y;
	        entity.draw(canvas.getContext('2d'));
	        this.game.currentMap.staticEntities.push(entity);
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
