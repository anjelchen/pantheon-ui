import { ErrorHandler, Injectable, Injector } from '@angular/core';
import { ErrorService } from './error.service';

@Injectable({
    providedIn: 'root'
  })
export class GlobalErrorHandler implements ErrorHandler {

    constructor(private injector: Injector) { }

    handleError(error) {
        console.error('Error occurred in application', error);
        if (error) {
            this.errorService.addError(error.error ? (error.error.detail ? error.error.detail : error.error) : (error.message ? error.message : error));
        }
        throw error;
    }

    get errorService() {
        return this.injector.get(ErrorService);
    }
}
