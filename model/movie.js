const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
    name : String,
    director :String,
    cast : String,
    image : String,
    region : String
})

const Movie = new mongoose.model("Movie", movieSchema);
module.exports = Movie;