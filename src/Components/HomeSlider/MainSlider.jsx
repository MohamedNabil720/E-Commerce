import React from 'react'
import Slider from "react-slick";

import img1 from '../../assets/images/slider-image-1.jpeg'
import img2 from '../../assets/images/slider-image-2.jpeg'
import img3 from '../../assets/images/slider-image-3.jpeg'
import img4 from '../../assets/images/blog-img-1.jpeg'
import img5 from '../../assets/images/blog-img-2.jpeg'


export default function MainSlider() {

    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
    };

    return (
        <div>
            <div className="container">
                <div className="row mt-5">
                    <div className="col-md-9">

                        <Slider {...settings}>
                            <img src={img1} height={400} className='w-100 rounded-2' alt="" />
                            <img src={img2} height={400} className='w-100' alt="" />
                            <img src={img3} height={400} className='w-100' alt="" />

                        </Slider>
                    </div>

                    <div className="col-md-3">

                        <img src={img4} height={200} className='w-100' alt="" />
                        <img src={img5} height={200} className='w-100' alt="" />
                    </div>
                </div>
            </div>

        </div>
    )
}
