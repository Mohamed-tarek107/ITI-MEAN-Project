import { Component, OnInit } from '@angular/core';
import { Watchlist } from '../../services/watchlist/watchlist';

@Component({
  selector: 'app-watch',
  imports: [],
  templateUrl: './watch.html',
  styleUrl: './watch.css'
})
export class Watch implements OnInit {
  movies:any[]=[];
  constructor(private allWatchList:Watchlist){}
  ngOnInit(): void {
    this.movies=this.allWatchList.watchlist;
  }
}
