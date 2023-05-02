import {Component, ElementRef, OnInit, Renderer2, ViewChild} from '@angular/core';
import {fromEvent, Observable, Observer, tap} from "rxjs";

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

        canvasContext.beginPath();
        canvasContext.moveTo(100,200);
        canvasContext.lineTo(200,100);
        canvasContext.stroke();
        canvasContext.closePath();

        this.onMouseMove$
            .pipe(
                // tap((val: Event) => console.log(val))
            )
            .subscribe((event: Event): void => {
                const evt: MouseEvent = <MouseEvent>event
                this.cursorPosition.x = evt.clientX - canvas.offsetLeft;
                this.cursorPosition.y = evt.clientY - canvas.offsetTop;
                console.log(this.cursorPosition);

            })


    }
}
