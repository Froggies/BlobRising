var Sylvester={precision:1E-6,Vector:function(){}};Sylvester.Vector.create=function(a){return(new Sylvester.Vector).setElements(a)};var $V=Sylvester.Vector.create;Sylvester.Vector.Random=function(a){for(var b=[];a--;)b.push(Math.random());return Sylvester.Vector.create(b)};Sylvester.Vector.Zero=function(a){for(var b=[];a--;)b.push(0);return Sylvester.Vector.create(b)}; Sylvester.Vector.prototype={e:function(a){return 1>a||a>this.elements.length?null:this.elements[a-1]},dimensions:function(){return this.elements.length},modulus:function(){return Math.sqrt(this.dot(this))},eql:function(a){var b=this.elements.length,a=a.elements||a;if(b!==a.length)return!1;for(;b--;)if(Math.abs(this.elements[b]-a[b])>Sylvester.precision)return!1;return!0},dup:function(){return Sylvester.Vector.create(this.elements)},map:function(a,b){var d=[];this.each(function(c,e){d.push(a.call(b, c,e))});return Sylvester.Vector.create(d)},forEach:function(a,b){for(var d=this.elements.length,c=0;c<d;c++)a.call(b,this.elements[c],c+1)},toUnitVector:function(){var a=this.modulus();return 0===a?this.dup():this.map(function(b){return b/a})},angleFrom:function(a){var b=a.elements||a;if(this.elements.length!==b.length)return null;var d=0,c=0,e=0;this.each(function(a,f){d+=a*b[f-1];c+=a*a;e+=b[f-1]*b[f-1]});c=Math.sqrt(c);e=Math.sqrt(e);if(0===c*e)return null;a=d/(c*e);-1>a&&(a=-1);1<a&&(a=1);return Math.acos(a)}, isParallelTo:function(a){a=this.angleFrom(a);return null===a?null:a<=Sylvester.precision},isAntiparallelTo:function(a){a=this.angleFrom(a);return null===a?null:Math.abs(a-Math.PI)<=Sylvester.precision},isPerpendicularTo:function(a){a=this.dot(a);return null===a?null:Math.abs(a)<=Sylvester.precision},add:function(a){var b=a.elements||a;return this.elements.length!==b.length?null:this.map(function(a,c){return a+b[c-1]})},subtract:function(a){var b=a.elements||a;return this.elements.length!==b.length? null:this.map(function(a,c){return a-b[c-1]})},multiply:function(a){return this.map(function(b){return b*a})},dot:function(a){var a=a.elements||a,b=0,d=this.elements.length;if(d!==a.length)return null;for(;d--;)b+=this.elements[d]*a[d];return b},cross:function(a){a=a.elements||a;if(3!==this.elements.length||3!==a.length)return null;var b=this.elements;return Sylvester.Vector.create([b[1]*a[2]-b[2]*a[1],b[2]*a[0]-b[0]*a[2],b[0]*a[1]-b[1]*a[0]])},max:function(){for(var a=0,b=this.elements.length;b--;)Math.abs(this.elements[b])> Math.abs(a)&&(a=this.elements[b]);return a},indexOf:function(a){for(var b=null,d=this.elements.length,c=0;c<d;c++)null===b&&this.elements[c]===a&&(b=c+1);return b},toDiagonalMatrix:function(){return Sylvester.Matrix.Diagonal(this.elements)},round:function(){return this.map(function(a){return Math.round(a)})},snapTo:function(a){return this.map(function(b){return Math.abs(b-a)<=Sylvester.precision?a:b})},distanceFrom:function(a){if(a.anchor||a.start&&a.end)return a.distanceFrom(this);var b=a.elements|| a;if(b.length!==this.elements.length)return null;var d=0,c;this.each(function(a,g){c=a-b[g-1];d+=c*c});return Math.sqrt(d)},liesOn:function(a){return a.contains(this)},liesIn:function(a){return a.contains(this)},rotate:function(a,b){var d,c=null,e,g;a.determinant&&(c=a.elements);switch(this.elements.length){case 2:d=b.elements||b;if(2!==d.length)return null;c||(c=Sylvester.Matrix.Rotation(a).elements);e=this.elements[0]-d[0];g=this.elements[1]-d[1];return Sylvester.Vector.create([d[0]+c[0][0]*e+c[0][1]* g,d[1]+c[1][0]*e+c[1][1]*g]);case 3:if(!b.direction)return null;var f=b.pointClosestTo(this).elements;c||(c=Sylvester.Matrix.Rotation(a,b.direction).elements);e=this.elements[0]-f[0];g=this.elements[1]-f[1];d=this.elements[2]-f[2];return Sylvester.Vector.create([f[0]+c[0][0]*e+c[0][1]*g+c[0][2]*d,f[1]+c[1][0]*e+c[1][1]*g+c[1][2]*d,f[2]+c[2][0]*e+c[2][1]*g+c[2][2]*d]);default:return null}},reflectionIn:function(a){if(a.anchor){var b=this.elements.slice(),a=a.pointClosestTo(b).elements;return Sylvester.Vector.create([a[0]+ (a[0]-b[0]),a[1]+(a[1]-b[1]),a[2]+(a[2]-(b[2]||0))])}var d=a.elements||a;return this.elements.length!==d.length?null:this.map(function(a,b){return d[b-1]+(d[b-1]-a)})},to3D:function(){var a=this.dup();switch(a.elements.length){case 3:break;case 2:a.elements.push(0);break;default:return null}return a},inspect:function(){return"["+this.elements.join(", ")+"]"},setElements:function(a){this.elements=(a.elements||a).slice();return this}};Sylvester.Vector.prototype.x=Sylvester.Vector.prototype.multiply; Sylvester.Vector.prototype.each=Sylvester.Vector.prototype.forEach;Sylvester.Vector.i=Sylvester.Vector.create([1,0,0]);Sylvester.Vector.j=Sylvester.Vector.create([0,1,0]);Sylvester.Vector.k=Sylvester.Vector.create([0,0,1]);