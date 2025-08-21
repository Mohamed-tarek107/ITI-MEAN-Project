import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class Watchlist {
  private apiwatchlist = 'http://localhost:5000/api/watchlist' //url el watchlist
  
  constructor(private http: HttpClient){}

  getWatchList(): Observable<any> { // show all
    return this.http.get<any>(this.apiwatchlist);
  }

  //add one
  addtowatchlist(movieId:number): Observable<any> {
    return this.http.post(`${this.apiwatchlist}/add`, {movieId})
  }

  //remove
  RemoveFromWatchList(movieId:number):Observable<any>{
    return this.http.delete(`${this.apiwatchlist}/remove/${movieId}`)
  }
}
