import React, { useContext, useEffect, useState } from 'react'
import { cartContext } from '../../Context/cartContext';
import { toast } from 'react-toastify';
import { Oval } from 'react-loader-spinner';

export default function Wishlist() {


    let { setCounter, deleteWishlist, getWishlist, addToCart } = useContext(cartContext)

    const [items, setItems] = useState([])

    let [btnLoading, setBtnLoading] = useState(true)

    let [isLoading, setIsLoading] = useState(true)

    async function addPoductToWishlist(id) {
        setBtnLoading(false)
        let { data } = await addToCart(id)
        console.log(data);
        if (data.status == 'success') {
            toast.success('Product added successfully')
            setCounter(data.numOfCartItems)
            setBtnLoading(true)
        }
    }
    async function removeItemFromWishlist(id) {
        let { data } = await deleteWishlist(id);
        console.log(data);
        if (data && data.status === 'success') {
            const updatedItems = items.filter(item => item._id !== id);
            setItems(updatedItems);
            toast.success('Item removed successfully');
        } else {
            toast.error('Failed to remove item from wishlist');
        }
    }
    useEffect(() => {
        (async () => {

            let { data } = await getWishlist()

            setIsLoading(false)
            if (data?.response?.data?.statusMsg == "fail") {
                return setItems({ statusMsg: 'fail' })
            }
            setItems(data?.data)
            console.log(data);
        })()

    }, [])


    console.log(items);



    if (items.length == 0 && !isLoading) return <h1 className='text-main text-center mt-5 bg-main-light p-5'> your wishlist is empty </h1>



    return (

        <div>
            {items.length > 0 ? <div className="container bg-main-light p-3 my-5">
                <h2> My Wishlist :</h2>

                {items?.map(element => {

                    return <div key={element._id} className="row border-bottom p-2">
                        <div className="col-md-1 ">
                            <img src={element.imageCover} className='w-100' alt="" />
                        </div>
                        <div className="col-md-11 d-flex justify-content-between align-items-center">
                            <div>
                                <p> {element.title.split(' ').slice(0, 5).join(' ')} </p>
                                <div className='text-main mb-2'> price : {element.price} </div>
                                <button onClick={() => removeItemFromWishlist(element._id)} className=' btn cursor-pointer'> <i className="fa-solid fa-trash text-main me-1"></i> Remove  </button>
                            </div>
                            <div>
                                <button disabled={!btnLoading} onClick={() => addPoductToWishlist(element._id)} className='btn bg-main text-white w-100' >
                                    Add To Cart
                                </button>
                            </div>
                        </div>
                    </div>
                })}
            </div> : <div className=' d-flex justify-content-center mt-5'>
                <Oval
                    visible={true}
                    height="80"
                    width="80"
                    color="#4fa94d"
                    ariaLabel="oval-loading"
                    wrapperStyle={{}}
                    wrapperClass=""
                />
            </div>}





        </div>
    )
}
