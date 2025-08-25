import { Component } from '@angular/core';
import { Cards } from '../cards/cards';
import { CommonModule } from '@angular/common';
import { Hero } from '../hero/hero';

@Component({
  selector: 'app-movies',
  imports: [CommonModule, Cards, Hero],
  templateUrl: './movies.html',
  styleUrl: './movies.css'
})
export class Movies {
  
}
