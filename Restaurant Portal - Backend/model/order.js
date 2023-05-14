const mongoose = require("mongoose");

let orderSchema = new mongoose.Schema({
  fullname: {
    type: String,
    // require: [true, "full cannot be blank"],
  },
  email: {
    type: String,
    // require: [true, "User Email cannot be blank"],
    trim: true,
    unique: [true, "Email must be unique"]
  },
  number: {
    type: Number,
    // require: [true, "Contact Number cannot be blank"],
  },
  address: {
    type: String,
    // require: [true, "Address cannot be blank"],
  },
  country: {
    type: String,
    // require: [true, "Country cannot be blank"],
  },
  city: {
    type: String,
    // require: [true, "City cannot be blank"],
  },
  postalCode: {
    type: Number,
    // require: [true, "Postal Code cannot be blank"],
    trim: true,
  },
  orderStatus: {
    type: String,
    default: "pending",
  },
  orderDetails: {
    type: {},
    // require: [true, "Order Details cannot be blank"],
  }

});

module.exports = mongoose.model("Orders", orderSchema);
