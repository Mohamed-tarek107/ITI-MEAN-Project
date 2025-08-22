import { Component } from '@angular/core';

@Component({
  selector: 'app-moviehome',
  imports: [],
  templateUrl: './moviehome.html',
  styleUrl: './moviehome.css'
})
export class Moviehome {
  pages = [1,2,3,4,5];
  currentpage:number = 0;

  setactivepage(index:number){
    this.currentpage = index;
  }

  prevPage() {
    if (this.currentpage > 0) this.setactivepage(this.currentpage - 1);
  }

  nextPage() {
    if (this.currentpage < this.pages.length - 1) this.setactivepage(this.currentpage + 1);
  }
}
