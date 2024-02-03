var express = require('express');
var router = express.Router();
var sql = require('mysql2');
var con = sql.createConnection({
    port: process.env.DB_PORT || 3306,
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER || "root",
    database : process.env.DB_NAME || "beta_files",
    password: process.env.DB_PASSWORD || "saidbek"
});

async function queryDB(hash){
    await con.connect( async function(error) {
        console.log("Connected to database");
        if (error) throw error;
        // hash == undefined
        if (hash == undefined){
            let myQuery = "SELECT DISTINCT folder_1 FROM study_materials ORDER BY folder_1";
            let QueryResults = await new Promise((resolve, reject) => con.query(myQuery, (err, QueryResults) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(QueryResults);
                    console.log("Finished querying database");
                }
            }));
            console.log(QueryResults);
            result = {
                "names": [],
                "links": [],
            }
            for (var i = 0; i < QueryResults.length;i++){
                result.names.push(QueryResults[i].folder_1);
                result.links.push("folders/" + result.names[i]);
            }
        }
        else{
            folders = hash.split("_");
            console.log(folders)
            // "SELECT DISTINCT Folder_2 FROM study_materials WHERE Folder_1 = \"" + hash + "\" ORDER BY Folder_2"
            let myQuery = 'SELECT DISTINCT ' + "folder_" + (folders.length + 1) + " FROM study_materials  WHERE ";
            for(i = 0; i < folders.length; i++){
                myQuery +="folder_" + (i + 1) + " = \"" + folders[i] + "\"";
                if (i != folders.length-1){
                    myQuery += " AND ";
                }
            }
            myQuery += " ORDER BY folder_" + (folders.length + 1);
            console.log(myQuery);
            let results = await new Promise((resolve, reject) => con.query(myQuery, (err, results) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(results);
                    console.log("Finished querying database");
                }
            }));
            console.log(results);
            result = {
                "names": [],
                "links": [],
            }
            for (var i = 0; i < results.length;i++){
                result.names.push(results[i]["folder_"+ (folders.length + 1)]);
                if (result.names[i].slice(-4) == ".pdf"){
                    result.links.push("/files/" +  result.names[i]);
                }
                result.links.push("/folders/" + hash + "_" + result.names[i]);

            }
        }
    });
    console.log(result)
    return result;
}


//test function for GET requests
router.get('/', function(req, res, next) {
    res.send("Hello get is working perfectly fine");
});

// primary api endpoint for POST requests
router.post('/', async function(req, res, next) {

    hash = req.body.hash;
    console.log(hash);
    const response =  await queryDB(hash);
    console.log(response);
    res.json(response)
});
module.exports = router;