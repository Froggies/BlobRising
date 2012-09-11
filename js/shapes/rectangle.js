(function() {

	"use strict";

	var 
		Shape = app.shapes.Shape,
		inherit = app.js.inherit;

	app.shapes.Rectangle = function() {

		inherit(Rectangle, Shape);
		
		function Rectangle() {
			Rectangle.parent.constructor.apply(this, arguments);
		};

		Rectangle.prototype.draw = function(context, physic) {
			context.save();
			
			if(app.js.isDefined(this.urlImage) || app.js.isDefined(this.urlSprite)) {
                Rectangle.parent.drawImage.call(this, context, physic);
            }
            else if(app.js.isDefined(this.urlPattern)) {
			    var img = new Image();
			    img.src = this.urlPattern;
			    var ptrn = context.createPattern(img,'repeat');
			    context.fillStyle = this.color;
			    context.fillRect(this.x,this.y,this.width,this.height);
			    context.fillStyle = ptrn;
			    context.fillRect(this.x,this.y,this.width,this.height);
				context.strokeStyle = "#626163";
				context.strokeRect(this.x,this.y,this.width,this.height);	
            }
    		context.restore();
		};

		return Rectangle;

	}();
})();

