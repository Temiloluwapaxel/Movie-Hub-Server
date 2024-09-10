const Movie = require("../models/movies");

// ===============================CONTROLLER TO FIND ALL SHOWS=====================

const allShows = async (req, res) => {
  const shows = await Movies.find({});
  res.status(200).json({ shows: shows });
};

// ========Controller to find only all the series ======
const allSeries = async (req, res) => {
  const series = await Movie.find({ type: "series" });
  res.status(200).json({ shows: series });
};

// ===================Controller to find only all the movies ==============
const allMovies = async (req, res) => {
  const movies = await Movie.find({ type: "movie" });
  res.status(200).json({ shows: movies });
};

module.exports = { allShows, allSeries, allMovies };
