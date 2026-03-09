import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MoviesRoutingModule } from './movies-routing-module';
import { LayoutPageComponent } from './pages/layout-page/layout-page';
import { ListPageComponent } from './pages/list-page/list-page';
import { SearchPageComponent } from './pages/search-page/search-page';
import { MaterialModule } from '../material/material-module';
import { CardComponent } from './components/card/card';
import { ReactiveFormsModule } from '@angular/forms';
import { MoviePageComponent } from './pages/movie-page/movie-page';
import { FavouritesPageComponent } from './pages/favorites-page/favourites-page';


@NgModule({
  declarations: [
    MoviePageComponent,
    LayoutPageComponent,
    ListPageComponent,
    SearchPageComponent,
    CardComponent,
    FavouritesPageComponent
  ],
  imports: [
    CommonModule,
    MoviesRoutingModule,
    MaterialModule,
    ReactiveFormsModule
  ]
})
export class MoviesModule { }
