const Note = require('../models/noteModel');
const mongoose = require('mongoose');

//Get all notes
const getAllNotes = async (req, res) => {
   const notes = await Note.find({}).sort({createdAt: -1});

   res.status(200).json(notes);
}

//Get a single note
const getNote = async (req, res) => {
    const { id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ err: 'No such note' });
    }

    const note = await Note.findById(id);

    if(!note) {
        return res.status(404).json({ err: 'No such note' });
    }

    res.status(200).json(note);
}
//Create a new note
const createNote = async(req, res) => {
    const{ title, text } = req.body;

    //Add to database
    try {
        const note = await Note.create({ title, text });
        res.status(200).json(note);
    }
    catch (err) {
        res.status(400).json({ err: err.message })
    }
}

//Delete a note
const deleteNote = async(req, res) => {
    const { id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ err: 'No such note' });
    }

    const note = await Note.findOneAndDelete({ _id: id });

    if(!note) {
        return res.status(404).json({ err: 'No such note' });
    }

    return res.status(200).json(note);
}

//Update note
const updateNote = async(req, res) => {
    const { id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ err: 'No such note' });
    }

    const note = await Note.findOneAndUpdate({ _id: id }, {
        ...req.body
    }, { new: true });

    if(!note) {
        return res.status(404).json({ err: 'No such note' });
    }

    return res.status(200).json(note);
}

module.exports = {
    getAllNotes,
    getNote,
    createNote,
    deleteNote,
    updateNote
}