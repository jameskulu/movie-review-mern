const router = require("express").Router();
const tokenVerify = require("../middleware/tokenVerify");
const upload = require("../middleware/uploads");
const isAdmin = require("./../middleware/adminVerify");
const { register,
        login,
        read,
        single,
        update,
        remove,
        removeFromWatchlist,
        addToWatchlist,
        validToken } = require('../controllers/user')

//  User register
router.post("/register", upload.single("image"), register)

// // User Login
router.post("/login", login)

//Updating user
router.put("/update/:id", tokenVerify,upload.single("image"), update)

// add to Watchlist
router.put("/add-to-watchlist/:movieId", tokenVerify, addToWatchlist)

// remove from Watchlist
router.put("/remove-from-watchlist/:movieId", tokenVerify, removeFromWatchlist)

// Checking for a valid token
router.post("/tokenIsValid", validToken)

// Get user from the token
router.get("/", tokenVerify, single)

// Get all the users
router.get("/retrieve", read)

//Delete a user
router.delete("/delete/:id", tokenVerify, isAdmin, remove)


module.exports = router;