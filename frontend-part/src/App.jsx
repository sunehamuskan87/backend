
// import React from 'react'
// import axios from 'axios'
// import { useEffect } from 'react'
// import { useState } from 'react'
// import './App.css'

// const API_URL = 'http://localhost:3000/students'
// const App = () => {
//   const [students, setStudents] = useState([])
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState("");
//   const [formData, setFormData] = useState({
//     name: "",
//     course: "",
//     age: ""
//   })

//   const [existingId, setExistingId] = useState(null);

//   const fetchStudents = async () => {
//     try {
//       setLoading(true);
//       setError("")
//       const response = await axios.get(API_URL);
//       console.log(response.data)
//       // if(!response.ok) {
//       //   throw new Error('Something went wrong!');
//       // }

//       setStudents(response.data.student);
//     }
//     catch (err) {
//       console.log(err)
//       setError(err.message)
//     }
//     finally {
//       setLoading(false)
//     }
//   }
  
//   useEffect(()=>{
//     fetchStudents()
//   },[])

//   function handleChange(e) {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value
//     })
//   }

//   async function handleSubmit(e) {
//     e.preventDefault();
//     if(existingId){
//       try {
//         const response = await axios.put(`${API_URL}/${existingId}`, { name: formData.name, course: formData.course, age: formData.age })
//         console.log(response.data)
//       }
//       catch(err){
//         console.log(err)
//          alert(err.message)
//       }
//       finally {
//         setFormData({
//           name: "",
//           course: "",
//           age: ""
//         })
//         setExistingId(null)
//         await fetchStudents()
//       }
//       return
//     }
     
//     try {
//       const response = await axios.post( API_URL,  { name: formData.name, course: formData.course, age: formData.age })
//       // if(!response.ok) {
//       //   throw new Error('Something went wrong!');
//       // }
//         console.log(response.data)
//         setFormData({name: "", course:"", age:""})
//       await fetchStudents()

//     }
//     catch (err) {
//       console.log(err)
//       alert(err.message)
//     }
//   }

//   const handleEdit = (student) => {
//     setExistingId(student.id);
//     setFormData({
//       name: student.name,
//       course: student.course,
//       age: student.age
//     })

//   }

//   const handleDelete = async (id) => {
//    try {
//       const response = await axios.delete(`${API_URL}/${id}`);
//       console.log(response.data)
//       await fetchStudents()

//     }
//     catch (err) {
//       console.log(err)
//       alert(err.message)
//     }
//   }

//   {loading && <p>Loading…</p>}
//   {error && <p>{error}</p>}
//   return (
//     <div>
//       <h1 className='heading'>Student Management</h1>
//       <div className='container'>
//         <h2>Total Students: {students.length}</h2>
//         <form action="" onSubmit={handleSubmit}>
//           <input type="text" name="name" placeholder='Enter name' value={formData.name} onChange={handleChange} />
//           <input type="text" name="course" placeholder='Enter course' value={formData.course} onChange={handleChange} />
//           <input type="age" name="age" placeholder='Enter age' value={formData.age} onChange={handleChange} />
//           <button id="submit-btn" type="submit">{existingId ? "Edit Student" : "Add Student"}</button>
//         </form>
//       </div>
      
//       <div className='displayStudents'>
//         {students.map((student)=> (
//           <div key={student.id} className='studentsDetails'>
//             <div className='studentDetail'>
//               <p>{student.name}</p>
//               <p>{student.course}</p>
//               <p>{student.age}</p>
//             </div>
//             <div className='btns'>
//               <button id="edit-btn" onClick={() => handleEdit(student)}>Edit</button>
//               <button id="delete-btn" onClick={() => handleDelete(student.id)}>Delete</button>
//             </div>

//           </div>
//         ))}
//       </div>

      
//       {/* when edit button is clicked, calls handleEdit, which takes student as parameter  */}
//     </div>
//   )
// }

// export default App

import React from 'react'
import { Routes } from 'react-router-dom'
import { Route } from 'react-router-dom'
import Register from './pages/Register'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import ProtectedRoute from './components/ProtectedRoute'

const App = () => {
  return (
    <Routes>
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />

      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<Dashboard />} />
      </Route>
    </Routes>
  )
}

export default App