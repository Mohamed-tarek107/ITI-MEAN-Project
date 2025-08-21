import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class Watchlist {
  //dummy
  watchlist:any[]=[
  {
    "movieId": "tt0111161",
    "title": "The Shawshank Redemption",
    "poster": "https://image.tmdb.org/t/p/w500/q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg",
    "rating": 9.3,
    "description": "Two imprisoned men form a deep friendship over the years, finding solace and redemption through acts of common decency."
  },
  {
    "movieId": "tt0068646",
    "title": "The Godfather",
    "poster": "https://image.tmdb.org/t/p/w500/3bhkrj58Vtu7enYsRolD1fZdja1.jpg",
    "rating": 9.2,
    "description": "The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son."
  },
  {
    "movieId": "tt0468569",
    "title": "The Dark Knight",
    "poster": "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
    "rating": 9.0,
    "description": "Batman sets out to dismantle organized crime in Gotham, but finds himself facing the anarchic mastermind known as the Joker."
  },
  {
    "movieId": "tt0109830",
    "title": "Forrest Gump",
    "poster": "https://image.tmdb.org/t/p/w500/saHP97rTPS5eLmrLQEcANmKrsFl.jpg",
    "rating": 8.8,
    "description": "The story of a kind-hearted man with a low IQ who unintentionally influences several defining events in American history."
  },
  {
    "movieId": "tt0133093",
    "title": "The Matrix",
    "poster": "https://image.tmdb.org/t/p/w500/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg",
    "rating": 8.7,
    "description": "A computer hacker discovers that his world is a simulated reality and joins a rebellion against its controllers."
  }
]

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
