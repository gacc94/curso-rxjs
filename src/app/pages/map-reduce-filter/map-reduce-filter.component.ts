import {Component, OnInit} from '@angular/core';
import {filter, from, map, Observable, reduce, Subscription, switchMap} from "rxjs";
import {logMessages} from "@angular-devkit/build-angular/src/builders/browser-esbuild/esbuild";

@Component({
    selector: 'app-map-reduce-filter',
    templateUrl: './map-reduce-filter.component.html',
    styles: [
    ]
})
export class MapReduceFilterComponent implements OnInit{

    numbers$: Observable<number> = from([1,2,3,5,6,7]);

    ngOnInit(): void{
        const values: Subscription = this.numbers$
            .pipe(
                map((num) => num*2),
                map((num)=> num**2),
                // reduce((acc, val)=> {
                //     return acc + val
                // }, 120),
                filter((num: number) => (num%2===0))
            )
            .subscribe({
                next(value): void {
                    console.log(value)
                }
            })

        console.log(values);
    }

}
