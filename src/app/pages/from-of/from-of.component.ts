import {Component, OnInit} from '@angular/core';
import {asyncScheduler, from, Observer, of} from "rxjs";

@Component({
  selector: 'app-from-of',
  templateUrl: './from-of.component.html',
  styles: [
  ]
})
export class FromOfComponent implements OnInit{
    fruitsFrom$= from(['apple', 'tangerine', 'pear', 'banana']);
    fruitsOf$= of(['apple', 'tangerine', 'pear', 'banana']);

    ngOnInit(): void {
        this.fruitsFrom$
            .subscribe({
                next: (value) => {
                    console.log(value)
                }
            })
        this.fruitsOf$
            .subscribe({
                next: (value) => {
                    console.log(value)
                }
            })
    }
}
