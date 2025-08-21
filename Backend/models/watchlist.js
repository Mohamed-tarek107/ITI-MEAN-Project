import mongoose from 'mongoose';

const watchlistSchema = new mongoose.Schema(
    {
    movieId: { type: String, required: true },
    title: String,
    poster: String,
    rating: Number
});

const watchlist = mongoose.model('watchList', watchlistSchema)
module.export = watchlist;