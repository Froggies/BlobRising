var logLevel = 2;
var devName = "m@n";
var className = "";
console.log("Logs start for " + devName + " with " + logLevel + " level");

var maps = [
    {
        "name":"1ere map",
        "class":"app.Map",
        "menuEntities":
        [
            {"class":"app.entities.Source","nb":5, "nbBlob":1},
            {"class":"app.entities.Wall","nb":5},
            {"class":"app.entities.Well","nb":5,"nbBlobMax":10}
        ],
        "staticEntities":
        [
            {
                "class":"app.entities.Source", 
                "shape": {
                    "x":1,
                    "y":2
                }
            },
            {
                "class":"app.entities.Well", 
                "shape": {
                    "x":300,
                    "y":200
                }
            }
        ]
    }
]
