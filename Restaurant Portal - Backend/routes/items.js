const express = require("express")
const multer = require("multer");
const { getAllItems, createItem, getSingleItem, UpdateItem, DeleteItem, form, storage } = require("../controller/items")

const router = express.Router()

router.route('/').get(getAllItems)

const upload = multer({ storage });

router.route('/add-product').post(upload.single("uploaded-file"), createItem)

router.route('/:id').get(getSingleItem).patch(UpdateItem).delete(DeleteItem)

module.exports = router
