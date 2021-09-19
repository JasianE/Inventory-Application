const mongoose = require('mongoose')

const Schema = mongoose.Schema

const itemSchema = new Schema({
    name: {type: String, minlength: 3, maxlength: 100, required: true},
    description: {type: String, minlength: 15, maxlength: 400},
    price: {type: Number, required: true, max: 100000, min: 0},
    stock: {type: Number, required: true, max: 1000000, min: 0},
    category: {type: String, required: true}
})

itemSchema.virtual('url').get(function(){
    return '/item/' + this._id
})

module.exports = mongoose.model('Item', itemSchema)