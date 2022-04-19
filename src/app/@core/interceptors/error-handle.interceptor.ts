import { Injectable } from "@angular/core";
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable, throwError } from "rxjs";
import { catchError } from 'rxjs/operators';
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
 
@Injectable()
export class GlobalHttpRequestError implements HttpInterceptor {
    
  constructor(public router: Router, private toastr: ToastrService) {
  }
 
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
 
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        if(error.status === 401) {
          this.toastr.warning("refreshing token, please refresh app", "Token expired")
          localStorage.clear();
          this.router.navigate(['']);
        } else if(error.status === 0) {
          this.toastr.error('Server not responding', 'Server Failure')
        }
        else if(error.status === 404) {
          this.toastr.error('Item not found', 'Error')
        }
        return throwError(error.message);
      })
    )
  }
}