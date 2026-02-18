import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { MoviesService } from '../../services/movies';
import { Movie } from '../../interfaces/movie-interface';

@Component({
  selector: 'app-movie-page',
  templateUrl: './movie-page.html',
  styles: ``,
  standalone : false
})
export class MoviePageComponent implements OnInit{

  public movie?: Movie;

  constructor(
    private moviesService : MoviesService,
    private activatedRoute : ActivatedRoute,
    private router : Router
  ){

  }

  ngOnInit(): void {
    console.log(this.activatedRoute.params);
    this.activatedRoute.params.pipe(
      switchMap( ({id}) => this.moviesService.getMovieById( id ))
    ).subscribe( movie => {
      if (!movie) return this.router.navigate(['/movies/list']);
      this.movie = movie;
      console.log(movie);
      return;
    })
  }

  volver(){
    this.router.navigate(["/movies/list"]);
  }
}
