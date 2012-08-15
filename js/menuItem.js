(function() {

	"use strict";

	app.MenuItem = function() {

        var menuContainer;
        var entity;
        var nb;
        var callback;
		var div;
		var isSelected;

		function MenuItem(menuContainer, entity, nb, callback) {
		    this.isSelected = false;
		    this.menuContainer = menuContainer;
		    this.entity = entity;
		    this.nb = nb;
		    this.callback = callback;
		    this.div = document.createElement("div");
            this.div.id = 'btn'+name;
            this.div.style.color = 'white';
            this.div.style.border = '1px solid white';
		    this.updateDisplayName();
            var that = this;
            this.div.onclick = function() {
                app.MenuItem.prototype.onClick.call(that);
            };
            this.div.style.display = 'block';
            this.div.style.width = '80%';
            this.div.style.height = '50px';
            this.div.style.margin = 'auto';
            menuContainer.divMenu.appendChild(this.div);
            
            menuContainer.game.canvas.addEventListener(
                "mousedown", 
                function() {app.MenuItem.prototype.onCanvasClick.call(that, event);},
                false);
		};
		
		MenuItem.prototype.onClick = function() {
            this.isSelected = !this.isSelected;
            if(this.isSelected) {
                this.div.style.color = 'red';
            } else {
                this.div.style.color = 'white';
            }
            if(app.js.isDefined(this.callback)) {
	            this.callback.call(this.menuContainer);
	        }
		}
		
		MenuItem.prototype.onCanvasClick = function(event) {
		    if(this.isSelected && this.nb > 0) {
		        this.nb--;
		        this.updateDisplayName();
                var canvas = this.menuContainer.game.canvas;
                var x= event.clientX-document.documentElement.scrollLeft-canvas.offsetLeft;
                var y= event.clientY-document.documentElement.scrollTop-canvas.offsetTop;
                var classEntity = app.js.stringToClass(this.entity.class);
                var subblob = new classEntity();
                // TODO : clone entity to subblob
		        subblob.shape = new app.shapes.Rectangle();
		        subblob.shape.width = 50;
		        subblob.shape.height = 50;
		        subblob.shape.x = x;
		        subblob.shape.y = y;
		        subblob.init();
		        subblob.draw(canvas.getContext('2d'));
		        this.menuContainer.game.currentMap.staticEntities.push(subblob);
            }
		}

		MenuItem.prototype.updateDisplayName = function() {
			this.displayName = app.js.getObjectClass(this.entity)+"("+this.nb+")";
			this.div.innerHTML = this.displayName;
		};

		return MenuItem;

	}();
})();

