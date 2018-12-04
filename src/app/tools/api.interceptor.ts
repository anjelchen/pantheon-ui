import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, finalize, map } from 'rxjs/operators';
import { SpinnerService } from './spinner.service';

@Injectable({
    providedIn: 'root'
})
export class ApiInterceptor implements HttpInterceptor {

    private count: number = 0;

    constructor(private spinnerService: SpinnerService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        this.count++;

        if (this.count === 1) {
            this.spinnerService.showSpinner();
        }

        return next.handle(req).pipe(
            map(event => {
                return event;
            }),
            catchError(error => {
                return Observable.throw(error);
            }),
            finalize(() => {
                this.count--;
                if (this.count === 0) {
                    this.spinnerService.hideSpinner();
                }
            })
        );
    }
}
