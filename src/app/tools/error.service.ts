import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ErrorService {

    private error = new Subject<string>();

    addError(error: string) {
        this.error.next(error);
    }

    clearError() {
        this.error.next();
    }

    getError(): Observable<string> {
        return this.error.asObservable();
    }
}
