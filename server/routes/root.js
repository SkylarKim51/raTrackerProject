const express = require('express')
const router = express.Router()
const path = require('path')

//this means the request was:
    // '/' or /index or /index.html 
    //all return this  
router.get('^/$|/index(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'index.html'))
})

module.exports = router