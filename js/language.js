(function() {

	"use strict";

	//package js
	app.js = {};

	// usefull to be sure that a variable is defined
	app.js.isDefined = function(variable) {
		return typeof variable !== "undefined" && variable !== null;
	};

	// inheritance utility, took from coffe script project
	// http://coffeescript.org
  	var __hasProp = {}.hasOwnProperty;
  	app.js.inherit = function(child, parent) { 
  		for (var key in parent) { 
  			if (__hasProp.call(parent, key)) child[key] = parent[key];
  	 	} 

  	 	function ctor() { 
  	 		this.constructor = child; 
  	 	} 

  	 	ctor.prototype = parent.prototype; 
  	 	child.prototype = new ctor(); 
  	 	child.super = parent.prototype; 
  	 	return child; 
 	};
 	
 	// retrive a class with her name
 	// str full qualified name (with package.subpackage.ClassName)
 	app.js.stringToClass = function(str) {
      var arr = str.split(".");

      var fn = (window || this);
      for (var i = 0, len = arr.length; i < len; i++) {
        fn = fn[arr[i]];
      }

      if (typeof fn !== "function") {
        throw new Error("function not found");
      }

      return  fn;
    };

})();
