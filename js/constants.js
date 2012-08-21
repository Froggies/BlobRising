var logLevel = 1;
var devName = "m@n";
var className = "";
console.log("Logs start for " + devName + " with " + logLevel + " level");

var maps = [
    {
        "name":"1ere map",
        "class":"app.Map",
        "menuEntities":
        [
            {"class":"app.entities.Source","shape":{"width":30,"height":30,"fill":true},"nb":5, "nbBlob":1},
            {"class":"app.entities.Blob","shape":{"width":30,"height":30},"nb":5},
            {"class":"app.entities.Wall","shape":{"width":30,"height":100,"fill":true},"nb":5},
            {"class":"app.entities.Well","shape":{"width":10,"height":100,"fill":true},"nb":5,"nbBlobMax":10}
        ],
        "staticEntities":
        [
            {
                "class":"app.entities.Source", 
                "nbBlob":100,
                "shape": {
                    "class":"app.shapes.Rectangle",
                    "x":1,
                    "y":2,
                    "width":50,
                    "height":50,
                    "fill":false
                }
            },
            {
                "class":"app.entities.Entity", 
                "shape": {
                    "class":"app.shapes.Ellipse",
                    "x":20,
                    "y":20,
                    "width":50,
                    "height":50,
                    "fill":false
                }
            },
            {
                "class":"app.entities.Entity", 
                "shape": {
                    "class":"app.shapes.Ellipse",
                    "x":700,
                    "y":150,
                    "width":50,
                    "height":50,
                    "fill":true
                }
            },
            {
                "class":"app.entities.Well", 
                "nbBlobMax":5,
                "shape": {
                    "class":"app.shapes.Rectangle",
                    "x":300,
                    "y":200,
                    "width":50,
                    "height":50, 
                    "fill":true
                }
            },
            {
                "class":"app.entities.Well", 
                "nbBlobMax":5,
                "shape": {
                    "class":"app.shapes.Rectangle",
                    "x":350,
                    "y":220,
                    "width":50,
                    "height":50,
                    "fill":false
                }
            }
        ]
    }
]
