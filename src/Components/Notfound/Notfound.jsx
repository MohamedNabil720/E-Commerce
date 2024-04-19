import React from 'react'
import notfound from '../../assets/images/error.svg'

export default function Notfound() {

    return (
        <div>

            <div className="container">
                <div className='my-5 text-center'>
                    <img className='w-100 ' src={notfound} alt="" />
                </div>

            </div>
        </div>
    )
}
