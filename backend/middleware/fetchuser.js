const jwt = require("jsonwebtoken")

const JWT_SECRET = "JonathanIsGood"

//middleware is function, it takes 3 argument req, res, next. After the middleware next function is run.
const fetchuser = (req, res, next)=>{
    
    // Get the user from JWT token and add id to req object

    const token = req.header('auth-token')
    if(!token){
        res.sendStatus(401).send({error: "Please authenticate using a valid token"})
    }
    try {
        const data = jwt.verify(token, JWT_SECRET)
        req.user = data
        next()
    } catch (error) {
        return res.status(401).send({ error: "Invalid token" });        
    }
    
}


module.exports = fetchuser