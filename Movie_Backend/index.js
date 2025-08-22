import express from 'express';
import cors from 'cors'
import { movieRoutes } from './src/modules/movies/movies.routes.js';
import { watchlistRoutes } from './src/modules/watchList/watchList.routes.js';
import dbconnection from './db/dbconnection.js';

dbconnection;

const app = express();
app.use(cors());
app.use(movieRoutes);
app.use(watchlistRoutes);


app.listen(3000, () => {
  console.log('Server is running on port 3000');
});