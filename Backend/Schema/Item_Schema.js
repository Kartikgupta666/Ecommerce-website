

const { Schema, default: mongoose } = require("mongoose")

const Item_Schema = new Schema({
    title: {
        type: String,
        require: true
    },
    itemDesc: {
        type: String,
        require: true
    },
    price: {
        type: Number,
        require: true
    },
    image: {
        type: String,
        require: true
    },
    searchQuery: [String]
    ,
    category: {
        type: String,
        require: true
    }
})

module.exports = mongoose.model("Item_Schema", Item_Schema)