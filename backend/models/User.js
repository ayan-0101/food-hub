const mongoose = require('mongoose')
const { Schema } = mongoose;

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        require: true
    },
    email: {
        type: String,
        // unique: true,
        require: true,
    },
    password: {
        type: String,
        require: true,
    },
    date: {
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoose.model('user', userSchema)