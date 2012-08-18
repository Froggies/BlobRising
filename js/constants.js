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
                    "x":500,
                    "y":50,
                    "width":30,
                    "height":30,
                    "fill":true
                }
            },
            {
                "class":"app.entities.Well", 
                "nbBlobMax":5,
                "shape": {
                    "x":500,
                    "y":180,
                    "width":30,
                    "height":30,
                    "fill":true
                }
            }
        ]
    }
]
