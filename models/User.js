const mongoose = require('mongoose')
const Schema = mongoose.Schema


const UserSchema = new mongoose.Schema({
    userName : { type: String, required: true, unique: true},
    email : { type: String, required: true, unique: true},
    password : { type: String, required: true},
    avatar : { type : String, required: false },
    country : { type: String },
    dogumTarihiYil : { type : Number },
    dogumTarihiAy : { type : Number },
    dogumTarihiGun : { type : Number },
    Hometown : { type : String },
    Favori_Gonderiler : [{ type: Schema.Types.ObjectId, ref:'Post' }]
})

module.exports = mongoose.model('User', UserSchema)