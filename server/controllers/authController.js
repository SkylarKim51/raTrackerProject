const User = require('../models/user') //user schema, folder models, user.js
const bcrypt = require('bcrypt') //used to hash user password (probably so pass not visible on inspect/data stuff)
const jwt = require('jsonwebtoken') //jwt 
const asyncHandler = require('express-async-handler') //exception handler for express async functions

// @desc Login
// @route POST /auth
// @access Public

//CHANGE NOTES:
    //should change username to email, i prefer logging in with email, name is just for personability within the application
    //do i have any use for user.active and user.roles, most likely not
const login = async (req, res) => {
    //create email and password variables, 
    const { email, password } = req.body

    //user did not enter a email or password
    if (!email || !password) {
        return res.status(400).json({ message: 'All fields are required' })
    }

    //call user function find one and pass in the email
    //this implies that user has a built in function called findOne
    //exec is a search function for regex
    //seems that findOne is attached to the mongoose schema User, Notes schema also has one
    
    const foundUser = await User.findOne({ email }).exec()
    
    //did not find user or user is no longer active
    //findOne returns a user object which has attribute active?
    if (!foundUser) {
        return res.status(401).json({ message: 'Unauthorized' })
    }


    //user found, now to use bcrypt to see if correct password was entered
    const match = await bcrypt.compare(password, foundUser.password)

    // //seems match is a bool
    if (!match) return res.status(401).json({ message: 'Unauthorized' })
   
    //create the jwt token called accessToken
    //user schema has an attribute called roles, probbaly pertains to authorization
    //not sure what ACCESS_TOKEN_SECRET is 
    const accessToken = jwt.sign(
        {
            "UserInfo": {
                "email": foundUser.email,
                //"roles": foundUser.roles
            }
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: '15m' }
    )

    //creating a refreshToken using email and REFRESH_TOKEN_SECRET
    //not sure what for
    const refreshToken = jwt.sign(
        { "email": foundUser.email },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: '7d' }
    )

    // Create secure cookie with refresh token 
    res.cookie('jwt', refreshToken, {
        httpOnly: true, //accessible only by web server 
        secure: true, //https
        sameSite: 'None', //cross-site cookie 
        maxAge: 7 * 24 * 60 * 60 * 1000 //cookie expiry: set to match rT
    })

    // Send accessToken containing email and roles 
    res.json({ accessToken })
}

// @desc Refresh
// @route GET /auth/refresh
// @access Public - because access token has expired
const refresh = (req, res) => {
    const cookies = req.cookies

    if (!cookies?.jwt) return res.status(401).json({ message: 'Unauthorized' })

    const refreshToken = cookies.jwt

    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        asyncHandler(async (err, decoded) => {
            if (err) return res.status(403).json({ message: 'Forbidden' })

            const foundUser = await User.findOne({ username: decoded.username }).exec()

            if (!foundUser) return res.status(401).json({ message: 'Unauthorized' })

            const accessToken = jwt.sign(
                {
                    "UserInfo": {
                        "username": foundUser.username,
                        "roles": foundUser.roles
                    }
                },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '15m' }
            )

            res.json({ accessToken })
        })
    )
}

// // @desc Logout
// // @route POST /auth/logout
// // @access Public - just to clear cookie if exists
const logout = (req, res) => {
    const cookies = req.cookies
    if (!cookies?.jwt) return res.sendStatus(204) //No content
    res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true })
    res.json({ message: 'Cookie cleared' })
}

module.exports = {
    login,
    refresh,
    logout
}