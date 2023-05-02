import {Component, OnInit} from '@angular/core';
import {from, fromEvent, takeUntil} from "rxjs";

@Component({
    selector: 'app-take',
    templateUrl: './take.component.html',
    styles: [
    ]
})
export class TakeComponent implements OnInit{

    onMouseMove$ = fromEvent(document,'mousemove');
    onMouseDown$ = fromEvent(document,'mousedown');

    ngOnInit(): void {
        this.onMouseMove$
            .pipe(
                takeUntil(this.onMouseDown$)
            )
            .subscribe({
                next: (value: Event): void => {
                    console.log(value);
                }
            })
    }

}
