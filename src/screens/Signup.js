import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import signupBg from '../media/sign_in_background.jpg'
import { toast } from 'react-toastify';
import { toastStyle } from '../media/global/toastConfig'

const Signup = () => {
    const [credentials, setCredentials] = useState({
        name: "",
        email: "",
        password: "",
        location: ""
    })
    const navigate = useNavigate()

  
    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("https://food-hub-tdcu.onrender.com/api/createuser", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: credentials.name,
                email: credentials.email,
                password: credentials.password,
                location: credentials.location
            })
        })
        const json = await response.json();
        toast.success('User Added Successfully Please Login with ur credentials',toastStyle);
        navigate('/login')

        if (!json.success) {
            toast.error('Invalid Credentials', toastStyle);
        }
    }

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }
    return (
        <div >
            <div style={{ backgroundImage: `url(${signupBg})`,height:'100vh', backgroundSize:'cover' }}>
                <div className="container w-25" style={{paddingTop:'100px'}}>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">Name</label>
                            <input type="text" className="form-control" name='name' value={credentials.name} onChange={onChange} />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                            <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name='email' value={credentials.email} onChange={onChange} />
                            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                            <input type="password" className="form-control" id="exampleInputPassword1" name='password' value={credentials.password} onChange={onChange} />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="address" className="form-label">Address</label>
                            <input type="text" className="form-control" name='location' value={credentials.location} onChange={onChange} />
                        </div>

                        <button type="submit" className="m-3 btn btn-primary">Submit</button>
                        <Link to='/login' className='m-3 btn btn-danger'>Already a user</Link>
                    </form>
                </div >
            </div>

        </div>

    )
}

export default Signup