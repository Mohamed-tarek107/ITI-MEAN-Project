import mongoose from "mongoose";


const watchListSchema = new mongoose.Schema({
  title: { type: String, required: true },
  poster: { type: String },
  addedAt: { type: Date, default: Date.now }
},{versionKey: false});


export const Watch = mongoose.model('WatchList', watchListSchema);