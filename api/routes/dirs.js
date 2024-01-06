var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
// router.get('/', function(req, res, next) {
//     res.send('Api is working');
// });
// MongoClient.connect(url, function(err, db) {
//     if (err) throw err;
//     console.log("Database created!");
//     db.close();
// });

router.get('/', function(req, res, next) {
    res.send("Hello get is working perfectly fine")
});
router.post('/', function(req, res, next) {
    const response = {
        "file": null, 
        "names": null, 
        "links": null,
    };
    link = req.body.link;
    if (link != undefined){
        response.names = ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten"];
        response.links = ["/" + link + "/one", "/" + link + "/two", "/" + link + "/three", "/" + link + "/four",
         "/" + link + "/five", "/" + link + "/six", "/" + link + "/seven", "/" + link + "/eight", "/" + link + "/nine", "/" + link + "/ten"]
    }
    else{
        response.names = ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten"];
        response.links = ["/one", "/two", "/three", "/four", "/five", "/six", "/seven", "/eight", "/nine", "/ten"]
    }
    res.json(response)
});
module.exports = router;