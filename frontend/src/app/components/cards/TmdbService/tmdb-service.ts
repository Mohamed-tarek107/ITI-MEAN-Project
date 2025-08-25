import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class TmdbService {
  private apiKey = 'd0a0ee4b224ac2dcb52650d292348a81'; 
  private baseUrl = 'https://api.themoviedb.org/3';


  constructor(private http: HttpClient) { }


  // This function could help with pagination 
  getAllMovies(page: number = 1): Observable<any> {
    return this.http.get(`${this.baseUrl}/discover/movie?api_key=${this.apiKey}&language=en-US&page=${page}`);
  }

  
}
