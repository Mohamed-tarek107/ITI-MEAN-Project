import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from './components/navbar/navbar';
import { Moviehome } from './components/moviehome/moviehome';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar,Moviehome],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('frontend');
}
