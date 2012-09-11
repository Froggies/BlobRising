var logLevel = 1;
var devName = "m@n";
var className = "";
console.log("Logs start for " + devName + " with " + logLevel + " level");

var maps = [
    {
        "menuRotate":{"className":"Rotate","nb":0},
        "menuMagnet":{"className":"Magnet","nb":1},
        "staticEntities":
        [
            {"className":"Wall","shape": {"x":400,"y":300,"width":180}},
            {"className":"Magnet","shape": {"x":350,"y":470}},
            {"className":"Magnet","shape": {"x":680,"y":450}},
            {"className":"Magnet","shape": {"x":820,"y":300}},
            {"className":"Magnet","shape": {"x":735,"y":100}}
        ],
        "startSource":{"degreeBlob":50,"shape": {"x":150,"y":350}},
        "endWell":{"shape": {"x":200,"y":100}}
    },
    {
        "menuRotate":{"className":"Rotate","nb":3},
        "menuMagnet":{"className":"Magnet","nb":1},
        "staticEntities":
        [
            {"className":"Well","shape": {"x":300,"y":200}},
            {"className":"Wall","shape": {"x":550,"y":200,"height":180}}
        ],
        "startSource":{"degreeBlob":40,"shape": {"x":50,"y":100}},
        "endWell":{"shape": {"x":500,"y":250}}
    },
    {
        "menuRotate":{"className":"Rotate","nb":10},
        "menuMagnet":{"className":"Magnet","nb":10},
        "staticEntities":
        [
            {"className":"Wall","shape": {"x":500,"y":150,"width":35,"height":300}},
            {"className":"Wall","shape": {"x":700,"y":150,"width":300,"height":35}},
            {"className":"Wall","shape": {"x":700,"y":415,"width":300,"height":35}},
            {"className":"Wall","shape": {"x":10,"y":150,"width":300,"height":35}},
            {"className":"Wall","shape": {"x":10,"y":415,"width":300,"height":35}},
            {"className":"Well","shape": {"x":500,"y":150}},
            {"className":"Well","shape": {"x":500,"y":415}}
        ],
        "startSource":{"degreeBlob":0,"firstAgeForLostBlob":500,"shape": {"x":550,"y":250}},
        "endWell":{"shape": {"x":400,"y":250}}
    },
    {
        "initSize":{"width":1301,"height":411},
        "menuRotate":{"className":"Rotate","nb":10},
        "menuMagnet":{"className":"Magnet","nb":2},
        "staticEntities":
        [
            {"className":"Wall","shape":{"x":100,"y":100,"width":150,"height":35}},
            {"className":"Wall","shape":{"x":100,"y":100,"width":35,"height":300}},
            {"className":"Wall","shape":{"x":100,"y":250,"width":150,"height":35}},
            {"className":"Wall","shape":{"x":100,"y":400,"width":150,"height":35}},
            {"className":"Wall","shape":{"x":250,"y":100,"width":35,"height":335}},
            
            {"className":"Wall","shape":{"x":350,"y":100,"width":35,"height":300}},
            {"className":"Wall","shape":{"x":350,"y":400,"width":150,"height":35}},
            
            {"className":"Wall","shape":{"x":550,"y":100,"width":150,"height":35}},
            {"className":"Wall","shape":{"x":550,"y":100,"width":35,"height":300}},
            {"className":"Wall","shape":{"x":550,"y":400,"width":150,"height":35}},
            {"className":"Wall","shape":{"x":700,"y":100,"width":35,"height":335}},
            
            {"className":"Wall","shape":{"x":800,"y":100,"width":150,"height":35}},
            {"className":"Wall","shape":{"x":800,"y":100,"width":35,"height":300}},
            {"className":"Wall","shape":{"x":800,"y":250,"width":150,"height":35}},
            {"className":"Wall","shape":{"x":800,"y":400,"width":150,"height":35}},
            {"className":"Wall","shape":{"x":950,"y":100,"width":35,"height":335}},
            
            {
                "className":"Well",
                "shape": {
                    "x":100,
                    "y":300
                }
            },
            {
                "className":"Well",
                "shape": {
                    "x":1000,
                    "y":450
                }
            }
        ],
        "startSource":{"degreeBlob":0,"firstAgeForLostBlob":700,"shape": {"x":10,"y":10}},
        "endWell":{"shape": {"x":850,"y":500}}
    },
    {
        "initSize":{"width":1301,"height":411},
        "menuRotate":{"className":"Rotate","nb":4},
        "menuMagnet":{"className":"Magnet","nb":4},
        "staticEntities":
        [
            {"className":"Wall","shape":{"x":200,"y":10,"width":35,"height":300}},
            {"className":"Wall","shape":{"x":200,"y":10,"width":35,"height":300}},
            {"className":"Wall","shape":{"x":310,"y":280,"width":200,"height":35}},
            {"className":"Wall","shape":{"x":650,"y":280,"width":260,"height":35}},
            {"className":"Wall","shape":{"x":570,"y":10,"width":35,"height":230}},
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
                    "x":800,
                    "y":450
                }
            }
        ],
        "startSource":{"degreeBlob":55,"firstAgeForLostBlob":800,"shape": {"x":50,"y":50}},
        "endWell":{"shape": {"x":800,"y":100}}
    }
];
