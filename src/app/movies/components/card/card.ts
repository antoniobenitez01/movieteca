import { Component, Input, OnInit } from '@angular/core';
import { Movie } from '../../interfaces/movie-interface';
import { MoviesService } from '../../services/movies';

@Component({
  selector: 'movie-card',
  templateUrl: './card.html',
  styleUrl: './card.css',
  standalone : false
})

export class CardComponent implements OnInit {

  @Input()
  public movie!: Movie;

  @Input() isFavourite = false;

  isExpanded = false;

  constructor( public moviesService : MoviesService ){}

  ngOnInit(): void {
      if (!this.movie) throw new Error("Movie property is required.");
  }

  toggleExpand() {
    this.isExpanded = !this.isExpanded;
  }

  getPosterUrl(posterPath: string): string {
    return this.moviesService.getPosterUrl(posterPath);
  }

  toggleFavourite() {
    if (this.isFavourite) {
      this.moviesService.deleteFavourite(this.movie.id).subscribe({
        next: () => this.isFavourite = false,
        error: (err) => console.error('Error removing favourite', err)
      });
    } else {
      this.moviesService.addFavourite(this.movie.id).subscribe({
        next: () => this.isFavourite = true,
        error: (err) => console.error('Error adding favourite', err)
      });
    }
  }
}
