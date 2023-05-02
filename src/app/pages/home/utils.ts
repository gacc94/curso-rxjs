import {BehaviorSubject, NextObserver, Observable, Observer, Subject} from "rxjs";

const numbers$: Observable<number> = new Observable(subscriber => {
    subscriber.next(Math.random()*10);
})

const numberRandom$:Subject<number> = new Subject<number>();
const numberRandom2$:BehaviorSubject<number> = new BehaviorSubject<number>(2);

numberRandom$.next(Math.random()*10);

const observer1: Observer<number> | NextObserver<number> = {
    next: (num: number) => {
        console.log(num);
    }
}

const observer2: Observer<number> | NextObserver<number> = {
    next: (num: number) => {
        console.log(num);
    }
}

numbers$.subscribe(observer1);
numbers$.subscribe(observer2);