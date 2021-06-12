const router = require("express").Router();
const tokenVerify = require("../middleware/tokenVerify");
const isAdmin = require("./../middleware/adminVerify");
const upload = require("../middleware/uploads");
const { read, create, single, update, remove } = require('../controllers/actor')

// Get all the actors
router.get("/", read)

// Get a single actor
router.get("/:id", single)

// Create a new actor
router.post("/new", tokenVerify, isAdmin,upload.single("image"), create)

//Updating an existing actor
router.put("/update/:id", tokenVerify, isAdmin,upload.single("image"), update)

//Delete a actor
router.delete("/delete/:id", tokenVerify, remove)

module.exports = router;
