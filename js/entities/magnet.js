(function() {

	"use strict";

    var 
		Well = app.entities.Well,
		inherit = app.js.inherit;

	app.entities.Magnet = function() {

		inherit(Magnet, Well);
		
		function Magnet() {
			Magnet.parent.constructor.apply(this);
			this.shape = new app.shapes.Rectangle(0,0,50,52,"#FFCC00","img/magnet.gif");
			this.factorAttraction = 3;
		};
		
		return Magnet;

	}();
})();

