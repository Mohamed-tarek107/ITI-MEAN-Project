import { Component, OnInit } from '@angular/core';
import { Watchlist } from '../../services/watchlist/watchlist';

@Component({
  selector: 'app-watch',
  imports: [],
  templateUrl: './watch.html',
  styleUrl: './watch.css',
})
export class Watch implements OnInit {
  movies: any[] = [];
  constructor(private allWatchList: Watchlist) {}
  ngOnInit(): void {
    this.allWatchList.getWatchlist().subscribe({
      next: (data) => {
        this.movies = data;
        console.log(this.movies)
      },
      error: (err) => {
        console.error('Error fetching watchlist:', err);
      },
      complete: () => {
        console.log('Watchlist fetch complete');
      },
    });
  }
  removeMovie(id: number) {
    this.movies = this.movies.filter(movie => movie._id !== id);
  }
}
