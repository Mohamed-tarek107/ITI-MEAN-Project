import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-hero',
  imports: [FormsModule],
  templateUrl: './hero.html',
  styleUrls: ['./hero.css']
})
export class Hero {
  @Input() search: string = '';

  constructor(private router: Router) {}

  onSearch(event?: Event) {
  if (event) event.preventDefault();
  if (this.search && this.search.trim()) {
    this.router.navigate(['/search'], { queryParams: { query: this.search.trim() } });
  }
}

}
