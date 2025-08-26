import mongoose from "mongoose";

const watchListSchema = new mongoose.Schema({
  adult: Boolean,
  backdrop_path: String,
  genre_ids: [Number],
  id: Number,
  original_language: String,
  original_title: String,
  overview: String,
  popularity: Number,
  poster_path: String,
  release_date: String,
  title: String,
  video: Boolean,
  vote_average: Number,
  vote_count: Number,
  isLiked: { type: Boolean, default: false }
}, { versionKey: false });

export const Watch = mongoose.model('WatchList', watchListSchema);

