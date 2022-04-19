import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserInfo, AccessToken } from '../shared/models/login.models';
import { environment as env } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiUrl: string = ''
  constructor(private httpClient: HttpClient) {
    this.apiUrl = env.apiHost + 'auth/login'
  }

  login(userInfo: UserInfo): Observable<AccessToken> {
    return this.httpClient.post<AccessToken>(this.apiUrl, userInfo)
  }
}
