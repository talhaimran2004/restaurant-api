const multer = require("multer");
const orders = require("../model/order");
const asyncWrapper = require("../middlewares/async");

let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/uploads/items");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

let getAllOrders = asyncWrapper(async (req, res) => {
  let allOrders = await orders.find();
  res.status(200).json({ allOrders });
});

let getSingleOrder = asyncWrapper(async (req, res) => {
  let { id: itemID } = req.params;
  let singleOrder = await orders.find({ _id: itemID });
  res.status(200).json({ singleOrder });
});

let createOrder = asyncWrapper(async (req, res) => {
    console.log(req.body);
    res.status(200).redirect("http://localhost:3000/checkout");

    
//   let item = await orders.create({
//     fullname: req.body.fullname,
//     email: req.body.email,
//     number: req.body.number,
//     address: req.body.address,
//     country: req.body.country,
//     city: req.body.city,
//     postalCode: req.body.postal-code,
//     orderDetails: {
//         totalQuantity: req.body.totalQuantity,
//         totalAmount: req.body.totalAmount,
//         cartItems: req.body.cartItems
//     },
    
//   });

//   console.log(req.headers);
//   console.log(req.headers);
//   console.log(req.headers);
  
});

let updateOrderStatus = asyncWrapper(async (req, res) => {
  let { id: itemID } = req.params;
  
  let updatedOrder = await orders.findOneAndUpdate(
    { _id: itemID },
    {
      orderStatus: req.body.orderStatus,
    },
    {
      new: true,
      runValidators: true,
    }
  );
    
  // console.log("Update req =>", updatedItem);
  res.status(200).json({ updatedOrder });
});

let deleteOrder = asyncWrapper(async (req, res) => {
  let { id: itemID } = req.params;
  let DeletedOrder = await orders.deleteOne({ _id: itemID });
  res.status(200).json({ DeletedOrder });
});

module.exports = {
  getAllOrders,
  getSingleOrder,
  createOrder,
  updateOrderStatus,
  deleteOrder,
  storage,
};
