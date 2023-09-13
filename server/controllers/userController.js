const User = require('../models/user')
const asyncHandler = require('express-async-handler')
const bcrypt = require('bcrypt')

// @desc Get all users
// @route GET /users
// @access Private
const getAllUsers = asyncHandler(async (req, res) => {
    // Get all users from MongoDB
    const users = await User.find().select('-password').lean()

    // If no users 
    if (!users?.length) {
        return res.status(400).json({ message: 'No users found' })
    }

    res.json(users)
})

// @desc Create new user
// @route POST /users
// @access Private
const createNewUser = asyncHandler(async(req, res) => {
    const {email, password, name ,dob} = req.body

    //confirm data
    if(!name || !dob || !email || !password){
        return res.status(400).json({ message: 'All fields are required' })
    }
    
    const duplicate = await User.findOne({email}).lean().exec()

    if (duplicate) {
        return res.status(409).json({ message: 'This email is already registered with another user, please click sign in to login with this email or use a different email' })
    }
    
    // Hash password 
    //Hashing - takes plaintext data elements and converts them into 
        //consistent ciphertext outputs used for data verification
    //Salt - adds random characters to data, like passwords, to thwart 
        //hackers who look for consistent words and phrases in sensitive data in order to decode it
    const hashedPwd = await bcrypt.hash(password, 10) // salt rounds

    const userObject = {email, "password": hashedPwd, name, dob}

    
    //create and store new user
    const user = await User.create(userObject)
    

    if (user) { //created 
        res.status(201).json({ message: `New user ${name} created` })
    } else {
        res.status(400).json({ message: 'Invalid user data received' })
    }
})

module.exports = {
    getAllUsers,
    createNewUser
}