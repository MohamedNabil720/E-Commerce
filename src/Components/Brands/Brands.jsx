import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Oval } from 'react-loader-spinner';

export default function Brands() {


    const [brands, setBrands] = useState([])
    let [isLoading, setIsLoading] = useState(true)


    async function getBrands() {

        let { data } = await axios.get("https://ecommerce.routemisr.com/api/v1/brands")
        setBrands(data?.data)
        setIsLoading(false)
    }

    useEffect(() => {

        getBrands()
    }, [])



    return (

        <>

            <div className="container my-5">
                <div className="row g-4">

                    {isLoading ? <div className=' d-flex justify-content-center'>
                        <Oval
                            visible={true}
                            height="80"
                            width="80"
                            color="#4fa94d"
                            ariaLabel="oval-loading"
                            wrapperStyle={{}}
                            wrapperClass=""
                        />
                    </div> : ''}

                    {brands.map((el) => <div key={el._id} className='col-md-3 cursor-pointer'>
                        <div className='text-center  border-1 brand  rounded-3'>
                            <img src={el.image} className='w-100  rounded-3' alt="" />
                            <h2> {el.name} </h2>
                        </div>
                    </div>)}

                </div>
            </div>

        </>
    )
}
