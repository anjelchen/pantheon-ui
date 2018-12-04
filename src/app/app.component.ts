import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { of, timer } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { ErrorService } from './tools/error.service';
import { SpinnerService } from './tools/spinner.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  showSpinner: boolean = false;

  constructor(private spinnerService: SpinnerService, private errorService: ErrorService, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.errorService.getError().subscribe(error => {
      this.snackBar.open(error);
    });

    this.spinnerService.getSpinner().pipe(switchMap(showSpinner => timer(0)
      .pipe(switchMap(() => of(showSpinner))))).subscribe(showSpinner => this.showSpinner = showSpinner);
  }

}
