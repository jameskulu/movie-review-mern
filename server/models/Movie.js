const mongoose = require("mongoose");

const MovieSchema = mongoose.Schema(
  {
    movie_name: {
      type: String,
      required: true,
    },
    summary: {
      type: String,
      required: true,
    },
    length: {
      type: String,
      required: true,
    },
    rating:{
        type:Number,
        default:0
    },
    director: {
      type: String,
      required: true,
    },
    release_date: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      default: "uploads\\no-image.jpg"
    },
    genre:{
      type:String
    },
    actor: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Actor",
      },
    ],
    comment: [
      {
        text: {
          type: String,
        },
        commentedBy: {
          type: String,
        },
        image:{
          type: String,
        },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Movie", MovieSchema);
