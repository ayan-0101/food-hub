import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Badge from 'react-bootstrap/Badge'
import Modal from '../Modal'
import Cart from '../screens/Cart'
import { useCart } from '../components/ContextReducer';
import { toast } from 'react-toastify'
import {toastStyle} from '../media/global/toastConfig'

const Navbar = () => {
    const [cartView, setCartView] = useState(false)
    const navigate = useNavigate();

    const handleLogout = () => {
        toast.success('Logout Successful', toastStyle)
        localStorage.removeItem('authToken');
        navigate('/login')
    }
    let data = useCart()
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-success">
                <div className="container-fluid">
                    <Link className="navbar-brand fs-1 fst- italic" to="/">Food-Hub</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav me-auto mb-2 -2">
                            <li className="nav-item">
                                <Link className="nav-link active fs-5" aria-current="page" to="/">Home</Link>
                            </li>
                            {(localStorage.getItem('authToken'))
                                ? <li className="nav-item">
                                    <Link className="nav-link active fs-5" aria-current="page" to="/myOrder">My Orders</Link>
                                </li>
                                : ""

                            }
                        </ul>
                        {(!localStorage.getItem('authToken'))
                            ? <div className='d-flex'>
                                <Link className="btn bg-white text-success mx-1" to="/login">Login</Link>
                                <Link className="btn bg-white text-success mx-1" to="/createuser">Sign Up</Link>
                            </div>
                            :
                            <div>
                                <div className='btn bg-white text-success mx-1' onClick={() => { setCartView(true) }}>
                                    My Cart{' '}
                                    <Badge fill bg='danger'>{data.length ? data.length : ''}</Badge>

                                </div>
                                {
                                    cartView ? <Modal onClose={() => { setCartView(false) }}><Cart /></Modal> : null

                                }
                                <div className='btn bg-white text-danger mx-1' onClick={handleLogout}>
                                    Logout
                                </div>
                            </div>

                        }



                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Navbar
