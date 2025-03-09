import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import loginBg from '../media/login_background.jpg'
import { toast } from 'react-toastify';
import { toastStyle } from '../media/global/toastConfig'

const Login = () => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: ""
  })


  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("https://food-hub-tdcu.onrender.com/api/loginuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      })
    })
    const json = await response.json();

    if (!json.success) {
      toast.error('Invalid Credentials', toastStyle);
    }
    if (json.success) {
      toast.success('Login Successful', toastStyle);
      localStorage.setItem("userEmail", credentials.email);
      localStorage.setItem("authToken", json.authToken);
      navigate("/")
    }
  }

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
  }
  return (
    <div  style={{ backgroundImage: `url(${loginBg})`,height:'100vh', backgroundSize:'cover' }}>
      <div className="container w-25" style={{paddingTop:'150px'}}>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
            <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name='email' value={credentials.email} onChange={onChange} />
            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
          </div>

          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
            <input type="password" className="form-control" id="exampleInputPassword1" name='password' value={credentials.password} onChange={onChange} />
          </div>

          <button type="submit" className="m-3 btn btn-primary">Submit</button>
          <Link to='/createuser' className='m-3 btn btn-danger'>Create Account</Link>
        </form>
      </div>
    </div>
  )
}

export default Login
