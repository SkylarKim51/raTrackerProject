const express = require("express");

const recordRoutes = express.Router();

const dbo = require("../config/conn");
//const dbo = require("../usermodule");
const ObjectId = require("mongodb").ObjectId;

//Show all records
recordRoutes.route("/record").get(function (req, res){
    let db_connect = dbo.getDb("RATRACKERPROJECT");
    db_connect.collection("raTrackerUsers").find({}).toArray(function(err, result){
            if (err) throw err;
            res.json(result);
        });
});

recordRoutes.route("/userEntry").get(function (req, res){
    dbo.createUser();
});



// recordRoutes.route("/record/:id").get

// recordRoutes.route("/record/add").post

// recordRoutes.route("/record/delete")

module.exports = recordRoutes;