const express = require('express')
const router = express.Router()
const fetchuser = require("../middleware/fetchuser")
const Note = require("../models/Note")
const {body, validationResult} = require('express-validator') //to  addd validation to user entries




//Route1: Get All the Notes using: Get "/api/auth/getuser". Login required
router.get('/fetchallnotes', fetchuser,async (req, res)=>{
    try {
        const notes = await Note.find({user: req.user.id})
        res.send(notes)

    } catch (error) {
        console.log(error.message)
        res.status(500).send("Internal Server Error")
    }

    

})

//Route2: Add a new Note using: POST "/api/auth/addnote". Login required
router.post('/addnote', fetchuser,[
    body('title', "Enter a Title").isLength({min:1}),
    body('description', "Enter a Description").isLength({min:1})

],async (req, res)=>{
    try {
        const {title, description, tag} = req.body
        const errors = validationResult(req)

        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array()})
        }
        
        const note = new Note({
            title, description, tag, user: req.user.id
        })

        const savedNote = await note.save()
        res.send(savedNote) //Sending 

    } catch (error) {
        console.log(error.message)
        res.status(500).send("Internal Server Error")
    } 

})


//Route3: Update a existing Note using: PUT "/api/auth/addnote". Login required

router.put("/updatenote/:id", fetchuser, async(req, res)=>{
    try {
        const {title, description, tag} = req.body;
        //Create a newNote object
        //we will access the note to be updated from here.
        let newNote = {}
        //change entries in DB if any change is done by client.
        if(title){newNote.title = title};
        if(description){newNote.description = description};
        if(tag){newNote.tag = tag}

        // Find the note to be updates and update it.
        
        const note_id = req.params.id
        let note = await Note.findById(note_id)

        if(!note){
        return res.status(404).send("Not Found")
        }
        if(note.user.toString() !== req.user.id){
            return res.status(401).send("Not Allowed")
        }

        note = await Note.findByIdAndUpdate(note_id, {$set: newNote}, {new:true})
        res.json({note})
        
    } catch (error) {
        console.log(error.message)
        res.status(500).send("Internal Server Error")
    }   

})

//Route4: Deleting a existing Note using: DELETE "/api/auth/deletenote". Login required

router.delete("/deletenote/:id", fetchuser, async(req, res)=>{
    try {
    
        // Find the note to be delete and delete it.
        
        const note_id = req.params.id
        let note = await Note.findById(note_id)

        if(!note){
        return res.status(404).send("Not Found")
        }
        //Only delete the note if that note belongs to user requesting to delete.
        if(note.user.toString() !== req.user.id){
            return res.status(401).send("Not Allowed")
        }

        note = await Note.findByIdAndDelete(note_id)
        res.json({"Success": "Successfully deleted the note.", note: note})
        
    } catch (error) {
        console.log(error.message)
        res.status(500).send("Internal Server Error")
    }   

})




module.exports = router