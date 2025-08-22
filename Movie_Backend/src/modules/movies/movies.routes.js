import { getAllMovies, movieDetails, searchMovie } from "./movies.controller.js";
import express from "express";

export const movieRoutes = express.Router();

movieRoutes.use(express.json());

movieRoutes.get('/home', getAllMovies);

movieRoutes.get('/details/:id', movieDetails);

movieRoutes.get('/home/search', searchMovie);
