
import axios from 'axios';
import React from 'react'
import { useQuery } from 'react-query'
import Slider from "react-slick";


export default function HomeSlider() {

    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 2,
        autoplay: true,
    };

    function getCatSlider() {

        return axios.get("https://ecommerce.routemisr.com/api/v1/categories")
    }
    let { data } = useQuery("catSlider", getCatSlider)
    return (

        <>


            <div className="container py-5">
                <h2 className='mb-3'> Shop Popular Categories </h2>
                <Slider {...settings}>
                    {data?.data?.data.map((el) => <div key={el._id}>
                        <img src={el.image} height={200} className='w-100 pb-1' alt="" />
                        <p > {el.name} </p>
                    </div>)}
                </Slider>
            </div>
        </>



    )
}
