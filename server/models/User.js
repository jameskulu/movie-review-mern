const mongoose = require('mongoose')

const UserSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    min: 6
  },
  role: {
    type: String,
    enum: ['admin', 'user'],
    default: 'user'
  },
  age:{
    type:String
  },
  address:{
    type:String
  },
  image:{
    type:String,
    default:"uploads\\no-image.jpg"
  },
  watchlist:[
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Movie",
    },
  ],
}, { timestamps: true })


module.exports = mongoose.model('User', UserSchema)