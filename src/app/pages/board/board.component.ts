import {Component, ElementRef, OnInit, Renderer2, ViewChild} from '@angular/core';
import {
    debounceTime,
    fromEvent,
    map,
    merge,
    mergeAll,
    Observable,
    Observer,
    Subscription,
    takeUntil,
    tap,
    throttleTime
} from "rxjs";

@Component({
    selector: 'app-board',
    templateUrl: './board.component.html',
    styles: [
    ]
})
export class BoardComponent implements OnInit{
    @ViewChild('reactiveCanvas',{static:true}) canvas!: ElementRef;
    @ViewChild('restart',{static: true}) restart!:ElementRef;

    onMouseDown$:   Observable<Event>   = fromEvent(document, 'mousedown');
    onMouseMove$:   Observable<Event>   = fromEvent(document, 'mousemove');
    onMouseUp$:     Observable<Event>   = fromEvent(document, 'mouseup');
    onLoadWindow$:   Observable<Event>  = fromEvent(window, 'load');


    cursorPosition = {x:0, y:0};

    constructor(
       private _render: Renderer2
    ) {}

    ngOnInit(): void {
        const canvas = this.canvas?.nativeElement;
        const restart = this.restart?.nativeElement;
        // this._render.setStyle(canvas,'background','red');
        const canvasContext = this.canvas?.nativeElement.getContext('2d');
        const onRestartClick$: Observable<Event>  = fromEvent(this.restart?.nativeElement, 'click');
        const restartWhiteBoard$: Observable<Event> = merge(this.onLoadWindow$, onRestartClick$)


        canvasContext.lineWidth = 8
        canvasContext.lineJoin = 'round';
        canvasContext.lineCap = 'round';
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
        const startPaint$ = this.onMouseDown$
            .pipe(
                map(()=> {
                    return this.onMouseMove$
                        .pipe(
                            debounceTime(3),
                            takeUntil(this.onMouseUp$)
                        )
                }),
                mergeAll(),
            )
        let startPaintSubscription:Subscription = startPaint$.subscribe({
                next: paintStroke
            });

        this.onMouseDown$.subscribe(updateCursorPosition);
        restartWhiteBoard$.subscribe({
            next: (value: Event) => {
                startPaintSubscription.unsubscribe();
                canvasContext.clearRect(0,0,canvas.with,canvas.height);
                startPaintSubscription = startPaint$.subscribe({
                    next: paintStroke
                });
            }
        })

    }
}
