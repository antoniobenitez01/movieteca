import { Component, ElementRef, ViewChild } from '@angular/core';
import { Movie } from '../../interfaces/movie-interface';
import { MoviesService } from '../../services/movies';

@Component({
    selector: 'favourites-page',
    templateUrl: 'favourites-page.html',
    standalone: false,
    styleUrl: 'favourites-page.css'
})

export class FavouritesPageComponent {
  
  public listadoMovies : Movie[] = [];
  @ViewChild('gallery') galleryRef!: ElementRef<HTMLDivElement>;

  constructor( private moviesService : MoviesService ){}

  ngOnInit() {
    this.moviesService.getFavourites().subscribe(ids => {
      ids.forEach((id) => {
        this.moviesService.getMovieById(id).subscribe( movie => {
          if(movie){
            this.listadoMovies.push(movie);
          }
        });
      });
    });
  }
}