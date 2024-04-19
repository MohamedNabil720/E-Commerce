import axios from 'axios'
import React from 'react'
import { useQuery } from 'react-query'


export default function Categories() {

    function getCategory() {

        return axios.get("https://ecommerce.routemisr.com/api/v1/categories")
    }

    let { data } = useQuery("catSlider", getCategory);



    return (

        <div>

            <div className="container py-5">
                <div className="row g-4">
                    {data?.data?.data.map((el) => <div key={el._id} className='col-md-4'>
                        <div className='text-center  border-1 brand  rounded-3'>
                            <div> <img src={el.image} height={400} className='w-100 rounded-top-2 ' alt="" /> </div>
                            <div>  <p className='py-3 fs-3 fw-bold text-main'> {el.name} </p> </div>

                        </div>
                    </div>)}
                </div>
            </div>
        </div>
    )
}
