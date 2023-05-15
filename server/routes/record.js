const express = require('express');
const app = express()
const recordRoutes = express.Router();

const dbo = require("../config/conn");

//const User = require('../models/user');

var bodyParser = require('body-parser');

var jsonParser = bodyParser.json();

var urlencodedParser = bodyParser.urlencoded({extended: true});

app.use(jsonParser);
app.use(urlencodedParser)


//possibly for getting any object or record by id
const ObjectId = require("mongodb").ObjectId;

//Show all records
recordRoutes.route("/record", (req, res) => {
    let db_connect = dbo.getDb("RATRACKERPROJECT");
    db_connect.collection("raTrackerUsers").find({}).toArray(function(err, result){
            if (err) throw err;
            res.json(result);
        });
});

// recordRoutes.route("/userEntry").get(function (req, res){
//     dbo.createUser();
// });

recordRoutes.route("/showUsers").get(function(req, res){
    dbo.showAllUsers();
});

recordRoutes.route("/signIn").get(function(req, res){
    dbo.userSignIn();
});

recordRoutes.post("/signUp", function (req, res) {
    let myobj = {
        name: req.body.name,
        email: req.body.email,
        dob: req.body.dob,
        password: req.body.password,
    }
    console.log(req.body)
    // let db_connect = dbo.getDb("RATRACKERPROJECT");
    // db_connect.collection("raTrackerUsers").insertOne(myobj, function(err, result){
    //         console.log("record.js route");
    //         if (err) throw err;
    //         res.json(result);
    //     });
    dbo.createUser(myobj);
});



// recordRoutes.route("/record/:id").get

// recordRoutes.route("/record/add").post

// recordRoutes.route("/record/delete")

module.exports = recordRoutes;