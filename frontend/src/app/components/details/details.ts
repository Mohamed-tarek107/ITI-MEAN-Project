import { Component, Input, OnInit } from '@angular/core';
import { Movies } from '../movies/movies';
import { Movie } from '../../services/movielist/movie';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-details',
  imports: [],
  templateUrl: './details.html',
  styleUrl: './details.css'
})
export class Details implements OnInit {
  @Input() id!: string;
  movieDetails:any={};
  constructor(private movies:Movie,private route: ActivatedRoute){}
  ngOnInit(): void {
    this.movies.getdetails(this.id).subscribe({
      next:(data)=>{
        this.movieDetails=data;
        console.log(data);
      }
    })
    
  }

}
