import axios from "axios";

const BASE_URL = "https://api.themoviedb.org/3";
// const API_KEY = process.env.API_KEY;

const getAllMovies = async (req, res) => {
  try {
    const page = Math.min(parseInt(req.query.page) || 1, 20)
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.API_KEY}&page=${page}`
    );

    
    const movies = response.data.results.map(movie => ({
      id: movie.id,
      title: movie.title,
      poster: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
      poster_path: movie.poster_path,
      vote_average: movie.vote_average,
      release_date: movie.release_date,
      overview: movie.overview
    }));

    res.json({
      results: movies,
      page: response.data.page,
      total_pages: Math.min(response.data.total_pages, 20), //maybe error
      total_results: response.data.total_results
    });
  } catch (error) {
    console.error("TMDB API error:", error.response?.data || error.message);
    res.status(500).json({ message: "Error retrieving movies from TMDB" });
  }
};

const movieDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.API_KEY}`
    );

    const movie = {
      id: response.data.id,
      title: response.data.title,
      poster: response.data.poster_path
        ? `https://image.tmdb.org/t/p/w500${response.data.poster_path}`
        : null,
      overview: response.data.overview,
      vote_count: response.data.vote_count,
      vote_average: response.data.vote_average,
    };

    res.json(movie);
  } catch (error) {
    console.error("TMDB API error:", error.response?.data || error.message);
    res.status(500).json({ message: "Error retrieving movie details from TMDB" });
  }
};

const searchMovie = async (req, res) => {
  try {
    const query = req.query.query;
    if (!query) {
      return res.status(400).json({ message: "Title query is required" });
    }

    console.log("Searching TMDB for:", query);
    console.log("Using API key:", process.env.API_KEY); 

    const response = await axios.get(`${BASE_URL}/search/movie`, {
      params: { 
        api_key: process.env.API_KEY,
        query: query 
      },
    });

    const movies = response.data.results.map(movie => ({
      id: movie.id,
      title: movie.title,
      poster: movie.poster_path
        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
        : null,
      vote_average:movie.vote_average,
      release_date: movie.release_date,
      overview: movie.overview,
    }));

    res.json({ movies });
  } catch (error) {
    console.error("TMDB API error details:", {
      status: error.response?.status,
      data: error.response?.data,
      message: error.message,
    });
    res.status(500).json({ message: "Error searching movies from TMDB" });
  }
};

export { getAllMovies, movieDetails, searchMovie };
