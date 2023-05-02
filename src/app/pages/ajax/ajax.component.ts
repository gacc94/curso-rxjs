import { Component } from '@angular/core';
import {ajax} from "rxjs/internal/ajax/ajax";
import {catchError, map, Observable, of} from "rxjs";
import {AjaxResponse} from "rxjs/internal/ajax/AjaxResponse";

@Component({
    selector: 'app-ajax',
    templateUrl: './ajax.component.html',
    styles: [
    ]
})
export class AjaxComponent {

    ditto$: Observable<AjaxResponse<any>> = ajax('https://pokeapi.co/api/v2/pokemon/ditto');
    postRequest$ = ajax({
        url: 'https://httpbin.org/delay/2',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: {
            message: '¿Donde esta DITTO?'
        }
    });

    ngOnInit(): void {
        this.ditto$
            .pipe(
                catchError((err, caught) => {
                    console.log(err.status);
                    return of(err);
                }),
                map((data) => data.response),

            )
            .subscribe({
                next: (value) => {
                    console.log(value);
                }
            });
        this.postRequest$
            .pipe(
                map((data) => {
                    console.log(data);
                    return data.response;
                }),
                catchError((err) => {
                    console.log(err.status);
                    return of(err);
                }),
            )
            .subscribe({
                next: (value) =>{
                    console.log(value.data);
                }
            });

    }

}
