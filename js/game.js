(function() {

	"use strict";

	// imports
	var 
		isDefined = app.js.isDefined,
		Entity = app.gameplay.Entity;

	app.Game = function() {

		function Game(context) {
			this.loop = {};
			this.context = context;
		}

		Game.prototype.init = function() {
			this.entity = new Entity(this.context);
			this.entity.draw();
		}

		Game.prototype.clear = function() {
			var canvas = this.context.canvas;
			this.context.clearRect(
				0, 0, canvas.width, canvas.height
			);
		}

		Game.prototype.start = function() {
			this.init();
			var that = this;
			this.loop = setInterval(function() {
				that.entity.update($V([1, 1]));
				that.clear();
				that.entity.draw();
			}, 1000/50);
			this.isRun = true;
		}
		
		Game.prototype.end = function() {
		    clearInterval(this.loop);
		    this.isRun = false;
		}

		return Game;
	}();
})();
