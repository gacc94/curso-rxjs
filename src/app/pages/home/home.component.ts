import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {fromEvent, NextObserver, Observable, Observer, Subject, Subscription} from "rxjs";
// @ts-ignore
import WORDS_LIST  from './wordList.json';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{
    @ViewChild('') letter: any;
    onKeyDown$: Observable<Event> = fromEvent(document, 'keydown');
    letterIndex: number = 0;
    letterRowIndex: number = 0;
    userAnswer:Array<string> = [];
    insertLetter!: Observer<any> | NextObserver<any>;
    subscription!: Subscription;
    userWinOrLoose$ = new Subject();


    get randomWord(): string {
        return (WORDS_LIST[Math.floor(Math.random() * WORDS_LIST.length)]);
    }

    ngOnInit(): void {
        console.log(this.randomWord);
        console.log(this.randomWord);
        this.onKeyDown$.subscribe({
            next: (event:Event): void => {
                const evt: KeyboardEvent = <KeyboardEvent>event;
                const pressKey: string  = (evt.key).toUpperCase();
                const elements:NodeListOf<Element> = document.querySelectorAll('.letter-row');
                if(pressKey.length === 1 && pressKey.match(/[a-z]/i)){
                    let elementList: Array<Element> = Array.from(elements);
                    let letterBox: Element = elementList[this.letterRowIndex].children[this.letterIndex];
                    letterBox.textContent = pressKey;
                    letterBox.classList.add('filled-letter');
                    this.userAnswer.push(pressKey);
                    this.userWinOrLoose$.next(letterBox);
                    this.letterIndex++;
                }
            }
        });

        this.onKeyDown$.subscribe({
            next: (value: Event): void => {
                let messageText: HTMLElement | null = document.getElementById('message-text');
                const elements:NodeListOf<Element> = document.querySelectorAll('.letter-row');
                let elementList: Array<Element> = Array.from(elements);
                if ((<KeyboardEvent>value).key === 'Enter'){
                    for (let i:number = 0; i < 5; i++) {
                        let letterColor: string = '';
                        let letterBox: Element = elementList[this.letterRowIndex].children[i];
                        let letterPosition = Array.from(this.randomWord).indexOf(this.userAnswer[i]);
                        if(letterPosition === -1){
                            letterColor = 'letter-gray';
                        }
                        letterBox.classList.add(letterColor);
                    }
                    // if(this.userAnswer.length === 5) {
                    //     this.letterIndex = 0;
                    //     this.userAnswer = [];
                    //     this.letterRowIndex++;
                    // } else {
                    //     if(messageText){
                    //         messageText.innerText = 'Te faltan algunas letras!';
                    //     }
                    // }
                    if(this.userAnswer.join('') === this.randomWord){
                        this.userWinOrLoose$.next('');
                    }
                }
            }
        })
        this.onKeyDown$.subscribe({
            next: (event:Event): void => {
                const evt: KeyboardEvent = <KeyboardEvent>event;
                const pressKey: string  = evt.key;
                const elements:NodeListOf<Element>= document.querySelectorAll('.letter-row');
                if( pressKey === 'Backspace' && this.letterIndex !== 0 ){
                    let elementList: Array<Element> = Array.from(elements);
                    let letterBox: Element          = elementList[this.letterRowIndex].children[this.letterIndex-1];
                    letterBox.textContent           = '';
                    this.userAnswer.pop();
                    letterBox.classList.remove('filled-letter');
                    this.letterIndex--;
                }
            }
        })

        this.userWinOrLoose$.subscribe({
            next: (): void => {
                const elements: NodeListOf<Element> = document.querySelectorAll('.letter-row');
                let  letterBox: Element             = Array.from(elements)[this.letterRowIndex];
                for (let i: number = 0; i < 5 ; i++) {
                    letterBox.children[i].classList.add('letter-green');
                    console.log(letterBox.children[i]);
                }
            }
        })
    }
}
