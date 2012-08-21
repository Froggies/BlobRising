var maps = [
    {
        "name":"1ere map",
        "class":"app.Map",
        "menuEntities":
        [
            {"class":"app.entities.Entity"}
        ],
        "staticEntities":
        [
            {
                "class":"app.entities.Entity", 
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
                    "x":200,
                    "y":150,
                    "width":50,
                    "height":50,
                    "fill":true
                }
            },
            {
                "class":"app.entities.Entity", 
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
                "class":"app.entities.Entity", 
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
