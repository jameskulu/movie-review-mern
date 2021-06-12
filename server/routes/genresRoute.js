const router = require("express").Router();
const tokenVerify = require("../middleware/tokenVerify");
const isAdmin = require("./../middleware/adminVerify");
const { read, create, single, update, remove } = require('../controllers/genre') 

// Get all the genres
router.get("/", read)

// Get a single genre
router.get("/:id", single)

// Create a new genre
router.post("/new", tokenVerify, isAdmin, create)

//Updating an existing genre
router.put("/update/:id", tokenVerify, isAdmin, update)

//Delete a genre
router.delete("/delete/:id", tokenVerify, isAdmin, remove)


module.exports = router;
