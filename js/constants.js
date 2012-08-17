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
                "class":"app.entities.Well", 
                "shape": {
                    "x":310,
                    "y":240,
                    "width":30,
                    "height":30,
                    "fill":true
                }
            },
            {
                "class":"app.entities.Well", 
                "shape": {
                    "x":500,
                    "y":120,
                    "width":30,
                    "height":30,
                    "fill":true
                }
            },
            {
                "class":"app.entities.Source", 
                "nbBlob":1,
                "shape": {
                    "x":50,
                    "y":50,
                    "width":30,
                    "height":30,
                    "fill":true
                }
            }
        ]
    }
]
