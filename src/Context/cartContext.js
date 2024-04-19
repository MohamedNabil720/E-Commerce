

import axios from 'axios';
import React, { createContext, useState } from 'react'

export let cartContext = createContext(0)

async function addToCart(productId) {
    return axios.post('https://ecommerce.routemisr.com/api/v1/cart', { productId }, {
        headers: {
            token: localStorage.getItem("token")
        }
    }).then(data => {
        return data
    }).catch(error => {
        return error
    })
}

async function addToWishlist(productId) {
    return axios.post('https://ecommerce.routemisr.com/api/v1/wishlist', { productId }, {
        headers: {
            token: localStorage.getItem("token")
        }
    }).then(data => {
        return data
    }).catch(error => {
        return error
    })
}


async function deleteCart(productId) {
    return axios.delete('https://ecommerce.routemisr.com/api/v1/cart/' + productId, {
        headers: {
            token: localStorage.getItem("token")
        }
    }).then(data => {
        return data
    }).catch(error => {
        return error
    })
}

async function deleteWishlist(productId) {
    return axios.delete('https://ecommerce.routemisr.com/api/v1/wishlist/' + productId, {
        headers: {
            token: localStorage.getItem("token")
        }
    }).then(data => {
        return data
    }).catch(error => {
        return error
    })
}

async function updateCart(productId, count) {
    return axios.put('https://ecommerce.routemisr.com/api/v1/cart/' + productId, { count }, {
        headers: {
            token: localStorage.getItem("token")
        }
    }).then(data => {
        return data
    }).catch(error => {
        return error
    })
}

async function getUserCart() {

    return axios.get('https://ecommerce.routemisr.com/api/v1/cart', {
        headers: {
            token: localStorage.getItem("token")
        }
    }).then(data => {
        return data

    }).catch(error => {
        return error
    })
}

async function getWishlist() {

    return axios.get('https://ecommerce.routemisr.com/api/v1/wishlist', {
        headers: {
            token: localStorage.getItem("token")
        }
    }).then(data => {
        return data
    }).catch(error => {
        return error
    })
}


async function createCheckout(cartId, values) {
    return axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:3000`,
        {
            shippingAddress: values
        },
        {
            headers: {
                token: localStorage.getItem("token")
            }
        }).then(data => {
            return data
        }).catch(error => {
            return error
        })
}


async function getAllOrders() {

    return axios.get('https://ecommerce.routemisr.com/api/v1/orders/').then(data => {
        return data
    }).catch(error => {
        return error
    })
}


export default function CartContextProvider({ children }) {

    let [counter, setCounter] = useState(0)

    return <cartContext.Provider value={{ counter, getAllOrders, deleteWishlist, getWishlist, setCounter, addToCart, getUserCart, addToWishlist, deleteCart, updateCart, createCheckout }}>

        {children}

    </cartContext.Provider>
}
