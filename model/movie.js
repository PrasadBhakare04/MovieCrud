const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
    name : String,
    director :String,
    cast : String,
    image : String,
    region : String
})

movieSchema.pre('save', function (next) {
    if (this.region) {
      this.region = this.region.toLowerCase();
    }
    next();
});

const Movie = new mongoose.model("Movie", movieSchema);
module.exports = Movie;