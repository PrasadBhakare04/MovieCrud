const express = require('express');
const router = express.Router();
const Movie = require('./model/movie')


router.get('/bollywood', async (req, res) => {
    const movies = await Movie.find({region : "bollywood"});
    res.render('bollywoodpage', {movies});
});

router.get('/hollywood', async(req, res) => {
    const movies = await Movie.find({region : "hollywood"});
    res.render('hollywoodpage', {movies});
});

router.get('/bollywood/:id', async(req, res) => {
    const movie = await Movie.findById(req.params.id);
    res.render('details', {movie})
})

router.get('/hollywood/:id', async(req, res) => {
    const movie = await Movie.findById(req.params.id);
    res.render('details', {movie})
})

router.get('/bollywood/:id/delete', async (req, res) => {
    await Movie.findByIdAndDelete(req.params.id);
    res.redirect('/bollywood')
})

router.get('/hollywood/:id/delete', async (req, res) => {
    await Movie.findByIdAndDelete(req.params.id);
    res.redirect('/hollywood')
})

router.get('/newMovie', (req, res) => {
    res.render('newmovie')
})

router.post('/', async (req, res) => {
    const newMovie = new Movie(req.body.movie); // access nested 'movie'
    await newMovie.save();
    console.log("Saved movie:", newMovie);
    res.redirect(`/${newMovie.region}/${newMovie._id}`);
});

router.get('/:id/edit', async (req, res) => {
    const id = req.params.id;
    const movie = await Movie.findById(id);
    res.render("editmovie", {movie})
})

router.put('/:id', async(req, res) => {
    const movie = await Movie.findByIdAndUpdate(req.params.id, { ...req.body.movie });
    movie.save();
    res.redirect(`/${movie.region}/${movie._id}`)    
})

module.exports = router;