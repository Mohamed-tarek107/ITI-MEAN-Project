import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class Watchlist {

private apiwatchlist = 'http://localhost:3000/watchlist';
  //url el watchlist
  constructor(private http: HttpClient){}

  getWatchlist(): Observable<any> { // show all
    return this.http.get<any>(this.apiwatchlist);

  }

  //add one
  addToWatchlist(movieId:number): Observable<any> {
    return this.http.post(`${this.apiwatchlist}`, {movieId})

  }

  //remove
  removeFromWatchlist(movieId:string):Observable<any>{
    return this.http.delete(`${this.apiwatchlist}/${movieId}`)
  }
}
