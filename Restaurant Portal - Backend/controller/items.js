const multer = require("multer");
const product = require("../model/item");
const asyncWrapper = require("../middlewares/async");

let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/uploads/items");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

let getAllItems = asyncWrapper(async (req, res) => {
  let allItems = await product.find();
  res.status(200).json({ allItems });
});

let getSingleItem = asyncWrapper(async (req, res) => {
  let { id: itemID } = req.params;
  let singleItems = await product.find({ _id: itemID });
  res.status(200).json({ singleItems });
});

let createItem = asyncWrapper(async (req, res) => {
  let item = await product.create({
    name: req.body.name,
    desc: req.body.desc,
    price: req.body.price,
    productImage: req.file.path,
  });

  res.status(200).redirect("http://localhost:3000/dashboard/all-products");
});

var url = require("url");
let UpdateItem = asyncWrapper(async (req, res) => {
  let { id: itemID } = req.params;
  
  let updatedItem = await product.findOneAndUpdate(
    { _id: itemID },
    {
      name: req.body.updName,
      desc: req.body.updDesc,
      price: req.body.updPrice,
      productImage: "public\\uploads\\1683706301686-nihari.png",
    },
    {
      new: true,
      runValidators: true,
    }
  );
    
  // console.log("Update req =>", updatedItem);
  res.status(200).json({ updatedItem });
});

let DeleteItem = asyncWrapper(async (req, res) => {
  let { id: itemID } = req.params;
  let DeletedItem = await product.deleteOne({ _id: itemID });
  res.status(200).json({ DeletedItem });
});

module.exports = {
  getAllItems,
  getSingleItem,
  createItem,
  UpdateItem,
  DeleteItem,
  storage,
};
