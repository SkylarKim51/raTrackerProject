const mongoose = require('mongoose')

//not sure if needed, can add a number to each entry
//would possibly use if it increments based on user (ie, "this is user foo's xth entry")
    //then it could possible help with displaying or finding
// const AutoIncrement = require('mongoose-sequence')(mongoose)
// entrySchema.plugin(AutoIncrement, 'entry');
const entrySchema = new mongoose.Schema(
    {
        userEmail: {
            type: String,
            required: true
        },

        todaysDate: {
            type: Date, 
            required: true
        },

        painLevel: {
            type: Number,
            required: true
        },

        sleepLevel: {
            type: Number,
            required: true
        },

        stressLevel: {
            type: Number,
            required: true
        },

        allMeds: {
            type: Array,
            required: true
        },

        exercise: {
            type: Boolean,
            required: true
        },

        allFoods: {
            type: Array,
            required: true
        },
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model('Entry', entrySchema)