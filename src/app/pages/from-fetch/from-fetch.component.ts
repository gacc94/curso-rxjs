import { Component } from '@angular/core';
import {fromFetch} from "rxjs/internal/observable/dom/fetch";
import {map, mergeMap, takeUntil, timer} from "rxjs";

@Component({
    selector: 'app-from-fetch',
    templateUrl: './from-fetch.component.html',
    styles: [
    ]
})
export class FromFetchComponent {
    private readonly _url: string = 'https://pokeapi.co/api/v2/pokemon/ditto';
    public ditto$ = fromFetch(`${this._url}`);

    ngOnInit(): void {
        this.ditto$
            .pipe(
                mergeMap((res) => res.json()),
                takeUntil(timer(4000)),
            )
            .subscribe({
                next: (value): void => {
                    console.log(value)
                }
            });



    }
}
