(function() {

	"use strict";

	var 
		Shape = app.shapes.Shape,
		inherit = app.js.inherit;

	app.shapes.Rectangle = function() {

		inherit(Rectangle, Shape);
		
		function Rectangle() {
			Rectangle.super.constructor.apply(this, arguments);
		};

		Rectangle.prototype.draw = function(context) {
			Rectangle.super.draw.call(this);
			console.log("draw x : : " + this.x);
			console.log("draw y : : " + this.y);
			if (this.fill === true) {
//			    context.shadowOffsetX = 0;
//                context.shadowOffsetY = 0;
//                context.shadowBlur = 30;
//                context.shadowColor = "#FE2EC8"
                    context.shadowColor = "#FE2EC8";
                    context.shadowOffsetX = 0;
                    context.shadowOffsetY = 0;
                    context.shadowBlur = 100    ;
			    context.fillStyle = '#F781D8';
    			context.fillRect(this.x,this.y,this.width,this.height);
    		}
    		else {
        		context.shadowOffsetX = 0;
                context.shadowOffsetY = 0;
                context.shadowBlur = 30;
                context.shadowColor = "#81F7F3"
         		context.lineWidth = 2;
    		    context.strokeStyle = '#01ffdd';
    		    context.strokeRect(this.x,this.y,this.width,this.height);
    		}
		};

		return Rectangle;

	}();
})();

