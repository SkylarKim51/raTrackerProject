var MongoClient = require('mongodb').MongoClient;
var url = "mongodb+srv://SkylarKim:SMong51DB@cluster0.5vjuyfa.mongodb.net/?retryWrites=true&w=majority";

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("mydb");
  dbo.collection("customers").drop(function(err, delOK) {
    if (err) throw err;
    if(delOK) console.log("Collection deleted");
    db.close();
  });
});

