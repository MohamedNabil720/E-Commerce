import React, { useContext, useState } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useQuery } from 'react-query'
import { cartContext } from '../../Context/cartContext';
import { toast } from 'react-toastify';
import HomeSlider from '../HomeSlider/HomeSlider';
import Products from '../Products/Products';
import MainSlider from '../HomeSlider/MainSlider';

export default function Home() {



    let { setCounter, addToCart } = useContext(cartContext)

    let [btnLoading, setBtnLoading] = useState(true)

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

    function getProducts() {
        return axios.get("https://ecommerce.routemisr.com/api/v1/products")
    }
    let { data } = useQuery('getProducts', getProducts)


    return (

        <>
            <MainSlider />
            <HomeSlider />
            <Products />


        </>
    )
}
