import { Component } from '@angular/core';
import {endWith, of, startWith} from "rxjs";

@Component({
    selector: 'app-start-with-end-with',
    templateUrl: './start-with-end-with.component.html',
    styles: [
    ]
})
export class StartWithEndWithComponent {

    letters$ =of('A','B','C');
    ngOnInit(): void {
        this.letters$
            .pipe(
                startWith('Z'),
                endWith('X'),
            )
            .subscribe(console.log)
    }
}
