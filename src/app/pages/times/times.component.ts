import {Component, OnInit} from '@angular/core';
import {auditTime, debounceTime, fromEvent, sampleTime, throttleTime} from "rxjs";

@Component({
  selector: 'app-times',
  templateUrl: './times.component.html',
  styles: [
  ]
})
export class TimesComponent implements OnInit{

    onClick$ = fromEvent(document,'click');

    ngOnInit(): void{
        this.onClick$
            .pipe(
                // debounceTime(1000),
                // throttleTime(1000),
                auditTime(4000),
                // sampleTime(4000),
            )
            .subscribe({
                next: (value) => {
                    console.log(value)
                }
            })
    }
}
