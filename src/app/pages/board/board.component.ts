import {Component, ElementRef, OnInit, Renderer2, ViewChild} from '@angular/core';
import {fromEvent, map, mergeAll, Observable, Observer, tap} from "rxjs";

@Component({
    selector: 'app-board',
    templateUrl: './board.component.html',
    styles: [
    ]
})
export class BoardComponent implements OnInit{
    @ViewChild('reactiveCanvas',{static:true}) canvas!: ElementRef;
    onMouseDown$: Observable<Event>    = fromEvent(document, 'mousedown');
    onMouseMove$: Observable<Event>    = fromEvent(document, 'mousemove');
    onMouseUp$:   Observable<Event>    = fromEvent(document, 'mouseup');
    cursorPosition = {x:0, y:0};
    constructor(
       private _render: Renderer2
    ) {}

    ngOnInit(): void {
        const canvas = this.canvas?.nativeElement;
        // this._render.setStyle(canvas,'background','red');
        const canvasContext = this.canvas?.nativeElement.getContext('2d');

        canvasContext.lineWidth = 8
        canvasContext.strokeStyle = 'white';

        const updateCursorPosition = (evt: Event) => {
            this.cursorPosition.x = (<MouseEvent>evt).clientX - canvas.offsetLeft;
            this.cursorPosition.y = (<MouseEvent>evt).clientY - canvas.offsetTop;
        }

        const paintStroke = (evt: Event) => {
            canvasContext.beginPath();
            canvasContext.moveTo(this.cursorPosition.x, this.cursorPosition.y);
            updateCursorPosition(evt);
            canvasContext.lineTo(this.cursorPosition.x, this.cursorPosition.y);
            canvasContext.stroke();
            canvasContext.closePath();
        }

        // this.onMouseMove$
        //     .pipe(
        //         // tap((val: Event) => console.log(val))
        //     )
        //     .subscribe((event: Event): void => {
        //         const evt: MouseEvent = <MouseEvent>event
        //         this.cursorPosition.x = evt.clientX - canvas.offsetLeft;
        //         this.cursorPosition.y = evt.clientY - canvas.offsetTop;
        //         console.log(this.cursorPosition);
        //
        //     })
        this.onMouseDown$
            .pipe(
                map(()=>this.onMouseMove$),
                mergeAll(),
            )
            .subscribe({
                next: paintStroke
            });

        this.onMouseDown$.subscribe(updateCursorPosition);

    }
}
