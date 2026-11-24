import React from 'react'
import { useState,useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const dashboard = () => {
    const [user,setUser] = useState(null)
    const navigate = useNavigate()
    useEffect(()=>{
        const getProfile = async()=>{
            try {
                const res = await axios.get('http://localhost:3000/profile',{
                    headers:{
                        Authorization:`Bearer ${localStorage.getItem("token")}`
                    }
                })
                setUser(res.data)
                console.log(res.data)
            } catch (error) {
                console.error("Error fetching profile:", error)
            }  
        }
        getProfile() 
    },[navigate])

    const handleLogOut = () => {
        localStorage.removeItem("token")
        navigate('/login', {replace:true})
    }

    if(!user) {
        return <div>Loading...</div>
    }
  return (
    <div>
      <h1> Welcome {user.name}!</h1>
      <h3> Your Profile</h3>

      <p>Name: {user.name}</p>
      <p>Email:{user.email}</p>

      <button onClick={handleLogOut}>LogOut</button>
    </div>
  )
}

export default dashboard