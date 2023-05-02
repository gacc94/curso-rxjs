import {Component, OnInit} from '@angular/core';
import {from, fromEvent, interval, map, mergeAll, mergeMap, mergeWith, Observable, pipe} from "rxjs";

@Component({
    selector: 'app-merge',
    templateUrl: './merge.component.html',
    styles: [
    ]
})
export class MergeComponent implements OnInit{

    onClick$        = fromEvent(document, 'click');
    onMouseMove$    = fromEvent(document, 'mousemove');
    highOrder$:any;
    firstOrder$:any;
    letters$ = from(['A','B','C','D']);

    ngOnInit(): void {
        // this.onClick$
        //     .pipe(
        //         // map((evt: Event) => evt.type),
        //         // mergeWith(this.onClick$),
        //         // mergeMap(this.onClick$)
        //     )
        //     .subscribe({
        //         next: (type) => {
        //             console.log(type)
        //         }
        //     });
        // this.highOrder$ = this.onClick$
        //     .pipe(
        //         map(() => interval(100)),
        //     );
        // this.firstOrder$ = this.highOrder$.pipe(mergeAll())
        //     .subscribe({
        //         next: (value: any) => {
        //             console.log(value)
        //         }
        //     });
        this.letters$
            .pipe(
                mergeMap((val)=> `${val}+B`),
            )
            .subscribe({
                next: (value) => {
                    console.log(value);
                }
            })

    }
}
