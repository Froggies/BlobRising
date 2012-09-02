var logLevel = 2;
var devName = "m@n";
var className = "";
console.log("Logs start for " + devName + " with " + logLevel + " level");

var maps = [
    {
        "initSize":{"width":1301,"height":411},
        "menuWell":{"className":"Well","nb":5,"nbBlobMax":10},
        "staticEntities":
        [
            {
                "className":"Well",
                "shape": {
                    "x":300,
                    "y":200
                }
            },
            {
                "className":"Wall",
                "shape": {
                    "x":550,
                    "y":200,
                    "height":180
                }
            }
        ],
        "startSource":{"degreeBlob":40,"shape": {"x":50,"y":100}},
        "endWell":{"shape": {"x":500,"y":250}}
    },
    {
        "initSize":{"width":1301,"height":411},
        "menuWell":{"className":"Well","nb":5,"nbBlobMax":10},
        "menuEntities":
        [
            {"className":"Well","nb":5,"nbBlobMax":10}
        ],
        "staticEntities":
        [
            {
                "className":"Well",
                "shape": {
                    "x":200,
                    "y":200
                }
            }
        ],
        "startSource":{"degreeBlob":60,"shape": {"x":50,"y":100}},
        "endWell":{"shape": {"x":500,"y":100}}
    }
];
