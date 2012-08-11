(function() {

	"use strict";

	// imports
	var 
		isDefined = app.js.isDefined,
		Entity = app.gameplay.Entity;

	app.Game = function() {

		function Game() {
			this.loop = {};
			this.canvas = document.getElementById("game");
		}

		Game.prototype.init = function() {
			this.entity = new Entity(10, 10);
			this.entity.draw();
		}

		Game.prototype.start = function() {
			this.init();
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
