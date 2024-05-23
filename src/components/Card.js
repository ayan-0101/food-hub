import React, { useEffect, useRef, useState } from 'react'
import { useCart, useDispatchCart } from './ContextReducer';
import { toast } from 'react-toastify';
import { toastStyle } from '../media/global/toastConfig'

const Card = (props) => {

    let dispatch = useDispatchCart();
    let options = props.options;
    let data = useCart();
    const priceRef = useRef();
    let priceOptions = Object.keys(options);
    const [quantity, setQuantity] = useState(1)
    const [size, setSize] = useState("")

    const handleAddToCart = async () => {
        const authToken = localStorage.getItem('authToken');

        if (!authToken) {
            toast.error('Please log in or sign up to add items to your cart.', toastStyle);
            return;
        }
        const food = data.find(item => item.id === props.foodItem._id && item.size === size);

        if (food) {
            await dispatch({ type: 'UPDATE', id: props.foodItem._id, price: finalPrice, quantity: quantity });
            toast.info('Quantity Upadated', toastStyle);
        } else {
            await dispatch({ type: 'ADD_TO_CART', id: props.foodItem._id, name: props.foodItem.name, price: finalPrice, quantity: quantity, size: size, img: props.foodItem.img });
            toast.success('Item added to cart', toastStyle);
        }
    }

    let finalPrice = quantity * parseInt(options[size])
    useEffect(() => {
        setSize(priceRef.current.value)
    }, [])

    return (
        <div>
            <div className="card mt-3" style={{ "width": "19rem", "maxHeight": "400px" }}>
                <img src={props.foodItem.img} className='card-img-top' alt="Loading image" style={{ "width": "19rem", "height": "200px", "objectFit": "fill" }} />
                <div className="card-body">
                    <h5 className="card-title">{props.foodItem.name}</h5>
                    <div className="container w-110">
                        <select className='m-2 h-100 bg-success rounded' onChange={(e) => setQuantity(e.target.value)}>

                            {Array.from(Array(6), (e, i) => {
                                return (
                                    <option key={i + 1} value={i + 1}>{i + 1}</option>
                                )
                            })}
                        </select>

                        <select className='m-2 h-100 bg-success rounded' ref={priceRef} onChange={(e) => setSize(e.target.value)}>
                            {
                                priceOptions.map((price) => {
                                    return (
                                        <option key={price} value={price}>{price}</option>
                                    )
                                })
                            }
                        </select>

                        <div className="d-inline h-100 fs-5">  ₹ {finalPrice}/-</div>

                    </div>
                    <hr />
                    <div className='btn bg-success mx-1' onClick={handleAddToCart}>
                        Add To Cart
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Card