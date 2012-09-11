var Sylvester={precision:0.001,Vector:function(){},Matrix:function(){}};Sylvester.Matrix.create=function(a){return(new Sylvester.Matrix).setElements(a)};var $M=Sylvester.Matrix.create;Sylvester.Matrix.I=function(a){for(var b=[],d=a,c;d--;){c=a;for(b[d]=[];c--;)b[d][c]=d===c?1:0}return Sylvester.Matrix.create(b)};Sylvester.Matrix.Diagonal=function(a){for(var b=a.length,d=Sylvester.Matrix.I(b);b--;)d.elements[b][b]=a[b];return d}; Sylvester.Matrix.Rotation=function(a,b){if(!b)return Sylvester.Matrix.create([[Math.cos(a),-Math.sin(a)],[Math.sin(a),Math.cos(a)]]);var d=b.dup();if(3!==d.elements.length)return null;var c=d.modulus(),e=d.elements[0]/c,f=d.elements[1]/c,d=d.elements[2]/c,c=Math.sin(a),g=Math.cos(a),h=1-g;return Sylvester.Matrix.create([[h*e*e+g,h*e*f-c*d,h*e*d+c*f],[h*e*f+c*d,h*f*f+g,h*f*d-c*e],[h*e*d-c*f,h*f*d+c*e,h*d*d+g]])}; Sylvester.Matrix.RotationX=function(a){var b=Math.cos(a),a=Math.sin(a);return Sylvester.Matrix.create([[1,0,0],[0,b,-a],[0,a,b]])};Sylvester.Matrix.RotationY=function(a){var b=Math.cos(a),a=Math.sin(a);return Sylvester.Matrix.create([[b,0,a],[0,1,0],[-a,0,b]])};Sylvester.Matrix.RotationZ=function(a){var b=Math.cos(a),a=Math.sin(a);return Sylvester.Matrix.create([[b,-a,0],[a,b,0],[0,0,1]])};Sylvester.Matrix.Random=function(a,b){return Sylvester.Matrix.Zero(a,b).map(function(){return Math.random()})}; Sylvester.Matrix.Zero=function(a,b){for(var d=[],c=a,e;c--;){e=b;for(d[c]=[];e--;)d[c][e]=0}return Sylvester.Matrix.create(d)}; Sylvester.Matrix.prototype={e:function(a,b){return 1>a||a>this.elements.length||1>b||b>this.elements[0].length?null:this.elements[a-1][b-1]},row:function(a){return a>this.elements.length?null:Sylvester.Vector.create(this.elements[a-1])},col:function(a){if(0===this.elements.length||a>this.elements[0].length)return null;for(var b=[],d=this.elements.length,c=0;c<d;c++)b.push(this.elements[c][a-1]);return Sylvester.Vector.create(b)},dimensions:function(){return{rows:this.elements.length,cols:0===this.elements.length? 0:this.elements[0].length}},rows:function(){return this.elements.length},cols:function(){return 0===this.elements.length?0:this.elements[0].length},eql:function(a){a=a.elements||a;if(!a[0]||"undefined"===typeof a[0][0])a=Sylvester.Matrix.create(a).elements;if(0===this.elements.length||0===a.length)return this.elements.length===a.length;if(this.elements.length!==a.length||this.elements[0].length!==a[0].length)return!1;for(var b=this.elements.length,d=this.elements[0].length,c;b--;)for(c=d;c--;)if(Math.abs(this.elements[b][c]- a[b][c])>Sylvester.precision)return!1;return!0},dup:function(){return Sylvester.Matrix.create(this.elements)},map:function(a,b){if(0===this.elements.length)return Sylvester.Matrix.create([]);for(var d=[],c=this.elements.length,e=this.elements[0].length,f;c--;){f=e;for(d[c]=[];f--;)d[c][f]=a.call(b,this.elements[c][f],c+1,f+1)}return Sylvester.Matrix.create(d)},isSameSizeAs:function(a){a=a.elements||a;"undefined"===typeof a[0][0]&&(a=Sylvester.Matrix.create(a).elements);return 0===this.elements.length? 0===a.length:this.elements.length===a.length&&this.elements[0].length===a[0].length},add:function(a){if(0===this.elements.length)return this.map(function(a){return a});var b=a.elements||a;"undefined"===typeof b[0][0]&&(b=Sylvester.Matrix.create(b).elements);return!this.isSameSizeAs(b)?null:this.map(function(a,c,e){return a+b[c-1][e-1]})},subtract:function(a){if(0===this.elements.length)return this.map(function(a){return a});var b=a.elements||a;"undefined"===typeof b[0][0]&&(b=Sylvester.Matrix.create(b).elements); return!this.isSameSizeAs(b)?null:this.map(function(a,c,e){return a-b[c-1][e-1]})},canMultiplyFromLeft:function(a){if(0===this.elements.length)return!1;a=a.elements||a;"undefined"===typeof a[0][0]&&(a=Sylvester.Matrix.create(a).elements);return this.elements[0].length===a.length},multiply:function(a){if(0===this.elements.length)return null;if(!a.elements)return this.map(function(b){return b*a});var b=a.modulus?!0:!1,d=a.elements||a;"undefined"===typeof d[0][0]&&(d=Sylvester.Matrix.create(d).elements); if(!this.canMultiplyFromLeft(d))return null;for(var c=this.elements.length,e=d[0].length,f,g=this.elements[0].length,h,i=[],j;c--;){f=e;for(i[c]=[];f--;){h=g;for(j=0;h--;)j+=this.elements[c][h]*d[h][f];i[c][f]=j}}d=Sylvester.Matrix.create(i);return b?d.col(1):d},minor:function(a,b,d,c){if(0===this.elements.length)return null;for(var e=[],f=d,g,h,i,j=this.elements.length,k=this.elements[0].length;f--;){g=d-f-1;e[g]=[];for(h=c;h--;)i=c-h-1,e[g][i]=this.elements[(a+g-1)%j][(b+i-1)%k]}return Sylvester.Matrix.create(e)}, transpose:function(){if(0===this.elements.length)return Sylvester.Matrix.create([]);var a=this.elements.length,b,d,c=[];for(b=this.elements[0].length;b--;){d=a;for(c[b]=[];d--;)c[b][d]=this.elements[d][b]}return Sylvester.Matrix.create(c)},isSquare:function(){return this.elements.length===(0===this.elements.length?0:this.elements[0].length)},max:function(){if(0===this.elements.length)return null;for(var a=0,b=this.elements.length,d=this.elements[0].length,c;b--;)for(c=d;c--;)Math.abs(this.elements[b][c])> Math.abs(a)&&(a=this.elements[b][c]);return a},indexOf:function(a){if(0===this.elements.length)return null;var b=this.elements.length,d,c=this.elements[0].length,e;for(d=0;d<b;d++)for(e=0;e<c;e++)if(this.elements[d][e]===a)return{i:d+1,j:e+1};return null},diagonal:function(){if(!this.isSquare)return null;for(var a=[],b=this.elements.length,d=0;d<b;d++)a.push(this.elements[d][d]);return Sylvester.Vector.create(a)},toRightTriangular:function(){if(0===this.elements.length)return Sylvester.Matrix.create([]); var a=this.dup(),b,d=this.elements.length,c,e,f=this.elements[0].length,g;for(c=0;c<d;c++){if(0===a.elements[c][c])for(e=c+1;e<d;e++)if(0!==a.elements[e][c]){b=[];for(g=0;g<f;g++)b.push(a.elements[c][g]+a.elements[e][g]);a.elements[c]=b;break}if(0!==a.elements[c][c])for(e=c+1;e<d;e++){var h=a.elements[e][c]/a.elements[c][c];b=[];for(g=0;g<f;g++)b.push(g<=c?0:a.elements[e][g]-a.elements[c][g]*h);a.elements[e]=b}}return a},determinant:function(){if(0===this.elements.length)return 1;if(!this.isSquare())return null; for(var a=this.toRightTriangular(),b=a.elements[0][0],d=a.elements.length,c=1;c<d;c++)b*=a.elements[c][c];return b},isSingular:function(){return this.isSquare()&&0===this.determinant()},trace:function(){if(0===this.elements.length)return 0;if(!this.isSquare())return null;for(var a=this.elements[0][0],b=this.elements.length,d=1;d<b;d++)a+=this.elements[d][d];return a},rank:function(){if(0===this.elements.length)return 0;for(var a=this.toRightTriangular(),b=0,d=this.elements.length,c=this.elements[0].length, e;d--;)for(e=c;e--;)if(Math.abs(a.elements[d][e])>Sylvester.precision){b++;break}return b},augment:function(a){if(0===this.elements.length)return this.dup();a=a.elements||a;"undefined"===typeof a[0][0]&&(a=Sylvester.Matrix.create(a).elements);var b=this.dup(),d=b.elements[0].length,c=b.elements.length,e=a[0].length,f;if(c!==a.length)return null;for(;c--;)for(f=e;f--;)b.elements[c][d+f]=a[c][f];return b},inverse:function(){if(0===this.elements.length||!this.isSquare()||this.isSingular())return null; for(var a=this.elements.length,b=a,d,c=this.augment(Sylvester.Matrix.I(a)).toRightTriangular(),e=c.elements[0].length,f,g,h=[],i;b--;){g=[];h[b]=[];d=c.elements[b][b];for(f=0;f<e;f++)i=c.elements[b][f]/d,g.push(i),f>=a&&h[b].push(i);c.elements[b]=g;for(d=b;d--;){g=[];for(f=0;f<e;f++)g.push(c.elements[d][f]-c.elements[b][f]*c.elements[d][b]);c.elements[d]=g}}return Sylvester.Matrix.create(h)},round:function(){return this.map(function(a){return Math.round(a)})},snapTo:function(a){return this.map(function(b){return Math.abs(b- a)<=Sylvester.precision?a:b})},inspect:function(){var a=[],b=this.elements.length;if(0===b)return"[]";for(var d=0;d<b;d++)a.push(Sylvester.Vector.create(this.elements[d]).inspect());return a.join("\n")},setElements:function(a){var b,d=a.elements||a;if(d[0]&&"undefined"!==typeof d[0][0]){a=d.length;for(this.elements=[];a--;){b=d[a].length;for(this.elements[a]=[];b--;)this.elements[a][b]=d[a][b]}return this}b=d.length;this.elements=[];for(a=0;a<b;a++)this.elements.push([d[a]]);return this}}; Sylvester.Matrix.prototype.toUpperTriangular=Sylvester.Matrix.prototype.toRightTriangular;Sylvester.Matrix.prototype.det=Sylvester.Matrix.prototype.determinant;Sylvester.Matrix.prototype.tr=Sylvester.Matrix.prototype.trace;Sylvester.Matrix.prototype.rk=Sylvester.Matrix.prototype.rank;Sylvester.Matrix.prototype.inv=Sylvester.Matrix.prototype.inverse;Sylvester.Matrix.prototype.x=Sylvester.Matrix.prototype.multiply;Sylvester.Vector.create=function(a){return(new Sylvester.Vector).setElements(a)}; var $V=Sylvester.Vector.create;Sylvester.Vector.Random=function(a){for(var b=[];a--;)b.push(Math.random());return Sylvester.Vector.create(b)};Sylvester.Vector.Zero=function(a){for(var b=[];a--;)b.push(0);return Sylvester.Vector.create(b)}; Sylvester.Vector.prototype={e:function(a){return 1>a||a>this.elements.length?null:this.elements[a-1]},dimensions:function(){return this.elements.length},modulus:function(){return Math.sqrt(this.dot(this))},eql:function(a){var b=this.elements.length,a=a.elements||a;if(b!==a.length)return!1;for(;b--;)if(Math.abs(this.elements[b]-a[b])>Sylvester.precision)return!1;return!0},dup:function(){return Sylvester.Vector.create(this.elements)},map:function(a,b){var d=[];this.each(function(c,e){d.push(a.call(b, c,e))});return Sylvester.Vector.create(d)},forEach:function(a,b){for(var d=this.elements.length,c=0;c<d;c++)a.call(b,this.elements[c],c+1)},toUnitVector:function(){var a=this.modulus();return 0===a?this.dup():this.map(function(b){return b/a})},angleFrom:function(a){var b=a.elements||a;if(this.elements.length!==b.length)return null;var d=0,c=0,e=0;this.each(function(a,g){d+=a*b[g-1];c+=a*a;e+=b[g-1]*b[g-1]});c=Math.sqrt(c);e=Math.sqrt(e);if(0===c*e)return null;a=d/(c*e);-1>a&&(a=-1);1<a&&(a=1);return Math.acos(a)}, isParallelTo:function(a){a=this.angleFrom(a);return null===a?null:a<=Sylvester.precision},isAntiparallelTo:function(a){a=this.angleFrom(a);return null===a?null:Math.abs(a-Math.PI)<=Sylvester.precision},isPerpendicularTo:function(a){a=this.dot(a);return null===a?null:Math.abs(a)<=Sylvester.precision},add:function(a){var b=a.elements||a;return this.elements.length!==b.length?null:this.map(function(a,c){return a+b[c-1]})},subtract:function(a){var b=a.elements||a;return this.elements.length!==b.length? null:this.map(function(a,c){return a-b[c-1]})},multiply:function(a){return this.map(function(b){return b*a})},dot:function(a){var a=a.elements||a,b=0,d=this.elements.length;if(d!==a.length)return null;for(;d--;)b+=this.elements[d]*a[d];return b},cross:function(a){a=a.elements||a;if(3!==this.elements.length||3!==a.length)return null;var b=this.elements;return Sylvester.Vector.create([b[1]*a[2]-b[2]*a[1],b[2]*a[0]-b[0]*a[2],b[0]*a[1]-b[1]*a[0]])},max:function(){for(var a=0,b=this.elements.length;b--;)Math.abs(this.elements[b])> Math.abs(a)&&(a=this.elements[b]);return a},indexOf:function(a){for(var b=null,d=this.elements.length,c=0;c<d;c++)null===b&&this.elements[c]===a&&(b=c+1);return b},toDiagonalMatrix:function(){return Sylvester.Matrix.Diagonal(this.elements)},round:function(){return this.map(function(a){return Math.round(a)})},snapTo:function(a){return this.map(function(b){return Math.abs(b-a)<=Sylvester.precision?a:b})},distanceFrom:function(a){if(a.anchor||a.start&&a.end)return a.distanceFrom(this);var b=a.elements|| a;if(b.length!==this.elements.length)return null;var d=0,c;this.each(function(a,f){c=a-b[f-1];d+=c*c});return Math.sqrt(d)},liesOn:function(a){return a.contains(this)},liesIn:function(a){return a.contains(this)},rotate:function(a,b){var d,c=null,e,f;a.determinant&&(c=a.elements);switch(this.elements.length){case 2:d=b.elements||b;if(2!==d.length)return null;c||(c=Sylvester.Matrix.Rotation(a).elements);e=this.elements[0]-d[0];f=this.elements[1]-d[1];return Sylvester.Vector.create([d[0]+c[0][0]*e+c[0][1]* f,d[1]+c[1][0]*e+c[1][1]*f]);case 3:if(!b.direction)return null;var g=b.pointClosestTo(this).elements;c||(c=Sylvester.Matrix.Rotation(a,b.direction).elements);e=this.elements[0]-g[0];f=this.elements[1]-g[1];d=this.elements[2]-g[2];return Sylvester.Vector.create([g[0]+c[0][0]*e+c[0][1]*f+c[0][2]*d,g[1]+c[1][0]*e+c[1][1]*f+c[1][2]*d,g[2]+c[2][0]*e+c[2][1]*f+c[2][2]*d]);default:return null}},reflectionIn:function(a){if(a.anchor){var b=this.elements.slice(),a=a.pointClosestTo(b).elements;return Sylvester.Vector.create([a[0]+ (a[0]-b[0]),a[1]+(a[1]-b[1]),a[2]+(a[2]-(b[2]||0))])}var d=a.elements||a;return this.elements.length!==d.length?null:this.map(function(a,b){return d[b-1]+(d[b-1]-a)})},to3D:function(){var a=this.dup();switch(a.elements.length){case 3:break;case 2:a.elements.push(0);break;default:return null}return a},inspect:function(){return"["+this.elements.join(", ")+"]"},setElements:function(a){this.elements=(a.elements||a).slice();return this}};Sylvester.Vector.prototype.x=Sylvester.Vector.prototype.multiply; Sylvester.Vector.prototype.each=Sylvester.Vector.prototype.forEach;Sylvester.Vector.i=Sylvester.Vector.create([1,0,0]);Sylvester.Vector.j=Sylvester.Vector.create([0,1,0]);Sylvester.Vector.k=Sylvester.Vector.create([0,0,1]);