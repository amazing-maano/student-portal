const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const { Classes } = require('../models/Classes').schema;

const StudentSchema = new Schema({

    fname: {
        type: String,
        required: true
    },
    lname: {
        type: String,
        required: true
    },
    semail: {
        type: String,
        required: true,
        unique: true
    },
    sphone: {
        type: Number,
        required: true
    },
    saddress: {
        type: String,
        required: true
    },

    date: {
        type: Date,
        default: Date.now
    }

}, { _id: true });

const StudentModel = mongoose.model('student', StudentSchema);

module.exports = StudentModel;