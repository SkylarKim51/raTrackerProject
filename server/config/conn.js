var MongoClient = require("mongodb").MongoClient;
const Db = "mongodb+srv://SkylarKim:SMong51DB@cluster0.5vjuyfa.mongodb.net/?retryWrites=true&w=majority";
http://localhost:5000/userEntry
var _db;

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

    createUser: function (){
        MongoClient.connect(Db, function(err, db){
            if(err) throw err;
            var dbo = db.db("RATRACKERPROJECT");
            var userOne = {name: "Skylar Kim", medications: "Rinvoq", stressLevel: "6", exercise: "Legs", food: "red meat, white rice", painLevel: "0", painLocations: "N/A", sleep: "10", date: "4/30/2023"};
            dbo.collection("raTrackerUsers").insertOne(userOne, function(err, res){
                if(err) throw err;
                console.log("1 new user added");
                db.close();
            })
            return
        });
    },
};