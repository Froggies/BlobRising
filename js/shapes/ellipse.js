(function() {

	"use strict";

	var 
		Shape = app.shapes.Shape,
		inherit = app.js.inherit;

	app.shapes.Ellipse = function() {

		inherit(Ellipse, Shape);
		
		function Ellipse() {
			Ellipse.super.constructor.apply(this, arguments);
		};

		Ellipse.prototype.draw = function(context) {
			Ellipse.super.draw.call(this);
			context.beginPath();
            context.arc(this.x, this.y, this.width/2, 0, Math.PI*2, false); 
            context.closePath();
            if (this.fill === true) {
            	context.shadowOffsetX = 0;
                context.shadowOffsetY = 0;
                context.shadowBlur = 30;
                context.shadowColor = "#FE2EC8"
                context.fillStyle = '#FF0080';
                context.fill();
            }
            else {
                context.shadowOffsetX = 0;
                context.shadowOffsetY = 0;
                context.shadowBlur = 30;
                context.shadowColor = "#FE2EC8"
                context.lineWidth = 2;
                context.strokeStyle = '#FF0080';
                context.stroke();
            }
		};

		return Ellipse;

	}();
})();

