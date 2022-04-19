import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class HeaderInterceptor implements HttpInterceptor {

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(this.addAuthToken(request));
    }

    private addAuthToken (request: HttpRequest<any>) {
        const token = localStorage.getItem('token');
        return request.clone({
            setHeaders: {
                ContentType: 'application/json',
                Authorization: `Bearer ${token}`
            },
        })
    }

}
