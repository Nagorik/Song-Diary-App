import { AfterViewInit, Component, OnInit } from '@angular/core';
import { UserInfo } from './shared/models/login.models';
import { AuthService } from './@auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit {
  title = 'song-diary-app';
  isLoggedIn: Boolean = false;
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    const userInfo: UserInfo = { email: 'nilson@email.com', password: 'nilson' };
    this.authService.login(userInfo).subscribe((resp) => {
      localStorage.setItem('token', resp.access_token);
      setTimeout(() => {
        this.isLoggedIn = true;
        this.router.navigate(['/home']);
      }, 500);
    });
    
  }

  ngAfterViewInit(): void {
  }
}
