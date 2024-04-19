import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useQuery } from 'react-query'
import { cartContext } from '../../Context/cartContext';
import { toast } from 'react-toastify';


export default function Products() {



    let { setCounter, addToWishlist, addToCart, deleteWishlist } = useContext(cartContext)

    let [btnLoading, setBtnLoading] = useState(true)

    let [isLoading, setIsLoading] = useState(true)
    let [wishlistItems, setWishlistItems] = useState([]);

    useEffect(() => {
        const storedWishlistItems = JSON.parse(localStorage.getItem('wishlistItems'));
        if (storedWishlistItems) {
            setWishlistItems(storedWishlistItems);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('wishlistItems', JSON.stringify(wishlistItems));
    }, [wishlistItems]);

    async function addPoductToCart(id) {
        setBtnLoading(false)
        let { data } = await addToCart(id)
        console.log(data);
        if (data.status == 'success') {
            toast.success('Product added successfully')
            setCounter(data.numOfCartItems)
            setBtnLoading(true)
        }
    }
    async function toggleWishlist(id) {
        if (wishlistItems.includes(id)) {
            await deleteWishlist(id);
            setWishlistItems(wishlistItems.filter((itemId) => itemId !== id));
            toast.success('Item removed from wishlist');
        } else {
            await addToWishlist(id);
            setWishlistItems([...wishlistItems, id]);
            toast.success('Item added to wishlist');
        }
    }

    function getProducts() {
        let result = axios.get("https://ecommerce.routemisr.com/api/v1/products")
        return result;
    }
    let { data } = useQuery('getProducts', getProducts, {
        onSuccess: () => setIsLoading(false),
    });


    return (

        <>

            <div className="container">
                <div className="row my-5">


                    {data?.data.data.map((item) => {

                        return <div className="col-md-4 col-lg-3 " key={item._id}>
                            <div className="product py-3 px-2 rounded-3 cursor-pointer">

                                <Link to={'/product-details/' + item._id}>
                                    <img className='w-100 mb-3' src={item.imageCover} alt="" />
                                    <div className='d-flex justify-content-between'>
                                        <div>
                                            <span className='text-main'> {item.category.name} </span>
                                            <p className=''> {item.title.split(' ').slice(0, 2).join(' ')} </p>
                                        </div>
                                    </div>
                                    <div className='d-flex justify-content-between'>
                                        <div> {item.price} EGP </div>
                                        <div>  <i className="fa-solid fa-star rating-color"></i> <span>{item.ratingsAverage}</span> </div>
                                    </div>


                                </Link>

                                <div className='d-flex justify-content-between'>
                                    <button disabled={!btnLoading} onClick={() => addPoductToCart(item._id)} className='btn bg-main text-white w-100' >
                                        {btnLoading ? ' Add To Cart' : 'Loading...'}
                                    </button>

                                    <div onClick={() => toggleWishlist(item._id)}>
                                        <i className={`fa-solid fa-heart fs-4 mt-3 px-2 ${wishlistItems.includes(item._id) ? 'text-red' : 'text-main'}`}></i>
                                    </div>

                                </div>

                            </div>


                        </div>

                    })}

                </div>
            </div>

        </>
    )
}
