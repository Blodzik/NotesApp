//require dotenv
require('dotenv').config()

//require express
const express = require('express');

//require all routes
const notesRoutes = require('./routes/notes')

//require mongoose
const mongoose = require('mongoose');

//express app
const app = express();

//middleware
app.use(express.json());

app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
});

//routes
app.use('/api/notes', notesRoutes);

//connect to database
mongoose.connect(process.env.MONGO_URI)
 .then(() => {
    console.log('Connected to database');

    //listen to routes
    app.listen(process.env.PORT, () => {
        console.log('listening on port', process.env.PORT)
    });
 })
 .catch((err) => {
    console.log(err);
 });
