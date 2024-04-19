import React from 'react'
import masterCard from '../../assets/images/logo.png'
import amazon from '../../assets/images/amazon-pay.png'
import paypal from '../../assets/images/social.png'
import american from '../../assets/images/american-express.png'
import appstore from '../../assets/images/appStore.png'
import google from '../../assets/images/googleplay.png'

export default function Footer() {


    return (


        <>

            <div className="container my-5 bg-main-light p-5 p-sm-3">

                <h2> Get the Fresh Cart app </h2>
                <p> We will send you a link, open it on phone to download the app </p>
                <div className="row border-bottom pb-4">

                    <div className="col-lg-9 col-md-8 col-sm-6">
                        <input className=' form-control' type="text" placeholder='Email..' />
                    </div>

                    <div className="col-lg-3 col-md-4 btn-mt col-sm-6 ">
                        <button className='btn bg-main  w-100 text-white'> Share App Link </button>

                    </div>
                </div>

                <div className='row border-bottom pb-4 my-3'>
                    <div className="col-md-6 col-sm-12">
                        <span className='fs-6 fw-bolder '> Payment Partners</span>

                        <img className='sm-img mx-2' src={masterCard} alt="" />
                        <img className='sm-img mx-2' src={amazon} alt="" />
                        <img className='sm-img mx-2' src={paypal} alt="" />
                        <img className='sm-img mx-2' src={american} alt="" />

                    </div>

                    <div className="col-md-6 d-md-block text-end text-sm-start d-lg-flex d-flex justify-content-center">

                        <span className=' fs-6 fw-bolder me-3'> Get deliveries with FreshCart </span>

                        <div className='d-flex sm-img-app '>
                            <div className="col-md-6 me-3"> <img className='sm-img-app mx-2 w-100' src={appstore} alt="" /></div>
                            <div className="col-md-6"><img className=' sm-img-google mx-2 w-100' src={google} alt="" /></div>




                        </div>

                    </div>
                </div>
            </div>

        </>
    )
}
