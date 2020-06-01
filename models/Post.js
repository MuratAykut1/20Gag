const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PostSchema = new mongoose.Schema({
    definition : { type : String },
    postImage : { type : String, required : true },
    user : { type: Schema.Types.ObjectId, ref:'User', required: true},
    date : { type : Date, default : Date.now},
    category : { type: Schema.Types.ObjectId, ref:'Category' },
})

module.exports = mongoose.model('Post', PostSchema)