import { Component } from '@angular/core';
import {fromEvent, pluck} from "rxjs";

@Component({
    selector: 'app-pluck',
    templateUrl: './pluck.component.html',
    styles: [
    ]
})
export class PluckComponent {

    onMouseMove$ = fromEvent(document,'mousemove');

    ngOnInit(): void {
        this.onMouseMove$
            .pipe(
                pluck('clientX')
            )
            .subscribe({
                next: (value) => {
                    console.log(value)
                }
            })
    }
}
