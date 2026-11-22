const express = require('express')
const cors = require('cors')
const app = express()
const PORT = 3000

app.use(express.json())
app.use(cors({
  origin: 'http://localhost:5173'
}));

//1.create an empty array
let students = []

//2. add the student data into the array created
app.post('/students', (req, res) => {
    const newStudent = {
        id: students.length+1,
        name: req.body.name,
        course: req.body.course,
        age: req.body.age 
    }

    students.push(newStudent)

    //update the status
    res.status(201).json({
        message: "Student added successfully",
        student: newStudent
    })
})

//3. to fetch the student data
app.get('/students', (req, res) => {
    res.status(200).json({
        message: "Students fetched successfully",
        student: students
    })
})

//get student by id
app.get('/students/:id', (req, res) => {
    const id = Number(req.params.id)
    const student = students.find(s => s.id === id)

    if(!student) {
        res.status(404).json({
            message: "Student not found"
        })
    }
    res.json(students)
})

//3. To update partially
app.patch('/students/:id', (req, res) => {
    const id = Number(req.params.id)
    const student = students.find(s => s.id === id)

    if(!student) {
        res.status(404).json({
            message: "Student not found"
        })
    }
    //updating in either way using ternary and ?? method
    student.name = req.body.name ? req.body.name : student.name
    student.course = req.body.course ?? student.course
    student.age = req.body.age ?? student.age

    res.json(students)
})
//4. replace the entire student object with the new data
app.put('/students/:id',(req, res) => {
    const id = Number(req.params.id)
    const index = students.findIndex(s => s.id === id)

    if(index === -1) {
        res.status(404).json({
            message: "Student not found"
        })
    }

    students[index] = {
        id: id,
        name: req.body.name,
        course: req.body.course,
        age: req.body.age 
    }

    res.status(200).json({
        message:"Student updated",
        student: students[index]
    })
})

//5. Delete
app.delete('/students/:id', (req, res) => {
    const id = Number(req.params.id)
    const index = students.findIndex(s=> s.id === id)

    if(index === -1){
        res.status(404).json({
            message: "Student not found"
        })
    }

    students.splice(index, 1)

    res.json({
        message: "Student deleted successfully"
    })
})

app.listen(PORT, ()=>{
    console.log(`Server running on the port ${PORT}`)
})