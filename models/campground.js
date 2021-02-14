//required dependencies
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Schema of database
const CampgroundSchema = new Schema({
    title: String,
    price: String,
    description: String,
    location: String
})

//export the model
module.exports = mongoose.model('Campground', CampgroundSchema);