const mongoose = require('mongoose')

const GenreSchema = mongoose.Schema({
  genre_name: {
    type: String,
    required: true,
  }
}, { timestamps: true })


module.exports = mongoose.model('Genre', GenreSchema)