const mongoose = require('mongoose')

const ActorSchema = mongoose.Schema({
  actor_name: {
    type: String,
    required: true,
  },
  bio: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    enum: ['male', 'female', 'others'],
    required: true
  },
  date_of_birth: {
    type: String
  },
  image: {
    type: String,
    default: "uploads\\no-image.jpg"
  },
  movie: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Movie'
    }
  ],
}, { timestamps: true })


module.exports = mongoose.model('Actor', ActorSchema)