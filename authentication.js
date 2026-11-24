const express = require('express')
const app = express()
const cors = require('cors')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

app.use(cors({
  origin: 'http://localhost:5173'
}));

app.use(express.json())
let users = []

const JWT_SECRET = 'demo_secret_change_me'

app.post('/register',async (req,res)=> {
    try {
        const {name,email,password} = req.body;
        if(!name || !email || !password) {
            return res.status(400).json({
                message:"All fields are required"
            })
        }
        const existingUser = users.find(user=> user.email === email)
        if(existingUser) {
            //409 -conflict
            return res.status(409).json({
                message:"Email already registered"
            })
        }
        const hashPassword = await bcrypt.hash(password, 10)

        const newUser = {
            id:Date.now(),
            name,
            email,
            password:hashPassword
        }

        users.push(newUser)

        res.status(201).json({
            message:"registration successfull"
        })

    }catch(err) {
        res.status(500).json({
            message:"Server error"
        })
    }
})

//Login route
app.post('/login',async (req,res)=> {
    try{
        const {email,password} = req.body;

        const user = users.find(user => user.email === email)

        if(!user) {
            return res.status(401).json({
                message:"Invalid email or password"
            })
        }

        const isMatch = await bcrypt.compare(password,user.password)
        if(!isMatch) {
            return res.status(401).json({
                message:"Invalid email or password"
            }) 
        }

        //Creating the JWT token using jwt.sign()
        const token = jwt.sign(
            //Create a token containing this user's ID, sign it using my secret key, and make it expire in one hour.
            //it combines userid and jwt-secret to create a token
            {id:user.id},
            //secret key used to sign the token
            JWT_SECRET,
            {expiresIn:"1h"}
        )

        res.json({
            message:"Login succesful",
            //Sending the token to the frontend
            token
        })

    }catch(err) {
         res.status(500).json({
            message:"Server error"
        })
    }
})

//Authentication middleware
const authenicateToken = (req,res,next) => {
    const authHeader = req.headers.authorization;
    console.log(authHeader)
    const token = authHeader && authHeader.split(" ")[1];
    console.log(token)

    if(!token) {
        return res.status(401).json({
            message:"Access denied. Token required"
        })
    }

    jwt.verify(token,JWT_SECRET, (err,decoded)=>{
        if(err) {
            return res.status(403).json({
                message:"Invalid or expired token"
            })
        }

        req.user = decoded
        next()
    })
}

//Protected api
app.get('/profile', authenicateToken, (req,res)=> {
    const user = users.find(user=> user.id === req.user.id)

    if(!user) {
        return res.status(404).json({
            message:"User not found"
        })
    }

    res.json({
        id:user.id,
        name:user.name,
        email:user.email
    })
})

app.listen(3000,()=> {
    console.log('App is listening at 3000')
})
