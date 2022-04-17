const path = require('path')
const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')
const mongoose = require('mongoose')

//load env variables
dotenv.config({ path: './config/config.env' })

const app = express()

const PORT = process.env.PORT

// Connect to db
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
   .then(() => {
      console.log('Connected to Database')
      app.listen(PORT, () => console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`))
      
   })
   .catch((err) => console.log(err))

// Body parser
app.use(express.json())

// Enable cors
app.use(cors())

// Set static folders for frontend 
app.use(express.static(path.join(__dirname, 'public')))

// Routes
app.use('/api/v1/stores', require('./routes/stores'))



