import mongoose from "mongoose";


const watchListSchema = new mongoose.Schema({
  title: { type: String, required: true },
  poster: { type: String, required: true},
  addedAt: { type: Date, default: Date.now },
  desciption: { type: String, required: true},
  rating: { type: String, required: true}
},{versionKey: false});


export const Watch = mongoose.model('WatchList', watchListSchema);