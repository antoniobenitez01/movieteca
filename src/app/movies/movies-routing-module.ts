import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutPageComponent } from './pages/layout-page/layout-page';
import { SearchPageComponent } from './pages/search-page/search-page';
import { MainPageComponent } from './pages/main-page/main-page';
import { MoviePageComponent } from './pages/movie-page/movie-page';
import { FavouritesPageComponent } from './pages/favorites-page/favourites-page';

const routes: Routes = [
  {
    //  locahost:4200/heroes/
    path: '',
    component: LayoutPageComponent,
    children: [
      {path: 'search', component: SearchPageComponent},
      {path: 'main', component: MainPageComponent},
      {path: 'favourites', component: FavouritesPageComponent},
      {path: ':id', component: MoviePageComponent},
      {path: '**', redirectTo: "main"}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MoviesRoutingModule { }
