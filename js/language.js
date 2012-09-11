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
  	 	child.parent = parent.prototype; 
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
    
    // deserialize json to BlobRising object
    app.js.deserialize = function(serialized, objectSource) {
        var objectInstance = {};
        if(app.js.isDefined(serialized) && app.js.isDefined(serialized["className"])) {
            var objectClass = app.js.stringToClass("app.entities."+serialized["className"]);
            objectInstance = new objectClass();
        } else if(app.js.isDefined(objectSource)) {
            objectInstance = objectSource;
        }
        for(var key in serialized) {
            if(serialized[key] instanceof Array) {
                if(!app.js.isDefined(objectInstance[key])) {
                    objectInstance[key] = [];
                }
                for(var o in serialized[key]) {
                    objectInstance[key].push(app.js.deserialize(serialized[key][o]));
                }
            } else if(typeof serialized[key] == "object") {
                objectInstance[key] = app.js.deserialize(serialized[key], objectInstance[key]);
            } else {
                objectInstance[key] = serialized[key];
            }
        }
        return objectInstance;
    }
    
    // clone all properties of an object into other object build with class propertie
    app.js.clone = function(object) {
        // O yeah it's work ^^
        return app.js.deserialize(object);
    }
    
    // remove an object in array
    // why js hasn't this method ?
    app.js.arrayRemove = function(array, object) {
        if(!app.js.isDefined(array) || !app.js.isDefined(object)) {
            console.trace();
            return;
        }
        var idx = array.indexOf(object);
        if(idx!=-1) array.splice(idx, 1);
        return idx!=-1;
    }
    
    // Returns the class name of the argument or undefined if
    // it's not a valid JavaScript object.
    app.js.getObjectClass = function(obj) {
        if (obj && obj.constructor && obj.constructor.toString) {
            var arr = obj.constructor.toString().match(/function\s*(\w+)/);
            if (arr && arr.length == 2) {
                return arr[1];
            }
        }
        return undefined;
    }

})();
