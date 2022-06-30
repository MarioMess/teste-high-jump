import mongoose, { model } from 'mongoose';
const itemSchema = new mongoose.Schema({
    id: {
        type: Number, 
        required: true}, 
    name: {
        type: String, 
        required: true
    }
})

module.exports = model("item", itemSchema);