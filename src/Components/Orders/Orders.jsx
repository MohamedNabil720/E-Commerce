import React, { useContext, useEffect, useState } from 'react'
import { cartContext } from '../../Context/cartContext';
export default function Orders() {


    let { getAllOrders } = useContext(cartContext)
    let [items, setItems] = useState([])


    function formatDate(dateString) {
        const date = new Date(dateString);
        const month = date.getMonth() + 1;
        const day = date.getDate();
        const year = date.getFullYear();
        const formattedMonth = month < 10 ? '0' + month : month;
        const formattedDay = day < 10 ? '0' + day : day;
        return formattedMonth + '/' + formattedDay + '/' + year;
    }



    useEffect(() => {
        (async () => {
            let data = await getAllOrders()

            setItems(data?.data?.data)

        })()
    }, [])

    console.log(items);


    return (

        <div>
            <div className="container my-5">
                <table className='table  table-bordered'>
                    <thead className='text-center fs-4'>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Total Order Price</th>
                            <th scope="col">Email</th>
                            <th scope="col">Date</th>
                        </tr>
                    </thead>
                    <tbody className='text-center'>
                        {items?.map((element, index) => (
                            <tr key={index}>
                                <th scope="row">{index}</th>
                                <td>{element.totalOrderPrice}</td>
                                <td>{element.user.email}</td>
                                <td>{formatDate(element.updatedAt)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
