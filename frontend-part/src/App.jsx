// import React from 'react'
// import { useEffect } from 'react';
// import { useState } from 'react'

// const App = () => {
//   const [users, setUsers] = useState([]);

//   useEffect(()=>{
//     async function fetchUsers(){
//       try {
//         const response = await fetch('http://localhost:3000/users');

//         if (!response.ok) {
//           throw new Error('Something went wrong!');
//         }
//         const data = await response.json();
//         setUsers(data);
//       }
//       catch (err) {
//         console.log(err)
//       }
//     }
//     fetchUsers();
//   },[])

//   return (
//     <div>
//       {users.map((user) => (
//         <div key={user.id}>
//           <h2>User Name: {user.name}</h2>
//           <p>User age: {user.age}</p>
//         </div>
//       ))}
//     </div>
//   )
// }

// export default App

import React from 'react'
import axios from 'axios'
import { useEffect } from 'react'
import { useState } from 'react'

const API_URL = 'http://localhost:3000/students'
const App = () => {
  const [students, setStudents] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    course: "",
    age: ""
  })

  const fetchStudents = async () => {
    try {
      setLoading(true);
      setError("")
      const response = await axios.get(API_URL);
      console.log(response)
      console.log(response.data)
      // if(!response.ok) {
      //   throw new Error('Something went wrong!');
      // }

      setStudents(response.student);

    }
    catch (err) {
      console.log(err)
      setError(err.message)
    }
    finally {
      setLoading(false)
    }
  }
  
  useEffect(()=>{
    fetchStudents()
  },[])

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const response = await axios.post( API_URL,  { name: formData.name, course: formData.course, age: formData.age })
      // if(!response.ok) {
      //   throw new Error('Something went wrong!');
      // }
      console.log(response.data)
      setFormData({name: "", course:"", age:""})
      await fetchStudents()
    }
    catch (err) {
      console.log(err)
      alert(err.message)
    }
  }

  return (
    <div>
      <form action="" onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder='Enter name' value={formData.name} onChange={handleChange} />
        <input type="text" name="course" placeholder='Enter course' value={formData.course} onChange={handleChange} />
        <input type="age" name="age" placeholder='Enter age' value={formData.age} onChange={handleChange} />
        <button type="submit">Add Student</button>
      </form>

      {/* display with edit and delete button */}
      {/* when edit button is clicked, calls handleEdit, which takes student as parameter  */}
    </div>
  )
}

export default App
