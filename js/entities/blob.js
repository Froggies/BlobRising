(function() {

	"use strict";

    var 
		Entity = app.entities.Entity,
		inherit = app.js.inherit;

	app.entities.Blob = function() {

		inherit(Blob, Entity);
		
		function Blob() {
			Blob.super.constructor.apply(this);
		};

		Blob.prototype.draw = function(context, map) {
			Blob.super.draw.call(this, context);
			var entity = new Entity();
			entity.shape = new app.shapes.Rectangle(10,10,40,40);
			map.staticEntities.push(entity);
		};

		return Blob;

	}();
})();

