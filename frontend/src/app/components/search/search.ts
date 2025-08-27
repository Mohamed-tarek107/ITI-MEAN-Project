import { Component, inject, Input, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink, Router } from '@angular/router';
import { Movie } from '../../services/movielist/movie';
import { Watchlist } from '../../services/watchlist/watchlist';
import { NgClass, CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [NgClass, CommonModule, RouterLink, FormsModule],
  templateUrl: './search.html',
  styleUrls: ['./search.css']
})
export class SearchComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private movieService = inject(Movie);
  private watchlist = inject(Watchlist);
  private router = inject(Router);

  results: any[] = [];
  @Input() search: string = '';

  ngOnInit() {
    this.route.queryParamMap.subscribe(params => {
      const query = params.get('query');
      if (query) {
        this.search = query;
        this.movieService.getSearch(query).subscribe(
          (data: any) => {
            this.results = (data.movies ?? []).map((m: any) => ({
              ...m,
              isLiked: false,
              overview: m.overview,
            }));
          },
          err => console.error(err)
        );
      }
    });
  }

  // toggleLike(movie: any) { //Change color of heart, and send to the backend using the watchlist service
  //   movie.isLiked = !movie.isLiked;

  //   if (movie.isLiked) {
  //     console.log('Adding movie to backend:', movie);
  //     this.watchlist.addToWatchlist(movie).subscribe({
  //     next: () => console.log(`${movie.title} added to watchlist`),
  //     error: err => { console.error('Error adding to watchlist', err); movie.isLiked = false; }
  //   });

  // } else {
  //   this.watchlist.removeFromWatchlist(movie.id).subscribe({
  //     next: () => console.log(`${movie.title} removed from watchlist`),
  //     error: err => {
  //       console.error('Error removing from watchlist', err);
  //       movie.isLiked = true;
  //     }
  //   });
  // }
  // }

  toggleLike(movie: any) {
  movie.isLiked = !movie.isLiked;

  if (movie.isLiked) {
    // Map poster and overview before sending
    const movieToAdd = {
      ...movie,
      poster_path: movie.poster_path || movie.poster,
      overview: movie.overview || "No overview available"
    };
    console.log('Adding movie to backend:', movieToAdd);
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

  onSearch(event?: Event) {
    if (event) event.preventDefault();
    if (this.search && this.search.trim()) {
      this.router.navigate(['/search'], { queryParams: { query: this.search.trim() } });
    }
  }
}