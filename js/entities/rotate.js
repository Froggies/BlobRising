(function() {

	"use strict";

    var 
		Entity = app.entities.Entity,
		inherit = app.js.inherit;

	app.entities.Rotate = function() {

		inherit(Rotate, Entity);
		
		function Rotate() {
			Rotate.parent.constructor.apply(this);
			this.nbBlobMax = 5;
			this.nbBlob = 0;
			this.last = false;
			this.shape = new app.shapes.Rectangle(0,0,50,52,true,true,"#FFCC00","img/rotate.gif");
			this.orbit = new app.shapes.Ellipse();
		    this.orbit.color = "rgba(0,0,0,1)";
		    this.attraction = new app.shapes.Ellipse();
		    this.attraction.color = "rgba(1,2,3,1)";
		    this.attracted = 0;
		};
		
		Rotate.prototype.update = function(translation, map) {
		    if(this.nbBlobMax <= this.nbBlob && this.last !== true) {
		        this.dead(map);
		    } else {
		        Rotate.parent.update.call(this, translation, map);
		    }
		}

		Rotate.prototype.draw = function(context, map) {
		    if(map.showNoneEntities) {
			    this.orbit.x = this.shape.x + (this.shape.width / 2);
		        this.orbit.y = this.shape.y + (this.shape.height / 2);
		        this.orbit.width = Math.max(this.shape.width, this.shape.height) + 80;
		        this.orbit.height = this.orbit.width;

		        this.attraction.x = this.shape.x + (this.shape.width / 2);
		        this.attraction.y = this.shape.y + (this.shape.height / 2);
		        this.attraction.width = 4 * this.orbit.getRadius();
		        this.attraction.height = this.orbit.width;

                context.save();                
		        context.shadowColor = this.shape.color;
                context.shadowOffsetX = 0;
                context.shadowOffsetY = 0;
                context.shadowBlur = 6;
		        
		        this.orbit.draw(context);
		        this.attraction.draw(context);
		        context.restore();
	        }

		    Rotate.parent.draw.call(this, context, map);
		}
		
		return Rotate;

	}();
})();

