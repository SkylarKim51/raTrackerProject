const Entry = require('../models/entry')
const User = require('../models/user')

// @desc Get all entries
// @route GET /entry
// @access Private
const getAllEntry = async(req, res) => {
    //Get all notes from MongoDB
    const entries = await Entry.find().lean()

    //User has no entries currently
    if(!entries?.length) {
        return res.status(400).json({message: 'No entries found'})
    }

        // Add email to each note before sending the response 
    // See Promise.all with map() here: https://youtu.be/4lqJBBEpjRE 
    // You could also do this with a for...of loop
    const entryWithUser = await Promise.all(entries.map(async (entry) => {
        const user = await User.findById(entry.userEmail).lean().exec()
        return { ...entry, email: user.userEmail }
    }))

    res.json(entryWithUser)
}

// @desc Create new entry
// @route POST /entry
// @access Private
const createNewEntry = async(req, res) => {

    const {userEmail, todaysDate, painLevel, sleepLevel, stressLevel, allMeds, exercise, allFoods} = req.body

    //confirm data
    // if(!userEmail || !todaysDate || !painLevel || !sleepLevel || !stressLevel || !allMeds|| !exercise || !foods){
    //     return res.status(400).json({message: 'All fields are required'})

    // }

    // Check for duplicate title
    // i dont think i want this, duplicates are fine with me
    // const duplicate = await Note.findOne({ title }).collation({ locale: 'en', strength: 2 }).lean().exec()

    // if (duplicate) {
    //     return res.status(409).json({ message: 'Duplicate note title' })
    // }

    const entry = await Entry.create({userEmail, todaysDate, painLevel, sleepLevel, stressLevel, allMeds, exercise, allFoods})

    //console.log(entry)

    if (entry) {
        return res.status(201).json({ message: 'New entry created'})
    } else {
        return res.status(400).json({ message: 'Invalid entry data received'})
    }
}

module.exports = {
    getAllEntry,
    createNewEntry
    //, updateEntry
    //deleteEntry
}