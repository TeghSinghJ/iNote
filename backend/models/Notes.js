const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const notesSchema = new Schema({
    user  : {
        type : mongoose.Schema.Types.ObjectId,
        rel : 'user'
    },
    title : {
        type : String
    },
    description : {
        type: String
    },
    tag : {
        type: String,
        default : "General"
    },
    date : {
        type : Date,
        default : Date.now
    }
});
module.exports = mongoose.model('notes',notesSchema);