import {Component, OnInit} from '@angular/core';
import {map, of, retry, tap} from "rxjs";

@Component({
    selector: 'app-errors',
    templateUrl: './errors.component.html',
    styles: [
    ]
})
export class ErrorsComponent implements OnInit{
    letters$ =of('A','B','C');

    ngOnInit(): void {
        console.log('Hola')
         this.letters$
             .pipe(
                 retry(2),
                 map((letter) => {
                     if (letter === 'C') {
                         let x = 5;
                     }
                     return letter;
                 }),
                tap((val)=>console.log(val))
             )
             .subscribe({
                 next:(value) => {
                     console.log(value)
                 }
             })
    }
}
