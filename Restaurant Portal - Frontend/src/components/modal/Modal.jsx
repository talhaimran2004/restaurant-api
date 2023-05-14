import { collection, getDocs, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import useAuth from '../../customHooks/useAuth';
import { db } from '../../firebase.config';
import ProductCard from '../productCard/ProductCard';
import ProductList from '../productList/ProductList';
import './modal.scss'
import { GrClose } from 'react-icons/gr'

const Modal = ({ user, setModal }) => {

    const { currentUser } = useAuth()
    const [data, setData] = useState({})


    let fetchData = async () => {
        const q = query(collection(db, "orders"), where("uid", "==", user.uid));

        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            setData(doc.data())
        });
    }
    useEffect(() => {
        fetchData();
    }, [])
    console.log(data);

    return (
        <div className='modal'>
            <div className='icon-div'>
                <GrClose className='icon' onClick={()=>setModal(false)}/>
            </div>
            {
                data.cartItems?.map(item => <ProductCard item={item} />)
            }
        </div>

    )
}

export default Modal
