import React from "react";
import "./addProduct.scss";

const AddProducts = () => {
  return (
    <div>
      <h3 className="add-heading">Add Product</h3>
      <form
        action="http://localhost:4000/api/food/add-product"
        method="POST"
        encType="multipart/form-data"
        className="add-form"
      >
        <p>Product Name</p>
        <input type="text" placeholder="name" name="name" required />

        <p>Description</p>
        <input type="text" placeholder="description" name="desc" required />

        <div>
          <p>Price</p>
          <input type="text" placeholder="price" name="price" required />
        </div>

        <p>Product Image</p>
        <input type="file" name="uploaded-file" required />

        <button type="submit">Add Product</button>
      </form>
    </div>
  );
};

export default AddProducts;
