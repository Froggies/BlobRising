(function() {

	"use strict";
	
	app.editor = app.editor || {};

    var 
		Entity = app.entities.Entity,
		isDefined = app.js.isDefined;

	app.editor.Editor = function() {

		function Editor(game) {
		    this.buildSerializationDiv(); 
		    this.serialization = new app.editor.Serialization(game.currentMap);
		}
		
		Editor.prototype.buildSerializationDiv = function() {
		    var div = document.createElement("div");
		    div.innerHTML = "Serialization";
            div.style.color = 'white';
            div.style.border = '1px solid white';
            var that = this;
            div.onclick = function() {
                app.editor.Editor.prototype.onSerializationClick.call(that);
            };
            div.style.display = 'block';
            div.style.width = '80px';
            div.style.height = '50px';
            div.style.margin = 'auto';
            document.body.appendChild(div);
		}
		
		Editor.prototype.onSerializationClick = function() {
		    this.serialization.show();
		}
	
    return Editor;

	}();
})();
