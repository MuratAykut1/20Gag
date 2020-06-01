const mongoose = require('mongoose')
const Schema = mongoose.Schema

const FavsSchema = new mongoose.Schema({
    definition : { type : String },
    postImage : { type : String},
    user : { type: Schema.Types.ObjectId, ref:'Post', required: true},
    date : { type : Date},
    postId : {type: Schema.Types.ObjectId, ref:'Post'},
})

module.exports = mongoose.model('Favs', FavsSchema)