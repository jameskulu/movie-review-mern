const Movie = require("../models/Movie");

exports.search = async (req, res) => {
    const q = req.query.q
    try{
        const searchedMovie = await Movie.find({movie_name:{$regex: q, $options: '$i'}})
        .populate("actor")
    
        res.status(200).json({
        success:true,
        msg:"Movie searched sucessfully",
        data:searchedMovie
        })
    }
    catch(err){
        res.status(400).json({
        success:false,
        msg:err,
        })
    }
}

exports.read = async (req, res) => {
    try {
        const movies = await Movie.find({})
        .populate("actor")
    
        res.status(200).json({
          success:true,
          data:movies,
          msg : "Movies fetched successfully."
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
        const movie = await Movie.findById(req.params.id)
        .populate("actor")

        res.status(200).json({
          success:true,
          data:movie,
          msg : "Single movie fetched successfully."
        });
      } catch (err) {
        res.status(400).json({
          success:false,
          msg:err
        });
      }
}

exports.create = async (req, res) => {
    if(req.file){
        req.body.image = req.file.path;
      }
  
      const { movie_name, summary, length, director, release_date,rating,actor,genre,image } = req.body;
      // const image = req.file.path
  
      if (!movie_name || !summary || !length || !director || !release_date || !genre) {
        return res.status(400).json({ msg: "Not all fields are inserted" });
      }
  
      const movie = new Movie({
        movie_name,
        summary,
        length,
        rating,
        director,
        release_date,
        image,
        actor,
        genre
      });
  
      try {
        const savedMovie = await movie.save() 
          .then(mov =>
            mov.populate('actor')
            .execPopulate())
  
        res.status(200).json({
          success:true,
          data:savedMovie.populate("actor"),
          msg : "Movie created successfully."
        });
      } catch (err) {
        res.status(400).json({
          success:false,
          msg:err.message
        });
      }
}


exports.update = async (req, res) => {
    if(req.file){
        req.body.image = req.file.path;
      }
    
      const data = req.body;
    
      try {
        const updatedMovie = await Movie.findByIdAndUpdate(req.params.id, data, {
          new: true,
        })
        .populate("actor")
    
        res.status(200).json({
          success:true,
          data:updatedMovie,
          msg : "Movie updated successfully."
        });
      } catch (err) {
        res.status(400).json({
          success:false,
          err:err.message
        });
      }
}

exports.remove = async (req, res) => {
    try {
        const deletedMovie = await Movie.findByIdAndDelete(req.params.id)
        .populate("actor")
        
        res.status(200).json({
          success:true,
          data:deletedMovie,
          msg : "Movie deleted successfully."
        });
      } catch (err) {
          res.status(400).json({
          success:false,
          msg:err
        });
      }
}

exports.addComment = async (req, res) => {
    const movieId = req.params.movieId
    const comment = {
      text: req.body.text,
      commentedBy: req.body.commentedBy,
      image: req.body.image
    };
  
    try {
      var movie = await Movie.findByIdAndUpdate(
        movieId,
        { $push: { comment: comment } },
        { new: true }
      )
      .populate("actor")
      
      res.status(200).json({
        success:true,
        data:movie,
        msg : "Commented successfully."
      });
    } catch (err) {
      res.status(400).json({
        success:false,
        msg:err
      });
    }
}

exports.removeComment = async (req, res) => {
  const movieId = req.params.movieId
  const comment = {
    text: req.body.text,
    commentedBy: req.body.commentedBy,
    image:req.body.image
  };

  try {
    var movie = await Movie.findByIdAndUpdate(
      movieId,
      { $pull: { comment: comment } },
      { new: true }
    )
    .populate("actor")
    
    res.status(200).json({
      success:true,
      data:movie,
      msg : "Comment deleted successfully."
    });
  } catch (err) {
    res.status(400).json({
      success:false,
      msg:err
    });
  }
}
