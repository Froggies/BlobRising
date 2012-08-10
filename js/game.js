(function() {

	"use strict";

	// imports
	var isDefined = app.js.isDefined;

	app.Game = function() {

		var loop;

		function Game() {
			this.loop = {};
			alert("game constructor !");
		}

		Game.prototype.start = function() {
			alert("starting with 50 fps...");
			this.loop = setTimeout(function() {
				// main loop instructions goes here
			}, 1000/50);
		}

		Game.prototype.end = function() {
			alert("ending main loop");
			clearTimeout(this.loop);
		}

		return Game;
	}();
})();