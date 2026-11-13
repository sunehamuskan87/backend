const express = require('express')
const app = express()
const port = 3000

app.use(express.json())

// app.get (path, callback)
app.get('/', (req, res) => {
    res.send('This is the response')
})

app.get('/home', (req, res) => {
    res.send('This is the Home page')
})

app.get('/username/:id', (req, res) => {
    console.log(req.params)
    const userId = req.params.id;
    // res.send(`Id is: ${userId}`)
    
    res.json({
        name:"Suneha",
        city:"Mangalore"
    })
})

app.get('/search', (req, res) => {
    console.log(req.query)
    const data = req.query.country
    res.send(`search data: ${data}`)
})

app.post('/student', (req,res)=> {
    const student = req.body;
    console.log(student)
    res.json({
        message:"Student registered",
        data:student
    })
})

app.listen(port, () => {
    console.log(`Example app listening on the port ${port}`)
})