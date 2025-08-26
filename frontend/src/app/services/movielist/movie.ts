import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { identifierName } from '@angular/compiler';
@Injectable({
  providedIn: 'root'
})
export class Movie {


  private apihome = 'http://localhost:3000/home';

constructor(private http: HttpClient){}

  getAllMovies(): Observable<any> {
    return this.http.get(this.apihome);
  }

  getSearch(query: string): Observable<any> {
  return this.http.get(`${this.apihome}/search`, { params: { query } });
}

  getdetails(id: string): Observable<any> {
    return this.http.get(`http://localhost:3000/details/${id}`)
  }


}
