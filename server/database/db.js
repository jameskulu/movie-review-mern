const mongoose = require('mongoose')
require('dotenv').config()

// Connect to Mongodb
mongoose.connect(process.env.DB_SECRET,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
  }, () => {
    console.log("Connected to mongodb database")
    console.log(mongoose.connection.readyState)
})