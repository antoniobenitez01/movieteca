import { Component, ElementRef, ViewChild } from '@angular/core';
import { MoviesService } from '../../services/movies';
import { Movie } from '../../interfaces/movie-interface';

@Component({
  selector: 'app-list-page',
  templateUrl: './list-page.html',
  styleUrl: './list-page.css',
  standalone : false
})
export class ListPageComponent {

  public listadoMovies : Movie[] = [];
  favouriteIds: number[] = [];
  @ViewChild('gallery') galleryRef!: ElementRef<HTMLDivElement>;

  constructor( private moviesService : MoviesService ){}

  canScrollLeft  = false;
  canScrollRight = true;

  scroll(direction: 'left' | 'right') {
    const scrollAmount = 300;
    this.galleryRef.nativeElement.scrollLeft += direction === 'right' ? scrollAmount : -scrollAmount;
    this.updateScrollButtons();
  }

  updateScrollButtons() {
    const el = this.galleryRef.nativeElement;
    this.canScrollLeft  = el.scrollLeft > 0;
    this.canScrollRight = el.scrollLeft < el.scrollWidth - el.clientWidth;
  }

  ngOnInit() {
    this.moviesService.getPopularMovies().subscribe(movies => {
      this.listadoMovies = movies;
    });

    this.moviesService.getFavourites().subscribe(ids => {
      this.favouriteIds = ids;
    });
  }
}
