import express from 'express';
import cors from 'cors'
import { movieRoutes } from './src/modules/movies/movies.routes.js';
import { watchlistRoutes } from './src/modules/watchList/watchList.routes.js';
import dbconnection from './db/dbconnection.js';
import dotenv from "dotenv";

dotenv.config();

console.log("API_KEY from env:", process.env.API_KEY); 
console.log("MongoPass from env:", process.env.MongoPass); 

dbconnection;
app.use(express.json());
const app = express();
app.use(cors());
app.use(movieRoutes);
app.use(watchlistRoutes);




app.listen(3000, () => {
  console.log('Server is running on port 3000');
});