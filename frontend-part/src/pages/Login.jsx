import React from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

const Login = () => {
    const [form,setForm] = useState({
            email:"",
            password:""
        })

    const navigate = useNavigate()
    const [message,setMessage] = useState("")

    const handleSubmit = async (e)=> {
        e.preventDefault()  
        try {
            const res = await axios.post('http://localhost:3000/login',form, {
                withCredentials:true
            })
            // localStorage.setItem("token",res.data.token)
            setMessage(res.data.message)
            navigate('/dashboard')
        } catch (error) {
            console.log(error)
            setMessage("Invalid email or password")
        }
    }
  return (
    <div>
        <h2>Login</h2>

         <form action=""  onSubmit={handleSubmit}>
            <input type="email" placeholder='Email' value={form.email} onChange={(e)=>setForm({...form,email:e.target.value})} />
            <br /> <br />
            <input type="password" placeholder='Password' value={form.password} onChange={(e)=>setForm({...form,password:e.target.value})} />
            <br /> <br />
            <button type='submit'>Login</button>
        </form>

        <p>{message}</p>

        <p>Not registered yet? <Link to="/register">Register here</Link></p>
    </div>
  )
}

export default Login