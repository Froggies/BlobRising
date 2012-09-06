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

		Rectangle.prototype.draw = function(context) {
			context.save();
			
			if(app.js.isDefined(this.urlImage)) {
                Rectangle.parent.drawImage.call(this, context);
            }
            else {
			    if (this.fill === true) {
			        if (this.gradient === true) {
			            context.fillStyle = Rectangle.parent.drawGradient.call(this, context, true);
			        }
			        else {
                        context.fillStyle = this.color;
                    }
        		    context.fillRect(this.x,this.y,this.width,this.height);
        		}
        		else {
            		if (this.gradient === true) {
			                context.strokeStyle = Rectangle.parent.drawGradient.call(this, context, true);
			        }
			        else {
			            context.strokeStyle = this.color;
			        }
        		    context.strokeRect(this.x,this.y,this.width,this.height);
        		}
            }
            

            // Create wall
            /*
		    var img = new Image();
		    img.src = 'img/wall_pattern.gif';
		    var ptrn = context.createPattern(img,'repeat');
		    context.fillStyle = this.color;
		    context.fillRect(this.x,this.y,this.width,this.height);
		    context.fillStyle = ptrn;
		    context.fillRect(this.x,this.y,this.width,this.height);
			context.strokeStyle = "#626163";
			context.strokeRect(this.x,this.y,this.width,this.height);
			*/

			// Create magnet
			/*
		    var img = new Image();
		    img.src = 'img/magnet11.gif';
		    context.drawImage(img,this.x,this.y,this.width,this.height);
		    */

		    // Create well
		    /*
		    var img = new Image();
		    img.src = 'img/well.gif';
		    context.drawImage(img,this.x,this.y,this.width,this.height);
			*/

    		context.restore();
		};

		return Rectangle;

	}();
})();

