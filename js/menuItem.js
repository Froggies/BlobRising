(function() {

	"use strict";

	app.MenuItem = function() {

		function MenuItem(menuContainer, entity, nb, callback) {
		    this.isSelected = false;
		    this.menuContainer = menuContainer;
		    this.entity = entity;
		    this.nb = nb;
		    this.callback = callback;
		    
		    this.buildMainDiv();
            this.buildCanvasEntity();
            this.updateDisplayName();
            
            menuContainer.divMenu.appendChild(this.div);
            
            var that = this;
            menuContainer.game.canvas.addEventListener(
                "mousedown", 
                function(event) {app.MenuItem.prototype.onCanvasClick.call(that, event);},
                false);
		};
		
		MenuItem.prototype.buildMainDiv = function() {
		    this.div = document.createElement("div");
            this.div.id = 'btn'+name;
            this.div.style.color = 'white';
            this.div.style.border = '1px solid white';
            var that = this;
            this.div.onclick = function() {
                app.MenuItem.prototype.onClick.call(that);
            };
            this.div.style.display = 'block';
            this.div.style.width = '80%';
            this.div.style.height = '50px';
            this.div.style.margin = 'auto';
		}
		
		MenuItem.prototype.buildCanvasEntity = function() {
		    this.canvas = document.createElement("canvas");
            this.canvas.width = 50;
            this.canvas.height = 40;
            this.canvas.style.marginLeft = '5px';
            this.canvas.style.marginTop = '5px';
            this.div.appendChild(this.canvas);
            this.entity.shape.x = 0;
            this.entity.shape.y = 0;
            this.entity.draw(this.canvas.getContext('2d'));
		}
		
		MenuItem.prototype.onClick = function() {
            this.isSelected = !this.isSelected;
            if(this.isSelected) {
                this.div.style.color = 'red';
                if(app.js.isDefined(this.callback)) {
	                this.callback.call(this.menuContainer, this);
	            }
            } else {
                this.div.style.color = 'white';
            }
		}
		
		MenuItem.prototype.unselect = function() {
		    this.isSelected = false;
		    this.div.style.color = 'white';
		}
		
		MenuItem.prototype.onCanvasClick = function(event) {
		    if(this.isSelected && this.nb > 0) {
		        this.nb--;
		        this.updateDisplayName();
                var canvas = this.menuContainer.game.canvas;
                var x = event.clientX-document.documentElement.scrollLeft-canvas.offsetLeft;
                var y= event.clientY-document.documentElement.scrollTop-canvas.offsetTop;
		        var entity = app.js.clone(this.entity);
		        entity.shape.x = x;
		        entity.shape.y = y;
		        entity.draw(canvas.getContext('2d'));
		        this.menuContainer.game.currentMap.staticEntities.push(entity);
            }
		}

		MenuItem.prototype.updateDisplayName = function() {
		    if(!app.js.isDefined(this.divName)) {
		        this.divName = document.createElement("div");
		        this.divName.style.display = 'inline-block';
		        this.divName.style.verticalAlign = 'top';
		        this.divName.style.paddingTop = '15px';
		        this.divName.style.cursor = 'default';
			    this.div.appendChild(this.divName);
			}
			this.displayName = app.js.getObjectClass(this.entity)+"("+this.nb+")";
			this.divName.innerHTML = this.displayName;
		};

		return MenuItem;

	}();
})();

