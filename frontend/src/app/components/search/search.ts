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
              isLiked: false
            }));
          },
          err => console.error(err)
        );
      }
    });
  }

  toggleLike(movie: any) {
    movie.isLiked = !movie.isLiked;

    if (movie.isLiked) {
      this.watchlist.addToWatchlist(movie).subscribe();
    } else {
      this.watchlist.removeFromWatchlist(movie.id).subscribe();
    }
  }

  onSearch(event?: Event) {
    if (event) event.preventDefault();
    if (this.search && this.search.trim()) {
      this.router.navigate(['/search'], { queryParams: { query: this.search.trim() } });
    }
  }
}