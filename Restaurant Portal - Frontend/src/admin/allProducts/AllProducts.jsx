import React, { useEffect, useState } from "react";
import "./allProducts.scss";
import restaurantApi from "../../api/restaurantApi";
import UpdateModal from "../../components/update-modal/UpdateModal";

const AllProducts = () => {
  const [modal, setModal] = useState(false);
  const [item, setItem] = useState([]);
  const [data, setData] = useState([]);

  let deleteProduct = async (id) => {
    let response = await restaurantApi.delete(`food/${id}`).catch((error) => {
      console.log("Err =>", error);
    });
    console.log("Resp =>", response.data.allItems);
  };

  let updateProduct = async (id) => {
    
    let response = await restaurantApi.get(`food/${id}`).catch((error) => {
      console.log("Err =>", error);
    });
    let temp = response.data.singleItems;
    setItem(temp)
    setModal(true);
  };

  useEffect(() => {
    const fetchItems = async () => {
      let response = await restaurantApi.get("food").catch((error) => {
        console.log("Err =>", error);
      });

      console.log("Resp =>", response.data.allItems);
      setData(response.data.allItems);
    };
    fetchItems();
  }, [setData]);

  return (
    <div className="all-products-section">
      <table>
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Description</th>
            <th>Price</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td className="image">
                <img
                  src={`http://localhost:4000/${item.productImage.slice(7)}`}
                  alt="product-pic"
                />
              </td>
              <td>{item.name}</td>
              <td>{item.desc}</td>
              <td>{item.price}</td>
              <td>
                <button
                  className="update-btn"
                  onClick={() => updateProduct(item._id)}
                >
                  Update
                </button>
                <button
                  className="delete-btn"
                  onClick={() => deleteProduct(item._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {modal && <UpdateModal open={setModal} item={item} />}
    </div>
  );
};

export default AllProducts;
