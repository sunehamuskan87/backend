const express = require('express')
const cors = require('cors');
const app = express()
const port = 3000

app.use(cors({
  origin: 'http://localhost:5173'
}));
app.use(express.json())

const users = [
  { id: 1, name: "Sania", age: 29 },
  { id: 2, name: "Aisha", age: 25 },
  { id: 3, name: "Sara", age: 27 }
];

app.get('/users', (req,res) => {
    res.json(users);
})




app.listen(port, () =>{
    console.log(`Server running on port ${port}`);
})