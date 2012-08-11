(function() {

	"use strict";

	// here is an sample of new package
	// we need to be sure that it isnt defined elsewhere
	app.mypackage = app.mypackage || {};

	// here we simulate an "import" statement
	// avoid to name fully qualified class name
	var 
		Game = app.Game,
		inherit = app.js.inherit;


	// here is a sample of inheritance
	app.mypackage.SubGame = function() {

		// here we define our inheritance strategy
		// need to be called before adding any method
		// to child method
		inherit(SubGame, Game);

		function SubGame() {
			// calling parent constructor with this as context
			// this provide any property declared on parent
			// acessible here (like "loop" in our case)
			SubGame.super.constructor.apply(this, arguments);
		};

		SubGame.prototype.start = function() {
			// if we override a method, we can if needed
			// call parent method as below with this object as 
			// context
			// you can pass parameters after this.
			SubGame.super.start.call(this);
			alert("after parent call !");
		};

		return SubGame;

	}();

	var subGame = new app.mypackage.SubGame();
	subGame.start();
	subGame.end();

})();

