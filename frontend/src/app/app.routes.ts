import { Routes } from '@angular/router';
import { Watch } from './components/watch/watch';
import { Details } from './components/details/details';
import { Movies } from './components/movies/movies';

export const routes: Routes = [{ path: 'watch', component: Watch }, {path: 'details/:id', component: Details}, 
    {path: '', component: Movies}];
