import React, { useContext, useEffect, useState } from 'react'
import { cartContext } from '../../Context/cartContext';
import { toast } from 'react-toastify';
import { Oval } from 'react-loader-spinner';
import { Link } from 'react-router-dom';

export default function Cart() {


    let { setCounter, getUserCart, deleteCart, updateCart } = useContext(cartContext)

    let [items, setItems] = useState([])

    let [isLoading, setIsLoading] = useState(true)

    let [numData, setNumData] = useState([])


    async function removeItemFromCart(id) {

        let { data } = await deleteCart(id)
        console.log(data);
        setItems(data?.data)
        setCounter(data.numOfCartItems)
        toast.success('item removed successfully')
    }

    async function updateItem(id, count) {

        let { data } = await updateCart(id, count)
        setItems(data?.data)
    }



    useEffect(() => {
        (async () => {
            let data = await getUserCart()

            console.log(data);
            setIsLoading(false)
            if (data?.response?.data?.statusMsg == "fail") {
                return setItems({ statusMsg: 'fail' })
            }
            setItems(data?.data?.data)
            setNumData(data)
        })()
    }, [])






    if (items?.products?.length == 0 && !isLoading) return <h1 className='text-main text-center mt-5 bg-main-light p-5'> your Cart is empty </h1>

    if (items.statusMsg == 'fail' && !isLoading) return <h1 className='text-main text-center mt-5 bg-main-light p-5'> your Cart is empty </h1>

    return (

        <div>
            {(numData?.data?.numOfCartItems) ?
                <div className="container bg-main-light p-3 my-5">
                    <h2> Shop Cart :</h2>
                    <p className='text-main'> {items?.totalCartPrice} EGP </p>

                    {items?.products.map(item => {

                        return <div key={item._id} className="row border-bottom p-2">
                            <div className="col-md-1 ">
                                <img src={item.product.imageCover} className='w-100' alt="" />
                            </div>
                            <div className="col-md-11 d-flex justify-content-between align-items-center">
                                <div>
                                    <p> {item.product.title.split(' ').slice(0, 5).join(' ')} </p>
                                    <div className='text-main mb-2'> price : {item.price} </div>
                                    <button onClick={() => removeItemFromCart(item.product._id)} className=' btn cursor-pointer'> <i className="fa-solid fa-trash text-main me-1"></i> Remove  </button>
                                </div>
                                <div>
                                    <button onClick={() => updateItem(item.product._id, item.count + 1)} className='btn brdr'>+</button>
                                    <span className='mx-2'> {item.count} </span>
                                    <button disabled={item.count == 1} onClick={() => updateItem(item.product._id, item.count - 1)} className='btn brdr'>-</button>
                                </div>
                            </div>
                        </div>
                    })}

                    <Link to={'/address'} className='btn bg-main text-white my-4 w-25'> Place Order </Link>

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
                </div>
            }



        </div>
    )
}
