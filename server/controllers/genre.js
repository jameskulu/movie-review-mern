const Genre = require("../models/genre");

exports.read = async (req, res) => {
    try {
        const genres = await Genre.find({});
        res.status(200).json({
          success:true,
          data:genres,
          msg : "Genres fetched successfully."
        });
      } catch (err) {
        res.status(400).json({
          success:false,
          msg:err
        });
      }
}


exports.single = async (req, res) => {
    try {
        const genre = await Genre.findById(req.params.id);
        res.status(200).json({
          success:true,
          data:genre,
          msg : "Single genre fetched successfully."
        });
      } catch (err) {
        res.status(400).json({
          success:false,
          msg:err
        });
      }
}

exports.create = async (req, res) => {
    const { genre_name } = req.body;

  if (!genre_name) {
    return res.status(400).json({ msg: "Not all fields are inserted" });
  }
  const genre = new Genre({
    genre_name
  })
  try {
    const savedGenre = await genre.save();
    res.status(200).json({
      success:true,
      data:savedGenre,
      msg : "Genre created successfully."
    });
  } catch (err) {
    res.status(400).json({
      success:false,
      msg : err
    });
  }
}

exports.update = async (req, res) => {
  const data = req.body;

  try {
    const updatedGenre = await Genre.findByIdAndUpdate(req.params.id, data, {
      new: true,
    });
    res.status(200).json({
      success:true,
      data:updatedGenre,
      msg : "Genre updated successfully."
    });
  } catch (err) {
    res.status(400).json({
      success:false,
      msg:err
    });
  }
}


exports.remove = async (req, res) => {
    try {
        const deletedGenre = await Genre.findByIdAndDelete(req.params.id);
        res.status(200).json({
            success:true,
            data:deletedGenre,
            msg : "Genre deleted successfully."
        });
    } catch (err) {
    res.status(400).json({
        success:false,
        msg:err
    });
    }
}
