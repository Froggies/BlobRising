var logLevel = 1;
var devName = "m@n";
var className = "";
console.log("Logs start for " + devName + " with " + logLevel + " level");

var maps = [
    {
        "initSize":{"width":1301,"height":411},
        "menuRotate":{"className":"Rotate","nb":4},
        "menuMagnet":{"className":"Magnet","nb":4},
        "menuEntities":
        [
            {"className":"Well","nb":5,"nbBlobMax":10}
        ],
        "staticEntities":
        [
            {"className":"Wall","shape":{"x":200,"y":10,"width":35,"height":300}},
            {"className":"Wall","shape":{"x":200,"y":10,"width":35,"height":300}},
            {"className":"Wall","shape":{"x":350,"y":190,"width":200,"height":35}},
            {"className":"Wall","shape":{"x":650,"y":190,"width":200,"height":35}},
            {"className":"Wall","shape":{"x":570,"y":10,"width":35,"height":250}},
            {
                "className":"Well",
                "shape": {
                    "x":400,
                    "y":70
                }
            },
            {
                "className":"Well",
                "shape": {
                    "x":700,
                    "y":280
                }
            }
        ],
        "startSource":{"degreeBlob":55,"shape": {"x":50,"y":50}},
        "endWell":{"shape": {"x":800,"y":100}}
    },
    {
        "initSize":{"width":1301,"height":656},
        "menuRotate":{"className":"Rotate","nb":10},
        "menuMagnet":{"className":"Magnet","nb":10},
        "staticEntities":
        [
            {"className":"Magnet","shape":{"x":450,"y":313}},
            {"className":"Well","shape":{"x":560,"y":450}},
            {"className":"Wall","shape":{"x":743,"y":500,"width":35,"height":100}}
        ],
        "startSource":{"degreeBlob":345,"shape":{"x":300,"y":150}},
        "endWell":{"shape":{"x":736,"y":128}}
    },
    {
        "initSize":{"width":1301,"height":656},
        "menuRotate":{"className":"Rotate","nb":5},
        "menuMagnet":{"className":"Magnet","nb":5},
        "staticEntities":
        [
            {"className":"Well","shape": {"x":300,"y":200}},
            {"className":"Wall","shape": {"x":550,"y":200,"height":180}}
        ],
        "startSource":{"degreeBlob":40,"shape": {"x":50,"y":100}},
        "endWell":{"shape": {"x":500,"y":250}}
    },
    {
        "initSize":{"width":1301,"height":411},
        "menuRotate":{"className":"Rotate","nb":5},
        "menuMagnet":{"className":"Magnet","nb":5},
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
