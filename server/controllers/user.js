const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
    const { username, email, password, role } = req.body;

    //Checking all fields
    if (!email || !username || !password) {
      return res.status(400).json({ msg: "Not all fields have been entered" });
    }
  
    //Checking Password length
    if (password < 6)
      return res.status(400).json({
        success: false,
        msg: "Password must be atleast 7 characters long",
      });
  
    // Checking if the same username exists
    const usernameExists = await User.findOne({ username: username });
    if (usernameExists)
      return res.status(400).json({
        success: false,
        msg: "Username already exists"
      });
  
    // Checking if the same email exists
    const emailExists = await User.findOne({ email: email });
    if (emailExists)
      return res.status(400).json({
        success: false,
        msg: "Email already exists"
      });
  
    // Hashing password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
  
    // Creating a new user
    const user = new User({
      username: username,
      email: email,
      password: hashedPassword,
      role: role,
      image: 'uploads\\no-image.jpg'
    });
  
    // Create and assign a token
    const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
  
    try {
      const savedUser = await user.save();
      res.status(200).json({
        success: true,
        msg: "Account has been created successfully.",
        token: token,
      });
    } catch (err) {
      res.status(400).json({
        success: false,
        msg: "User register failed",
      });
    }
}

exports.login = async (req, res) => {
    const { email, password } = req.body;

    // Checking all fields
    if (!email || !password)
      return res
        .status(400)
        .json({ success: false, msg: "Not all fields have been entered" });
  
    // Checking if the email exists
    const user = await User.findOne({ email: email })
      .populate({
        path: 'watchlist',
        model: 'Movie',
        populate: {
          path: 'actor',
          model: 'Actor'
        }
      })


    if (!user)
      return res.status(400).json({ success: false, msg: "Invalid credentials" });
  
    // Checking if password is correct
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword)
      return res.status(400).json({ success: false, msg: "Invalid credentials" });
  
    // Create and assign a token
    const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
  
    try {
      res.status(200).json({
        success: true,
        msg: "Login successfull",
        token: token,
        user: user
      });
    } catch (ex) {
      res.status(400).json({
        success: false,
        msg: "User login failed",
      });
    }
}

exports.update = async (req, res) => {
    if (req.file == undefined) {
        req.body.image = 'uploads\\no-image.jpg'
       }
       else{
        req.body.image = req.file.path;
       }
    
      const data = req.body;
    
      try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, data, {
          new: true,
        })
        .populate({
          path: 'watchlist',
          model: 'Movie',
          populate: {
            path: 'actor',
            model: 'Actor'
          }
        })
        // .then(user => user.populate('watchlist').execPopulate())
        

        res.status(200).json({
          success:true,
          data:updatedUser,
          msg : "Profile Updated successfully."
        });
      } catch (err) {
        res.status(400).json({
          success:false,
          msg : err
        });
      }
}

exports.addToWatchlist = async (req, res) => {
    const userId =  req.user._id;

    try {
      var watchlist = await User.findByIdAndUpdate(
        userId,
        { $push: { watchlist: req.params.movieId } },
        { new: true }
       )
       .populate({
        path: 'watchlist',
        model: 'Movie',
        populate: {
          path: 'actor',
          model: 'Actor'
        }
      })
  
      res.status(200).json({
        success:true,
        data:watchlist,
        msg : "Movie watchlisted successfully."
      });
    } catch (err) {
      res.status(400).json({
        success:false,
        msg:err
      });
    }
}

exports.removeFromWatchlist = async (req, res) => {
    const userId =  req.user._id;

    try {
      var watchlist = await User.findByIdAndUpdate(
        userId,
        { $pull: { watchlist: req.params.movieId } },
        { new: true }
      ).populate({
        path: 'watchlist',
        model: 'Movie',
        populate: {
          path: 'actor',
          model: 'Actor'
        }
      })
      
      res.status(200).json({
        success:true,
        data:watchlist,
        msg : "Movie removed from watchlist successfully."
      });
    } catch (err) {
      res.status(400).json({
        success:false,
        msg:err
      });
    }
}

exports.validToken = async (req, res) => {
    if (!req.headers.authorization) {
        return res.status(401).json(false);
      }
    
      try {
        const token = req.headers.authorization.split(" ")[1];
        if (!token) return res.json(false);
    
        const verified = jwt.verify(token, process.env.TOKEN_SECRET);
        if (!verified) return res.json(false);
    
        const user = await User.findById(verified);
        if (!user) return res.json(false);
    
        return res.json(true);
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
}

exports.single = async (req, res) => {
    const user = await User.findById(req.user._id)
    .populate("watchlist")
    res.json(user)
}

exports.read = async (req, res) => {
    try {
        const users = await User.find({})
        .populate("watchlist")
    
        res.status(200).json({
          success:true,
          data:users,
          msg : "Users fetched successfully."
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
        const deletedUser = await User.findByIdAndDelete(req.params.id);
        
        res.status(200).json({
          success:true,
          data:deletedUser,
          msg : "User deleted successfully."
        });
      } catch (err) {
        res.status(400).json({
          success:false,
          msg:err
        });
      }
}