const Actor = require("../models/Actor");

exports.read = async (req, res) => {
    try {
        const actors = await Actor.find({}).populate("movie");
        res.status(200).json({
          success:true,
          data:actors,
          msg : "Actors fetched successfully."
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
        const actor = await Actor.findById(req.params.id).populate("movie");
        res.status(200).json({
          success:true,
          data:actor,
          msg : "Single actor fetched successfully."
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
    
      const { actor_name, bio, gender,date_of_birth,image,movie } = req.body;
    
      if (!actor_name || !bio || !gender || !date_of_birth) {
        return res.status(400).json({ msg: "Not all fields are inserted" });
      }
    
      const actor = new Actor({
        actor_name,
        bio,
        gender,
        date_of_birth,
        image,
        movie
      });
    
      try {
        const savedActor = await actor.save()
          .then(actor => actor.populate('movie').execPopulate())
        
        res.status(200).json({
          success:true,
          data:savedActor,
          msg : "Actor created successfully."
        });
      } catch (err) {
        res.status(400).json({
          success:false,
          msg : err
        });
      }
}

exports.update = async (req, res) => {
    if(req.file){
        req.body.image = req.file.path;
      }
    
      const data = req.body;
    
      try {
        const updatedActor = await Actor.findByIdAndUpdate(req.params.id, data, {
          new: true,
        }).populate("movie");
        res.status(200).json({
          success:true,
          data:updatedActor,
          msg : "Actor updated successfully."
        });
      } catch (err) {
        res.status(400).json({
          success:false,
          msg : err
        });
      }
}

exports.remove = async (req, res) => {
    try {
        const deletedActor = await Actor.findByIdAndDelete(req.params.id)
          .populate("movie");
          
        res.status(200).json({
          success: true,
          data: deletedActor,
          msg: "Actor deleted successfully."
        });
      } catch (err) {
        res.status(400).json({
          success:false,
          msg : err
        });
      }
}