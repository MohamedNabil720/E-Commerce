import axios from 'axios';
import { useFormik } from 'formik'
import React, { useState } from 'react'
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom'


export default function SignUp() {

    let [errorMsg, setErrorMsg] = useState()

    let navigate = useNavigate()

    async function senDataToApi(values) {

        axios.post('https://ecommerce.routemisr.com/api/v1/auth/signup', values).then(({ data }) => {

            if (data.message == "success") {
                navigate('/signin')
            }

        }).catch(err => {
            console.log(err);
            setErrorMsg(err.response.data.message)
        })

    }

    function validationSchema() {

        let errors = Yup.object({

            name: Yup.string("").max(20).required("name is requird"),
            email: Yup.string().email("email is not valid").required('email is requird'),
            password: Yup.string().required("password is requird").matches(/^[a-zA-Z0-9]{3,}$/, "password must start with Capitalize & at lest 4 carr "),
            rePassword: Yup.string().required("rePassword is requird").oneOf([Yup.ref('password')], "rePassword not matched"),
            phone: Yup.string().required("phone is requird").matches(/^01[0125][0-9]{8}$/, "phone is not valid")
        })

        return errors
    }

    let register = useFormik({
        initialValues: {

            "name": "",
            "email": "",
            "password": "",
            "rePassword": "",
            "phone": ""

        },
        validationSchema,

        onSubmit: (values) => {

            console.log(values);
            senDataToApi(values)

        }
    })

    console.log(register.errors);
    return (

        <div>

            <div className="container">
                <div className='mt-5'>
                    <h2 className='mb-3'> Register Now :</h2>
                    <form onSubmit={register.handleSubmit}>

                        <label className=' fw-bold' htmlFor="name"> name : </label>
                        <input onBlur={register.handleBlur} onChange={register.handleChange} id='name' name='name' type="text" className={`form-control mb-3 ${register.errors.name ? 'is-invalid' : ''}`} />
                        {register.errors.name && register.touched.name ? <div className='alert alert-danger'> {register.errors.name} </div> : ''}


                        <label htmlFor="email"> email : </label>
                        <input onBlur={register.handleBlur} onChange={register.handleChange} id='email' name='email' type="text" className={`form-control mb-3 ${register.errors.email ? 'is-invalid' : ''}`} />
                        {register.errors.email && register.touched.email ? <div className='alert alert-danger'> {register.errors.email} </div> : ''}

                        <label htmlFor="password"> password : </label>
                        <input onBlur={register.handleBlur} onChange={register.handleChange} id='password' name='password' type="text" className={`form-control mb-3 ${register.errors.password ? 'is-invalid' : ''}`} />
                        {register.errors.password && register.touched.password ? <div className='alert alert-danger'> {register.errors.password} </div> : ''}

                        <label htmlFor="rePassword"> rePassword : </label>
                        <input onBlur={register.handleBlur} onChange={register.handleChange} id='rePassword' name='rePassword' type="text" className={`form-control mb-3 ${register.errors.rePassword ? 'is-invalid' : ''}`} />
                        {register.errors.rePassword && register.touched.rePassword ? <div className='alert alert-danger'> {register.errors.rePassword} </div> : ''}

                        <label htmlFor="phone"> phone : </label>
                        <input onBlur={register.handleBlur} onChange={register.handleChange} id='phone' name='phone' type="text" className={`form-control mb-3 ${register.errors.phone ? 'is-invalid' : ''}`} />
                        {register.errors.phone && register.touched.phone ? <div className='alert alert-danger'> {register.errors.phone} </div> : ''}

                        {errorMsg ? <div className='alert alert-danger'> {errorMsg}</div> : ''}

                        <div className='w-100 text-end'>
                            <button disabled={!(register.isValid && register.dirty)} type='submit' className='btn bg-main text-white '> Register </button>
                        </div>

                    </form>
                </div>
            </div>

        </div>
    )
}
