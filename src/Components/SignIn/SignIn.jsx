import axios from 'axios';
import { useFormik } from 'formik'
import React, { useState } from 'react'
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom'


export default function SignIn() {

    let [errorMsg, setErrorMsg] = useState()

    let navigate = useNavigate()

    async function senDataToApi(values) {

        axios.post('https://ecommerce.routemisr.com/api/v1/auth/signin', values).then(({ data }) => {

            if (data.message == "success") {
                navigate('/home')
                console.log(data);

                localStorage.setItem("token", data.token)
            }

        }).catch(err => {
            console.log(err);
            setErrorMsg(err.response.data.message)
        })

    }

    function validationSchema() {

        let errors = Yup.object({
            email: Yup.string().email("email is not valid").required('email is requird'),
            password: Yup.string().required("password is requird").matches(/^[a-zA-Z0-9]{3,}$/, "password must start with Capitalize & at lest 4 carr "),
        })

        return errors
    }

    let register = useFormik({
        initialValues: {

            "email": "",
            "password": "",
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
                    <h2 className='mb-3'> Login Now :</h2>
                    <form onSubmit={register.handleSubmit}>

                        <label htmlFor="email"> email : </label>
                        <input onBlur={register.handleBlur} onChange={register.handleChange} id='email' name='email' type="text" className={`form-control mb-3 ${register.errors.email ? 'is-invalid' : ''}`} />
                        {register.errors.email && register.touched.email ? <div className='alert alert-danger'> {register.errors.email} </div> : ''}

                        <label htmlFor="password"> password : </label>
                        <input onBlur={register.handleBlur} onChange={register.handleChange} id='password' name='password' type="text" className={`form-control mb-3 ${register.errors.password ? 'is-invalid' : ''}`} />
                        {register.errors.password && register.touched.password ? <div className='alert alert-danger'> {register.errors.password} </div> : ''}


                        {errorMsg ? <div className='alert alert-danger'> {errorMsg}</div> : ''}

                        <div className='w-100 text-end'>
                            <button disabled={!(register.isValid && register.dirty)} type='submit' className='btn bg-main text-white '> Login </button>
                        </div>

                    </form>
                </div>
            </div>

        </div>
    )
}
