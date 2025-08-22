import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Watchlist } from '../../services/watchlist/watchlist';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.css']
})
export class Navbar {
  
}
