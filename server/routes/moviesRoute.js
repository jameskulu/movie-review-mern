const router = require("express").Router();
const tokenVerify = require("../middleware/tokenVerify");
const isAdmin = require("./../middleware/adminVerify");
const upload = require("../middleware/uploads");
const { read, create, single, update, remove, search, addComment, removeComment } = require('../controllers/movie') 

// Searching movies
router.get('/s', search)

// Get all the movies
router.get("/", read)

// Get a single movie
router.get("/:id", single)

// Create a new movie
router.post("/new", tokenVerify, isAdmin, upload.single("image"), create);

//Updating an existing movie
router.put("/update/:id", tokenVerify, isAdmin, upload.single("image"), update)

//Deleting a movie
router.delete("/delete/:id", tokenVerify, isAdmin, remove)

// creating a new comment
router.put("/add-comment/:movieId", tokenVerify, addComment)

// deleting a comment
router.put("/remove-comment/:movieId", tokenVerify, removeComment)

module.exports = router;
