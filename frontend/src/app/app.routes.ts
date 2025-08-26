import { Routes } from '@angular/router';
import { Watch } from './components/watch/watch';
import { Details } from './components/details/details';
import { Movies } from './components/movies/movies';
import { Pagenotfound } from './components/pagenotfound/pagenotfound';
import { SearchComponent } from './components/search/search';

export const routes: Routes = [
  { path: 'watchlist', component: Watch },
  { path: 'details/:id', component: Details },
  { path: 'search', component: SearchComponent },
  { path: '', component: Movies },
  {path:'**',component:Pagenotfound}
];
