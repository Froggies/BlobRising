(function() {

	"use strict";

	var 
		Shape = app.shapes.Shape,
		inherit = app.js.inherit;

	app.shapes.Ellipse = function() {

		inherit(Ellipse, Shape);
		
		function Ellipse(x, y, width, height, color, urlImage) {
			Ellipse.parent.constructor.apply(this, arguments);
		};

		Ellipse.prototype.draw = function(context) {
			context.beginPath();
            context.arc(this.x, this.y, this.width / 2, 0, Math.PI*2, false); 
            context.closePath();
            if(app.js.isDefined(this.urlImage)) {
                Ellipse.parent.drawImage.call(this, context);
            }
            context.strokeStyle = this.color;
            context.stroke();
		};

		Ellipse.prototype.getRadius = function() {
			return this.width / 2;
		}

		return Ellipse;

	}();
})();

