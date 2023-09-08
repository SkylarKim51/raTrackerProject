const User = require('../models/user')
const asyncHandler = require('express-async-handler')
const bcrypt = require('bcrypt')

// @desc Create new user
// @route POST /users
// @access Private
const createNewUser = asyncHandler(async(req, res) => {
    const {email, password, name ,dateofbirth} = req.body

    //confirm data
    if(!name || !dateofbirth || !email || !password){
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

    const userObject = {email, "password": hashedPwd, email, dateofbirth}

    //create and store new user
    const user = await User.create(userObject)

    if (user) { //created 
        res.status(201).json({ message: `New user ${name} created` })
    } else {
        res.status(400).json({ message: 'Invalid user data received' })
    }
})

module.exports = {
    createNewUser
}