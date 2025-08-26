import { Component, OnInit } from '@angular/core';
import { TmdbService } from './TmdbService/tmdb-service';
import { Watchlist } from '../../services/watchlist/watchlist';
import { NgClass } from '@angular/common';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cards',
  imports: [NgClass, CommonModule, RouterLink],
  templateUrl: './cards.html',
  styleUrl: './cards.css',
})
export class Cards implements OnInit {
  movies: any[] = [];
  currentpage = 1;
  totalpages = 0;

  constructor(private tmdb: TmdbService, private watchlist: Watchlist, private router: Router) {}

  goToDetails(movieId: number) {
    //route to details by clicking on movie image
    // this.router.navigate(['/details'], { queryParams: { id: movieId } });
  }

  // ngOnInit(): void {
  //   //get all movies using the tmdbService on component initialization
  //   this.tmdb.getAllMovies().subscribe({
  //     next: (data: any) => {
  //       console.log('API data:', data);
  //       this.movies = (data?.results ?? []).map((m: any) => ({ ...m, isLiked: false }));
  //     },
  //     error: (err) => console.error('TMDB error', err),
  //   });
  // }
  ngOnInit(): void {
  // Get all movies using the tmdbService on component initialization
  this.tmdb.getAllMovies().subscribe({
    next: (data: any) => {
      console.log('API data:', data);
      const movies = data?.results ?? [];
      // Fetch the watchlist after getting movies
      this.watchlist.getWatchlist().subscribe({
        next: (watchlist: any[]) => {
          // Mark movies as liked if they exist in the watchlist
          this.movies = movies.map((m: any) => ({
            ...m,
            isLiked: watchlist.some(w => w.id === m.id)
          }));
        },
        error: (err) => {
          console.error('Watchlist error', err);
          // Fallback: just show movies with isLiked: false
          this.movies = movies.map((m: any) => ({ ...m, isLiked: false }));
        }
      });
    },
    error: (err) => console.error('TMDB error', err),
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
  // ...existing code...
  // toggleLike(movie: any) {
  //   if (!movie.isLiked) {
  //     movie.isLiked = true;
  //     movie.animateLike = true;
  //     // Map TMDB fields to backend schema
  //     const movieToSend = {
  //       title: movie.title,
  //       poster: 'https://image.tmdb.org/t/p/w500' + movie.poster_path,
  //       description: movie.overview || '',
  //       rating: movie.vote_average?.toString() || '0',
  //       isLiked: true,
  //       _id: movie.id,
  //     };
  //     this.watchlist.addToWatchlist(movieToSend).subscribe({
  //       next: () => {
  //         setTimeout(() => (movie.animateLike = false), 300);
  //       },
  //       error: (err) => {
  //         console.error('Error adding to watchlist', err);
  //         movie.isLiked = false;
  //         movie.animateLike = false;
  //       },
  //     });
  //   } else {
  //     movie.isLiked = false;
  //     movie.animateLike = true;
  //     this.watchlist.removeFromWatchlist(movie.id).subscribe({
  //       next: () => {
  //         setTimeout(() => (movie.animateLike = false), 300);
  //       },
  //       error: (err) => {
  //         console.error('Error removing from watchlist', err);
  //         movie.isLiked = true;
  //         movie.animateLike = false;
  //       },
  //     });
  //   }
  // }
  // ...existing code...
  //pagination;;;;;;;;;;;

  loadmovies(page: number): void {
    this.tmdb.getAllMovies(page).subscribe({
      next: (data: any) => {
        console.log(`page = ${data}`);
        this.movies = data?.results;
      },
    });
  }
}
