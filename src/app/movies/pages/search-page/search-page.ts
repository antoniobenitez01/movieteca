import { Component } from '@angular/core';
import { Movie } from '../../interfaces/movie-interface';
import { MoviesService } from '../../services/movies';

@Component({
  selector: 'app-search-page',
  standalone : false,
  templateUrl: './search-page.html',
  styles: ``,
})
export class SearchPageComponent {
  
  query = '';
  results: Movie[] = [];
  loading = false;

  constructor(private moviesService : MoviesService) {}

  onSearch(): void {
    if (!this.query.trim()) {
      this.results = [];
      return;
    }
    this.loading = true;
    setTimeout(() => {
      this.moviesService.searchMovies(this.query).subscribe({
        next: (movies) => {
          this.results = movies;
          this.loading = false;
        },
        error: () => this.loading = false
      });
    }, 4000);
  }
}
