const express = require('express')
const router = express.Router()
const entryController = require('../controllers/entryController')
const verifyJWT = require('../middleware/verifyJWT')

router.use(verifyJWT)

router.route('/')
    .get(entryController.getAllEntry)
    .post(entryController.createNewEntry)

module.exports = router