(function() {

	"use strict";

    var 
		Entity = app.entities.Entity,
		inherit = app.js.inherit;

	app.entities.Rotate = function() {

		inherit(Rotate, Entity);
		
		function Rotate() {
			Rotate.parent.constructor.apply(this);
			this.shape = new app.shapes.Rectangle(0,0,50,52,"#FFCC00","img/rotate.gif");
			this.orbit = new app.shapes.Ellipse();
		    this.orbit.color = "rgba(0,0,0,1)";
		    this.attracted = 0;
		};
		
		Rotate.prototype.draw = function(context, map) {
		    if(map.showNoneEntities) {
			    this.orbit.x = this.shape.x + (this.shape.width / 2);
		        this.orbit.y = this.shape.y + (this.shape.height / 2);
		        this.orbit.width = Math.max(this.shape.width, this.shape.height) + 80;
		        this.orbit.height = this.orbit.width;

                context.save();                
		        context.shadowColor = this.shape.color;
                context.shadowOffsetX = 0;
                context.shadowOffsetY = 0;
                context.shadowBlur = 6;
		        
		        this.orbit.draw(context);
		        context.restore();
	        }

		    Rotate.parent.draw.call(this, context, map);
		}
		
		return Rotate;

	}();
})();

