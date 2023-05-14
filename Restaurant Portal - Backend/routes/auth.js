const express = require("express")
const multer = require("multer");
const { getAllUsers, createUser, getSingleUser, updateUser, deleteUser, storage, loginUser, getCurrentUser } = require("../controller/auth");

const router = express.Router()

router.route('/').get(getAllUsers)

const upload = multer({ storage });

router.route('/signup').post(upload.single("profile-image"), createUser)
router.route('/login').post(loginUser)
router.route('/current-user').get(getCurrentUser)

router.route('/:id').patch(updateUser).delete(deleteUser)
router.route('/:email').get(getSingleUser)


module.exports = router
    