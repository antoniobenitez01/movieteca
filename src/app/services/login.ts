import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiResponse } from '../interfaces/api-response';
import { SGE_API } from '../../environments/environments-prod';

@Injectable({providedIn: 'root'})
export class LoginService {

  constructor(private http: HttpClient) { }

  doLogin(data: any) {
    const body = JSON.stringify(data);
    return this.http.post<ApiResponse>(`${SGE_API}/login.php`, body);
  }
}
