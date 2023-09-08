require('dotenv').config()
const express = require("express");
const app = express();
const path = require('path')
const { logger, logEvents } = require('./middleware/logger') //not sure about this
const errorHandler = require('./middleware/errorHandler')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const corsOptions = require('./config/corsOptions')
const connectDB = require('./config/dbConn')
const mongoose = require('mongoose')
const PORT = process.env.PORT || 5000;

//keeping track of something or just checking idk
//this just logs ("development")
//console.log(process.env.NODE_ENV)

connectDB()

app.use(logger)

app.use(cors(corsOptions))

app.use(express.json())

app.use(cookieParser())

//__dirname is a global variable used to point to current directory
// public is where static files are stored such as css or images that can be used on server
app.use('/', express.static(path.join(__dirname, '/public')))


//all our normal routes should be here, if called then these will execute
app.use('/', require('./routes/root'))
app.use('/auth', require('./routes/authRoutes'))
app.use('/users', require('./routes/userRoutes'))

//wont use this anymore
//app.use('/', require('./routes/record'))

//this handles all bad requests
app.all('*', (req, res) => {
  res.status(404)
  if (req.accepts('html')){
    res.sendFile(path.join(__dirname, 'views', '404.html'))
  }
  else if (req.accepts('json')){
    res.json({message: '404 Not Found'})
  }
  else {
    res.type('txt').send('404 Not Found')
  }
})

app.use(errorHandler)

mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB')
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
})

mongoose.connection.on('error', err => {
  console.log(err)
  logEvents(`${err.no}: ${err.code}\t${err.syscall}\t${err.hostname}`, 'mongoErrLog.log')
})