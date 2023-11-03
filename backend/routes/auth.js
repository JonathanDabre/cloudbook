const express = require('express')
const router = express.Router()
const User = require("../models/User")
const {body, validationResult} = require('express-validator') //to  addd validation to user entries
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const fetchuser = require("../middleware/fetchuser")

const JWT_SECRET = "JonathanIsGood"

//Route1: Create a user  using: POST "/api/auth/createuser". No login required
//body('input field', 'message').anyValidatorFunction()
router.post('https://cloudbook-api.vercel.app/createuser', [
    // Checking for validation
    body('name', "Enter a valid Name").isLength({min: 3}), 
    body('email', "Enter a valid Email").isEmail(),
    body('password', "Password must be atleast 5 characters").isLength({min: 5})
], async (req, res)=>{
    let success = false
    // If there are errors, return Bad request and the errors.
    const errors = validationResult(req) //whatever is the result from checking the validation
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }
    // Check weather the user with this email already exists.
    try {
       
    
        let user = await User.findOne({email: req.body.email})

        if(user){
            return res.status(400).json({error:"User already exist"})
        }
        
        // Code from bcryptJS to add salt and hash the password.
        const salt = await bcrypt.genSalt(10)
        let secretPassword = await bcrypt.hash(req.body.password, salt)

        // Creating a user
        // User.create() is actually when a user is created in database
        user = await User.create({
            name: req.body.name,
            password: secretPassword,
            email: req.body.email
        })
        
        // Creating a token of user.id
        const data = {
            id: user.id
        }
        const authtoken = jwt.sign(data, JWT_SECRET)
        console.log(authtoken)

        //res.json(user) //send response to client.
        success = true
        res.json({success, authtoken})

    } catch (error) {
        console.log(error.message)
        res.status(500).send("Internal Server Error")
    }
})

//Route2: Authenticate a user  using: POST "/api/auth/login". No login required
router.post('https://cloudbook-api.vercel.app/login', [
    body('email', "Enter a valid Email").isEmail(),
    body('password', "Password cannot be blank").exists() 
], async (req, res)=>{

    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }

    const {email, password} = req.body
    let success = false
    try {
        
        let user = await User.findOne({email})
        if(!user){
            return res.status(400).json({error: "Please try to login with correct credentials"})
        }

        const passwordCompare = await bcrypt.compare(password, user.password) // comparing user password in db with password entered
        if(!passwordCompare){
            return res.status(400).json({error: "Please try to login with correct credentials"})   
        }

        const data = {
            id: user.id
        }
        const authtoken = jwt.sign(data, JWT_SECRET)
        success = true
        res.json({success, authtoken})

    } catch (error) {
        console.log(error.message)
        res.status(500).send("Internal Server Error")
    }

})

//Route3: Get loggedin User  details using: POST "/api/auth/getuser". Login required
// fetchuser is middleware function.
router.post('https://cloudbook-api.vercel.app/getuser', fetchuser, async (req, res)=>{
    let success = false
    try {
        
        const userId = req.user.id
        
        const user = await User.findById(userId).select("-password")
        success = true
        res.send(user)
    } catch (error) {
        console.log(success, error.message)
        res.status(500).send("Internal Server Error")
    }
})


module.exports = router