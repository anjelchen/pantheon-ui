import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class SpinnerService {

    private spin = new Subject<boolean>();

    showSpinner() {
        this.spin.next(true);
    }

    hideSpinner() {
        this.spin.next(false);
    }

    getSpinner(): Observable<boolean> {
        return this.spin.asObservable();
    }
}
