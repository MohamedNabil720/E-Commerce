import React, { useContext, useEffect } from 'react'
import logo from '../../assets/images/freshcart-logo.svg'
import { NavLink } from 'react-router-dom'
import { cartContext } from '../../Context/cartContext';

export default function Navbar() {

    let { counter, getUserCart, setCounter } = useContext(cartContext)



    useEffect(() => {
        (async () => {
            let { data } = await getUserCart()
            setCounter(data?.numOfCartItems)
        })()
    }, [])

    return (


        <>

            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container">
                    <NavLink className="navbar-brand" to="home">
                        <img src={logo} alt="" />
                    </NavLink>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">

                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <NavLink className="nav-link" aria-current="page" to="home">Home</NavLink>
                            </li>

                            <li className="nav-item">
                                <NavLink className="nav-link" to="cart">Cart</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="products">Products</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="categories">Categories</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="brands">Brands</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="whishlist">Wishlist</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="allorders">All Orders</NavLink>
                            </li>
                        </ul>

                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <NavLink to="cart" className="btn py-2 position-relative mx-2">
                                    <i className="fa-solid fa-cart-shopping"></i>

                                    {counter ? <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                        {counter}
                                        <span className="visually-hidden">unread messages</span>
                                    </span> : ''}

                                </NavLink>
                            </li>


                            <li className="nav-item">
                                <NavLink className="nav-link" to="/signin">Logout</NavLink>
                            </li>

                        </ul>

                    </div>
                </div>
            </nav>
        </>
    )
}
