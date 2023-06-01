var MongoClient = require("mongodb").MongoClient;
const Db = "mongodb+srv://SkylarKim:SMong51DB@cluster0.5vjuyfa.mongodb.net/?retryWrites=true&w=majority";
http://localhost:5000/userEntry
var _db;
const express = require('express');
const app = express()
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
var urlencodedParser = bodyParser.urlencoded({extended: true});
app.use(jsonParser);
app.use(urlencodedParser)

module.exports = {
    connectToServer: function (callback) {
        MongoClient.connect(Db, function (err, db){
            if (err) throw err;
            console.log("Successfully connected to MongoDB");
            _db = db.db("RATRACKERPROJECT");
            return callback(err);
        });
    },
    getDb: function () {
        return _db;
    },

    createUser: function (userOne){
        MongoClient.connect(Db, function(err, db){
            if(err) throw err;
            var dbo = db.db("RATRACKERPROJECT");
            //var userOne = {name: "Skylar Kim", medications: "Rinvoq", stressLevel: "6", exercise: "Legs", food: "red meat, white rice", painLevel: "0", painLocations: "N/A", sleep: "10", date: "4/30/2023"};
            dbo.collection("raTrackerUsers").insertOne(userOne, function(err, res){
                if(err) throw err;
                console.log("1 new user added");
                db.close();
            })
            return;
        });
    },
    
    //need to fill in correct functionality
    userSignIn: function (userSignIn, callBack){
        var userObj = null;
        MongoClient.connect(Db, function(err, db){
            if(err) throw err;
            var dbo = db.db("RATRACKERPROJECT");
            //dbo.collection("raTrackerUsers").findOne({email: userSignIn.email, password: userSignIn.password}, {_id: 1, email:0, name:0, password:0, dob:0});
            dbo.collection("raTrackerUsers").findOne({email: userSignIn.email, password: userSignIn.password}, function(error, res){
                if(error) throw error;
                if(res != null){
                    return callBack(res.name);
                }
                else{
                    return callBack(null);
                }
            });
        })
    },

    showAllUsers: function (){
        MongoClient.connect(Db, function(err, db){
            if(err) throw err;
            var dbo = db.db("RATRACKERPROJECT");
            dbo.collection("raTrackerUsers").find({}).toArray(function (err, result) {
                if (err) throw err;
                console.log(result);
              });
        })
    },


    //need to fill in correct functionality
    // userSignUp: function (newUser){
    //     MongoClient.connect(Db, function(err, db){
    //         if(err) throw err;
    //         var dbo = db.db("RATRACKERPROJECT");
    //         dbo.collection("raTrackerUsers").find({}).toArray(function (err, result) {
    //             if (err) throw err;
    //             console.log(result);
    //           });

    //     })
    // }
};