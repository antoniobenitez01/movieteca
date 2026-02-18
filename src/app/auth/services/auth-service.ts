import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { ApiResponse } from '../../shared/interfaces/api-response';
import { FASTAPI_BASE, SGE_API } from '../../../environments/environments-prod';
import { User } from '../../shared/interfaces/user';

@Injectable({providedIn: 'root'})
export class AuthService {

  constructor(private http: HttpClient) { }

  login( data : any ): Observable<ApiResponse>{
    const body = JSON.stringify(data);
    return this.http.post<ApiResponse>(`${SGE_API}/login.php`, body)
      .pipe(
        map(response => {
          if (!response.data?.token) {
            throw response;
          }
          localStorage.setItem('nombre_publico', response.data.nombre_publico);
          localStorage.setItem('token', response.data.token);
          return response;
        })
      )
  }

  logout() {
    localStorage.clear();
  }

  checkAuthentication() : Observable<boolean> {
    if (!localStorage.getItem('token')) return of(false);
    const headers = { Authorization: `Bearer ${localStorage.getItem('token')}` };

    return this.http.get<ApiResponse>(`${FASTAPI_BASE}/auth/validate-token`, { headers })
      .pipe(
        map( user => !!user ),
        catchError( err => of(false) )
      )
  }
}
