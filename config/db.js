const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://krina2883:krina2612@cluster0.qheut.mongodb.net/blogpassport');

const database = mongoose.connection;

database.on('connected', (err) => {
    if (err) {
        console.log(err);
        return false;
    }
    console.log("DB is succesfully connected");
})