import { Component } from '@angular/core';
import {distinct, distinctUntilChanged, distinctUntilKeyChanged, from, of} from "rxjs";

@Component({
    selector: 'app-distinct-others',
    templateUrl: './distinct-others.component.html',
    styles: [
    ]
})
export class DistinctOthersComponent {
    repeatedNumbers$ = from([1,2,3,4,5,2,5,7,1,3,2,2]);
    repeatObjects$ = of(
        {name: 'carlos', age: 22},
        {name: 'pedro', age: 22},
        {name: 'carlos', age: 25},
        {name: 'renzo', age: 22},
    );
    ngOnInit(): void {
        this.repeatedNumbers$
            .pipe(
                // distinct(),
                distinctUntilChanged(),
            )
            .subscribe({
                next: (value) => {
                    console.log(value)
                }
            })
        this.repeatObjects$
            .pipe(
                distinctUntilKeyChanged('age'),
            )
            .subscribe({
                next: (value) => {
                    console.log(value)
                }
            })
    }
}
