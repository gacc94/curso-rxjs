import {Component, OnInit} from '@angular/core';
import {from, fromEvent, interval, map, mergeAll, mergeMap, mergeWith, Observable, pipe, switchMap} from "rxjs";

@Component({
    selector: 'app-merge',
    templateUrl: './merge.component.html',
    styles: [
    ]
})
export class MergeComponent implements OnInit{

    onClick$        = fromEvent(document, 'click');
    onMouseMove$    = fromEvent(document, 'mousemove');
    highOrder$ = new Observable((subscriber) => {
        subscriber.next(2);
    });
    firstOrder$:any;
    letters$ = from(['A','B','C','D']);
    myObservable!:Observable<any>;

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
        this.myObservable = this.letters$
            .pipe(
                switchMap((val)=> `${val}+B`),
            )
            // .subscribe({
            //     next: (value) => {
            //         console.log(value);
            //     }
            // })
        this.myObservable.subscribe(value => {
            console.log(value)
        });
    }
}
