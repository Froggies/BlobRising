(function() {

	"use strict";

	var 
		Shape = app.shapes.Shape,
		inherit = app.js.inherit;

	app.shapes.Ellipse = function() {

		inherit(Ellipse, Shape);
		
		function Ellipse() {
			Ellipse.parent.constructor.apply(this, arguments);
		};

		Ellipse.prototype.draw = function(context) {
			context.save()
			context.beginPath();
            context.arc(this.x, this.y, this.width/2, 0, Math.PI*2, false); 
            context.closePath();
            if (this.fill === true) {
                if (this.gradient === true) {
			        context.fillStyle = Ellipse.parent.drawGradient.call(this, context, false);
			    }
			    else {
                    context.fillStyle = this.color;
                }
                context.fill();
            }
            else {
                if (this.gradient === true) {
			        context.fillStyle = Ellipse.parent.drawGradient.call(this, context, false);
			        context.fill();
			    }
			    else {
                    context.strokeStyle = this.color;
                    context.stroke();
                }
            }
            context.restore();
		};

		return Ellipse;

	}();
})();

