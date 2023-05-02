import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
    title = 'curso-rxjs';

    observable$:Observable<any> = new Observable((subscriber) => {
        subscriber.next(1);
        subscriber.next(2);
        subscriber.next(3);
    });

    constructor() {
    }

    ngOnInit(): void {
        this.observable$.subscribe({
            next: (value) => {
                // console.log(value);
            },
            error: err => {

            },
            complete: () => {

            }
        })
    }

}
