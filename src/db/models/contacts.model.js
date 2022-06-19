const mongoose = require('mongoose');

const contactsSchema = new mongoose.Schema({
    fullName:{
        type:String,
        trim:true,
        required:true
    },
    email:{
        type:String,
        lowercase:true,
        trim:true,
        required:true
    },
    contactNumber:{
        type:String,
        trim:true,
        required:true
    },
    message:{
        type:String,
        trim:true,
        required:true
    }
},{timestamps:true})

module.exports = mongoose.model("Contact",contactsSchema);