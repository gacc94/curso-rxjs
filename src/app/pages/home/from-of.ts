import {from, of} from "rxjs";

export const fruits$ = of(['apple', 'tangerine', 'pear']);

fruits$.subscribe({
    next: (value): void => {
        console.log(value)
    }
})