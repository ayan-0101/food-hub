import React from 'react'
import { useCart, useDispatchCart } from '../components/ContextReducer'
import remove from '../media/remove.svg';
import { toast } from 'react-toastify';
import {toastStyle} from '../media/global/toastConfig'

const Cart = () => {

    let data = useCart();
    let dispatch = useDispatchCart();
    if (data.length === 0) {
        return <div className='m-5 w-100 text-center fs-3'>Cart is empty</div>
    }
    let totalPrice = data.reduce((total, food) => total + food.price, 0)

    const handleCheckout = async () => {
        let userEmail = localStorage.getItem('userEmail');

        let response = await fetch('http://localhost:5000/api/orderData', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                order_data: data,
                email: userEmail,
                order_date: new Date().toDateString()
            })
        },
            toast.success("Checkout Success Happy Meal 😍", toastStyle)
        );
        if (response.status === 200) {
            dispatch({ type: 'DROP' })
        }
    }
    const handleRemove = (index) => {
        dispatch({ type: 'REMOVE', index: index });
        toast.error('Item removed from cart', toastStyle)
    }


    return (
        <div>

            <div className='container m-auto table-responseive table-responsive-sm table-responsive-md'>
                <table className='table table-hover'>
                    <thead className='text-success fs-4'>
                        <tr>
                            <th scope='col'>#</th>
                            <th scope='col'>Name</th>
                            <th scope='col'>Quantity</th>
                            <th scope='col'>Option</th>
                            <th scope='col'>Amount</th>
                            <th scope='col'></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data.map((food, index) => (
                                <tr>
                                    <th scope='row'>{index + 1}</th>
                                    <td>{food.name}</td>
                                    <td>{food.quantity}</td>
                                    <td>{food.size}</td>
                                    <td>{food.price}</td>
                                    <td><button type='button' className='btn p-0' onClick={() => handleRemove(index)}>
                                        <img src={remove} alt="Remove" style={{ width: '20px', height: '20px', color: 'white' }} />
                                    </button></td>
                                </tr>
                            )
                            )}
                    </tbody>
                </table>
                <div>
                    <h1 className="fs-2">Total Price: ₹ {totalPrice}</h1>
                </div>
                <div>
                    <button className='btn bg-success mt-5' onClick={handleCheckout}>Place My Order</button>
                </div>
            </div>
        </div>
    )
}

export default Cart