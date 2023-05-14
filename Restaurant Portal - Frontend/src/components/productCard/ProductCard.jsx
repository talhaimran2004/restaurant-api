import React from 'react'
import './productCard.scss'
import { RiAddCircleFill } from 'react-icons/ri'
import { useDispatch } from 'react-redux'
import { addItem } from '../../store/cartSlice'
import { toast } from 'react-toastify';


const ProductCard = ({ item, index }) => {

    let dispatch = useDispatch()

    let addToCart = () => {
        dispatch(
            addItem({
                id: item.id,
                title: item.title,
                imgURL: item.imgURL,
                price: item.price
            }
            )
        )
        toast.success('Product Added Successfully!')
    }

    return (
        <div className='product-card' key={index}>
            <div className="img">
                <img src={`http://localhost:4000/${item.productImage.slice(7)}`} alt="product" />
            </div>

            <div className="text">
                <h3 className="name">
                    {item.name}
                </h3>

                <div className="category">
                    {item.desc}
                </div>

                <hr />

                <div className="card-bottom">
                    <div className="price">{item.price}</div>
                    <RiAddCircleFill className='add-icon' onClick={addToCart} />
                </div>
            </div>
        </div>
    )
}

export default ProductCard
