import { useFormik } from 'formik'
import React, { useContext, useEffect, useState } from 'react'
import { cartContext } from '../../Context/cartContext';

export default function AddressPage() {


    let { createCheckout, getUserCart } = useContext(cartContext)

    let [items, setItems] = useState([])

    useEffect(() => {
        (async () => {

            let { data } = await getUserCart()


            if (data?.response?.data?.statusMsg == "fail") {
                return setItems({ statusMsg: 'fail' })
            }

            setItems(data?.data)


        })()
    }, [])

    console.log();

    async function checkOutCart(values) {

        let data = await createCheckout(items._id, values)
        window.location.href = data.data.session.url
        console.log(data);


    }

    let formik = useFormik({

        initialValues: {
            details: "",
            phone: "",
            city: ""
        },

        onSubmit: checkOutCart,

    })



    return (

        <div>

            <div className="container mt-5">

                <form onSubmit={formik.handleSubmit}>


                    <label htmlFor="details">Details :</label>
                    <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.details} name='details' id='details' className=' form-control mb-3' type="text" />

                    <label htmlFor="phone">Phone :</label>
                    <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.phone} name='phone' id='phone' className=' form-control mb-3' type="tel" />

                    <label htmlFor="city">City :</label>
                    <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.city} name='city' id='city' className=' form-control mb-3' type="text" />


                    <button onClick={() => checkOutCart} type='submit' className='btn bg-main text-white'> Pay Now </button>

                </form>
            </div>


        </div>
    )
}
