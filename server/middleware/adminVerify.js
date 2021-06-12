const User = require("./../models/User");

const isAdmin = async (req, res, next) => {
  const user = await User.findById(req.user._id);

  if (user.role == "admin") {
    next();
  } else {
    res.status(401).json({ msg: "Access Denied" });
  }
};

module.exports = isAdmin;
