(function() {

	"use strict";

	// imports
	var isDefined = app.js.isDefined;

	app.Game = function() {

		var loop;
		var isRun;

		function Game() {
			this.loop = {};
			this.isRun = false;
		}

		Game.prototype.start = function() {
			this.loop = setInterval(function() {
			    console.log("loop game");
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
