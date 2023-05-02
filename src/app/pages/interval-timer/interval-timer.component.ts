import {Component, OnInit} from '@angular/core';
import {interval, Observable, timer} from "rxjs";

@Component({
  selector: 'app-interval-timer',
  templateUrl: './interval-timer.component.html',
  styles: [
  ]
})
export class IntervalTimerComponent implements OnInit{

    sequenceNumber$: Observable<number> = interval(1000);
    delayedTimer$ = timer(400);

    ngOnInit(): void {
        this.sequenceNumber$
            .pipe(
            )
            .subscribe({

            next: (value) => {
                // console.log(value)
            }
        })

        this.delayedTimer$.subscribe({
            next: value => {
                console.log()
            }
        })
    }
}
