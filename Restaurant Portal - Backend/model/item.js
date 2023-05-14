const mongoose = require("mongoose");

let itemSchema = new mongoose.Schema({
  name: {
    type: String,
    require: [true, "Product Name cannot be blank"],
    trim: true,
    unique: [true, "Product Name must be unique"],
  },
  desc: {
    type: String,
    require: [true, "Product Description cannot be blank"],
    trim: true,
  },
  price: {
    type: Number,
    require: [true, "Product Price cannot be blank"],
    trim: true,
  },
  productImage: {
    type: String,
    data: Buffer,
    contentType: String,
    require: [true, "Product Image cannot be empty"],
  },
});

module.exports = mongoose.model("Items", itemSchema);
