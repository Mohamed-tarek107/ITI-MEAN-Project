import { Movie } from "../../../db/models/movie.model.js";


const getAllMovies = async (req, res) => {
  try {
    const movies = await Movie.find().select("title poster"); 
    res.json(movies);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving movies" });
  }
};

const movieDetails = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) {
      return res.status(404).json({ message: 'Movie not found' });
    }
    res.json(movie);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving movie' });
  }
}

const searchMovie = async (req, res) => {
  const { title } = req.query;
  try {
    const movies = await Movie.find({ title: { $regex: title, $options: 'i' } }).select("title poster");
    res.json(movies);
  } catch (error) {
    res.status(500).json({ message: 'Error searching for movies' });
  }
}

export {
  getAllMovies,
  movieDetails,
  searchMovie
}