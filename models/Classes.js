const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const ClassSchema = new Schema({

    cname: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        required: true
    },
    sname: {
        type: [String]
    },
    date: {
        type: Date,
        default: Date.now
    }
});

const ClassModel = mongoose.model('Classes', ClassSchema);

module.exports = ClassModel;