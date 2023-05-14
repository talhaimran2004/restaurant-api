const express = require("express")
const multer = require("multer");
const { storage, getAllOrders, createOrder, getSingleOrder, updateOrderStatus, deleteOrder } = require("../controller/orders");

const router = express.Router()

router.route('/').get(getAllOrders)

const upload = multer({ storage });

router.route('/place-order').post(createOrder)

router.route('/:id').get(getSingleOrder).patch(updateOrderStatus).delete(deleteOrder)

module.exports = router
