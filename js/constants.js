var logLevel = 1;
var devName = "m@n";
var className = "";
console.log("Logs start for " + devName + " with " + logLevel + " level");

var maps = [
    {
        "initSize":{"width":1301,"height":656},
        "menuWell":{"className":"Well","nb":10,"nbBlobMax":10},
        "staticEntities":
        [
            {"className":"Magnet","shape":{"x":450,"y":313}},
            {"className":"Wall","shape":{"x":743,"y":500,"width":35,"height":100}}
        ],
        "startSource":{"degreeBlob":345,"shape":{"x":300,"y":150}},
        "endWell":{"shape":{"x":736,"y":128,"color":"#FF00AA"}}
    },
    {
        "initSize":{"width":1301,"height":656},
        "menuWell":{"className":"Well","nb":5,"nbBlobMax":10},
        "staticEntities":
        [
            {"className":"Well","shape": {"x":300,"y":200}},
            {"className":"Wall","shape": {"x":550,"y":200,"height":180}}
        ],
        "startSource":{"degreeBlob":40,"shape": {"x":50,"y":100}},
        "endWell":{"shape": {"x":500,"y":250,"color":"#FF00AA"}}
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
        "endWell":{"shape": {"x":500,"y":100,"color":"#FF00AA"}}
    }
];
