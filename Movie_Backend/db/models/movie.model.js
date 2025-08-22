import mongoose from "mongoose";


const movieSchema = new mongoose.Schema({
  title: { type: String, required: true },
  poster: { type: String }, 
  overview: { type: String },
  genres: [String],
});

export const Movie = mongoose.model('Movies', movieSchema);