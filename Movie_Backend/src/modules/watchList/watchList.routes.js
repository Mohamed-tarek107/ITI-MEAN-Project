import { addToWatchlist, getWatchlist, removeFromWatchlist } from "./watchList.controller.js";
import express  from "express";

export const watchlistRoutes = express.Router();


watchlistRoutes.get('/watchlist',getWatchlist );

watchlistRoutes.post('/watchlist',addToWatchlist );


watchlistRoutes.delete('/watchlist/:id',removeFromWatchlist);