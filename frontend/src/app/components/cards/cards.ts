import { Component, OnInit } from '@angular/core';
import { TmdbService } from './TmdbService/tmdb-service';
import { Watchlist } from '../../services/watchlist/watchlist';
import { NgClass } from '@angular/common';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';
import { Movie } from '../../services/movielist/movie';

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

  constructor(private tmdb: TmdbService, private watchlist: Watchlist, private router: Router, private movieService: Movie) {}

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
  // this.tmdb.getAllMovies().subscribe({
  //   next: (data: any) => {
  //     console.log('API data:', data);
  //     const movies = data?.results ?? [];
  //     // Fetch the watchlist after getting movies
  //     this.watchlist.getWatchlist().subscribe({
  //       next: (watchlist: any[]) => {
  //         // Mark movies as liked if they exist in the watchlist
  //         this.movies = movies.map((m: any) => ({
  //           ...m,
  //           isLiked: watchlist.some(w => w.id === m.id)
  //         }));
  //       },
  //       error: (err) => {
  //         console.error('Watchlist error', err);
  //         // Fallback: just show movies with isLiked: false
  //         this.movies = movies.map((m: any) => ({ ...m, isLiked: false }));
  //       }
  //     });
  //   },
  //   error: (err) => console.error('TMDB error', err),
  // });
  this.loadmovies(1);
}


  toggleLike(movie: any) {
  movie.isLiked = !movie.isLiked;

  if (movie.isLiked) {
    // Make sure we have poster data before sending to watchlist
    const movieToAdd = {
      id: movie.id,
      title: movie.title,
      poster: movie.poster || `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
      poster_path: movie.poster_path,
      vote_average: movie.vote_average,
      overview: movie.overview,
      release_date: movie.release_date,
      genre_ids: movie.genre_ids || []
    };
    
    console.log('Movie object being sent to watchlist:', movieToAdd);
    this.watchlist.addToWatchlist(movieToAdd).subscribe({
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

  loadmovies(page: number): void {
   this.movieService.getAllMovies(page).subscribe({
    next: (data: any) => {
      console.log('data is', data)

      // el pagination info dy
      this.currentpage = data.page;
      this.totalpages = data.total_pages;

      const movies = data?.results ?? [];

      //goz2 el watchlist lw msh ad keda commento
      this.watchlist.getWatchlist().subscribe({
        next: (watchlist: any[]) => {

          //map 3l movies 3shan nakaren ids
          this.movies = movies.map((movie: any) => ({
            ...movie,
            //check lw ma3mol
            isLiked: watchlist.some(watch => movie.id == watch.id)
          }))
        },
        error: (err) => console.log('error howa', err)
      });
    }
  })
  }



  // el methods ely hakhly el pagination yst5dmha

  gotopage(page: number): void {
    if(page >= 1 && page <= this.totalpages){
      this.loadmovies(page)
    }
  }

  previousPage(): void {
    if (this.currentpage > 1) {
      this.loadmovies(this.currentpage - 1);
    }
  }

  nextPage(): void {
    if (this.currentpage < this.totalpages) {
      this.loadmovies(this.currentpage + 1);
    }
  }

  getpageNumber(): number[] {
    const pages: number[] = [];
    const start = Math.max(1, this.currentpage - 2)
    const end = Math.min(this.totalpages, this.currentpage + 2)


    for(let i = start; i <= end; i++){
      pages.push(i);
    }
    return pages;
  }
}
