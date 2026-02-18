import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { catchError, map, Observable, of } from 'rxjs';
import { FavouriteResponse, Movie, TmdbResponse } from '../interfaces/movie-interface';
import { FASTAPI_BASE, TMDB_API_BASE } from '../../../environments/environments-prod';
import { TMDB_API_IMAGES } from '../../../environments/environments';

@Injectable({providedIn: 'root'})
export class MoviesService
{
  private baseUrl : string = TMDB_API_BASE;
  private fastApiUrl : string = FASTAPI_BASE;
  private imagesUrl : string = TMDB_API_IMAGES;
  private TMDB_API_KEY = "6dfa512507bafbe9cf9e18a215793f44";

  constructor(private http: HttpClient) { }

  getPopularMovies(): Observable<Movie[]> {
    const params = new HttpParams()
      .set('api_key', this.TMDB_API_KEY)
      .set('language', 'en-US')
      .set('page', '1');

    return this.http.get<TmdbResponse>(`${this.baseUrl}/3/movie/popular`, { params })
      .pipe(
        map(response => response.results.slice(0, 8))
      );
  }

  getPosterUrl(posterPath: string, size: 'w200' | 'w300' | 'w500' | 'w780' | 'original' = 'w500'): string {
    return `${this.imagesUrl}/${size}${posterPath}`;
  }

  getMovieById(id: number): Observable<Movie> {
    const params = new HttpParams()
      .set('api_key', this.TMDB_API_KEY)
      .set('language', 'en-US');

    return this.http.get<Movie>(`${this.baseUrl}/3/movie/${id}`, { params });
  }

  private getToken(): string {
    return localStorage.getItem('token') ?? '';
  }

  private getHeaders() {
    return {
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.getToken()}`
      })
    };
  }

  addFavourite(idMovie: number): Observable<FavouriteResponse> {
    return this.http.post<FavouriteResponse>(
      `${this.fastApiUrl}/favourites/${idMovie}`, {}, this.getHeaders()
    );
  }

  getFavourites(): Observable<number[]> {
    return this.http.get<FavouriteResponse>(
      `${this.fastApiUrl}/favourites`, this.getHeaders()
    ).pipe(map(response => response.data as number[]));
  }

  deleteFavourite(idMovie: number): Observable<FavouriteResponse> {
    return this.http.delete<FavouriteResponse>(
      `${this.fastApiUrl}/favourites/${idMovie}`, this.getHeaders()
    );
  }
}
