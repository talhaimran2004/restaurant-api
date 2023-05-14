import React, { useState } from "react";
import "./updateModal.scss";
import { AiOutlineClose } from "react-icons/ai";
import restaurantApi from "../../api/restaurantApi";
// import { toast } from "react-toastify";

const UpdateModal = ({ open, item }) => {
  console.log("from modal =>", item);


  const [updName, setUpdName] = useState(item[0].name)
  const [desc, setDesc] = useState(item[0].desc)
  const [price, setPrice] = useState(item[0].price)

  let updateItem = async (id) => {
    let response = await restaurantApi
      .patch(`food/${id}`, {
        updName, desc, price
      })
      .catch((error) => {
        console.log("Err =>", error);
      });
    console.log("update-resp => ", response);
  };

  return (
    <div className="update-modal">
      <div className="main">
        <h3 className="add-heading">Update Product</h3>

        <form
          action={`http://localhost:4000/api/food/${item[0]._id}`}
          method="PATCH"
          encType="multipart/form-data"
          className="add-form"
          onSubmit={() => updateItem(item[0]._id)}
        >
          <p>Product Name</p>
          <input type="text" name="updName" placeholder={item[0].name} value={updName} onChange={(e) => setUpdName(e.target.value)}/>
          <p>Description</p>
          <input type="text" name="updDesc" placeholder={item[0].desc} value={desc} onChange={(e) => setDesc(e.target.value)}/>
          <p>Price</p>
          <input type="number" name="updPrice" placeholder={item[0].price} value={price} onChange={(e) => setPrice(e.target.value)}/>
          <p>Product Image</p>
          <input type="file" name="uploaded-file" />
          <button type="submit">Update Product</button>
        </form>
      </div>

      <AiOutlineClose className="icon" onClick={() => open(false)} />
    </div>
  );
};

export default UpdateModal;
