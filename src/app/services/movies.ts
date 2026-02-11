import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Movie } from '../interfaces/movie';
import { API_BASE } from '../../environments/environments';

@Injectable({providedIn: 'root'})
export class MoviesService {

  public movies : Movie[] = [];

  private http = inject(HttpClient);
  private apiKey : string = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2ZGZhNTEyNTA3YmFmYmU5Y2Y5ZTE4YTIxNTc5M2Y0NCIsIm5iZiI6MTc3MDgzMzc5My4zNjYwMDAyLCJzdWIiOiI2OThjYzc4MWE4MTkwNjhiYzUxYzgzZTAiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.s4jBL383PT5OuXdb0Qth_sD3ZvLxeliE8yc1607alAA"
  private serviceUrl : string = API_BASE;
}
