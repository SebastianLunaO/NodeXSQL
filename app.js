import exp from 'constants'
import express from 'express'
import {getNotes,getNote,createNote} from './database.js'

const app = express()
app.use(express.json())

app.get("/notes", async (req,res)=>{
    const notes = await getNotes();
    res.send(notes);
})

app.get("/notes/:id", async (req,res)=>{
    const id = req.params.id
    const notes = await getNote(id);
    res.send(notes);
})

app.post("/notes", async (req,res)=>{
    const {title,content} = req.body; 
    const notes = await createNote(title,content);
    res.status(201).send(notes);
})


app.use((err,req,res,next)=>{
    console.error(err.stack);
    res.status(500).send('Something want wrong')
})

app.listen(8080,()=>{
    console.log('Server running on 8080')
})