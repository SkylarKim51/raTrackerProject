var MongoClient = require('mongodb').MongoClient;
var url = "mongodb+srv://SkylarKim:SMong51DB@cluster0.5vjuyfa.mongodb.net/?retryWrites=true&w=majority";
var dbName = "RATRACKERPROJECT";

//created the collection but user wont ever use this function
function createFirstCollection(){
    MongoClient.connect(url, function(err, db){
        if(err) throw err;
        var dbo = db.db(dbName);
        dbo.createCollection("raTrackerUsers", function(err, res){
            if(err) throw err;
            console.log("collection created");
            db.close();
        });
    });
};

//when user input an email, name and password and clicks create account
//search mongo for email if true return error
//make username and sign in
function createUser(){
    MongoClient.connect(url, function(err, db){
        if(err) throw err;
        var dbo = db.db(dbName);
        var userOne = {name: "Skylar Kim", medications: "Rinvoq", stressLevel: "6", exercise: "Legs", food: "red meat, white rice", painLevel: "0", painLocations: "N/A", sleep: "10", date: "11/18/2022"};
        dbo.collection("raTrackerUsers").insertOne(userOne, function(err, res){
            if(err) throw err;
            console.log("1 new user added");
            db.close();
        })
    });
};

function userEntry(object){
    MongoClient.connect(url, function(err, db){
        if(err) throw err;
        var dbo = db.db(dbName);

        dbo.collection("raTrackerUsers").insertOne(object, function(err, res){
            if(err) throw err;
            console.log("1 new user added");
            db.close();
        })
    });
}
