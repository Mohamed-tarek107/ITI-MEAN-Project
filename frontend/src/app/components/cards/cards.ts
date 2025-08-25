import { Component, OnInit } from '@angular/core';
import { TmdbService } from './TmdbService/tmdb-service';
import { Watchlist } from '../../services/watchlist/watchlist';
import { NgClass } from '@angular/common';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cards',
  imports: [NgClass, CommonModule],
  templateUrl: './cards.html',
  styleUrl: './cards.css'
})
export class Cards implements OnInit {

   movies: any[] = [];

  constructor(private tmdb: TmdbService, private watchlist: Watchlist, private router: Router) {}

  goToDetails(movieId: number) { //route to details by clicking on movie image 
    this.router.navigate(['/details'], { queryParams: { id: movieId } });
  }

  ngOnInit(): void { //get all movies using the tmdbService on component initialization 
    this.tmdb.getAllMovies().subscribe({
      next: (data: any) => {
        console.log('API data:', data);
        this.movies = (data?.results ?? []).map((m: any) => ({ ...m, isLiked: false }));
      },
      error: err => console.error('TMDB error', err)
    });
  }

  toggleLike(movie: any) { //Change color of heart, and send to the backend using the watchlist service 
    movie.isLiked = !movie.isLiked;

    if (movie.isLiked) {
      console.log('Adding movie to backend:', movie);
      this.watchlist.addToWatchlist(movie).subscribe({
      next: () => console.log(`${movie.title} added to watchlist`),
      error: err => { console.error('Error adding to watchlist', err); movie.isLiked = false; }
    });

  } else {
    this.watchlist.removeFromWatchlist(movie.id).subscribe({
      next: () => console.log(`${movie.title} removed from watchlist`),
      error: err => {
        console.error('Error removing from watchlist', err);
        movie.isLiked = true; 
      }
    });
  }
  }
}
