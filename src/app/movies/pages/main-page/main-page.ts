import { Component, ElementRef, ViewChild } from '@angular/core';
import { MoviesService } from '../../services/movies';
import { Movie } from '../../interfaces/movie-interface';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.html',
  styleUrl: './main-page.css',
  standalone : false
})
export class MainPageComponent {

  public listadoMovies : Movie[] = [];
  favouriteIds: number[] = [];

  constructor( private moviesService : MoviesService ){}

  ngOnInit() {
    this.moviesService.getPopularMovies().subscribe(movies => {
      this.listadoMovies = movies;
    });

    this.moviesService.getFavourites().subscribe(ids => {
      this.favouriteIds = ids;
    });
  }
}
