const mongoose = require("mongoose");

const SignUp = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    dateofbirth: {
        type: Date,
        required: true
    },

    email: {
        type: String,
        required: true
    },

    password: {
        type: String,
        required: true
    },
});

const SignIn = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },

    password: {
        type: String,
        required: true
    }
})

//module.exports = user = mongoose.model('signIn'. SignIn);
module.exports = user = mongoose.model('signUp', SignUp);


// const dbConfig = require("../config/db.config");

// const mongoose = require("mongoose");
// mongoose.Promise = global.Promise;

// const db = {};
// db.mongoose = mongoose;
// db.url = dbConfig.url;
// db.tutorials = require("./tutorial.model.js")(mongoose);

// module.exports = db;