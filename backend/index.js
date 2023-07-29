const connectToMongo = require('./db') //importing what all is exported db.js file. Here it is function.
const express = require('express')

connectToMongo(); //establishing connection with database
const app = express()
const port = 5000 //We are using 5000 as port 3000 can be used for react-app.

app.use(express.json())

app.get("/about", (req, res)=>{
  res.sendFile(__dirname + "/byby.html")
})


// Available Routes to use.
// app.use("pathWhenToUseAParticularRoute", require("fileWhichIsRequired"))
app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes', require('./routes/notes'))


app.listen(port, () => {
  console.log(`iNotebook listening on port ${port}`)
})

