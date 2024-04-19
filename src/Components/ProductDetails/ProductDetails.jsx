import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useParams } from 'react-router-dom'

export default function ProductDetails() {


    let { id } = useParams()


    let [product, setProduct] = useState([])

    async function getProduct() {

        let { data } = await axios.get("https://ecommerce.routemisr.com/api/v1/products/" + id)
        console.log(data.data);
        setProduct(data.data)
    }

    useEffect(() => {
        getProduct()
    }, [])

    return (

        <>

            <div className="container">
                <div className="row my-5 align-items-center" >
                    <div className="col-md-4 "> <img className='w-100' src={product.imageCover} alt="" /> </div>

                    <div className="col-md-8">

                        <div className=' fw-bolder fs-3'> {product.title} </div>
                        <div className='my-3' > {product.description} </div>
                        <div className='text-main'> {product?.category?.name} </div>

                        <div className='d-flex justify-content-between my-3'>
                            <div> {product.price} EGP </div>
                            <div>  <i className="fa-solid fa-star rating-color"></i> <span>{product.ratingsAverage}</span> </div>
                        </div>

                        <div className='d-flex'>
                            <button className='btn w-100 bg-main text-white'> + Add to cart </button>
                            <div>
                                <i className="fa-solid fa-heart fs-2 cursor-pointer mt-1 text-main px-2"></i>
                            </div>
                        </div>

                    </div>

                </div>
            </div>

        </>
    )
}
