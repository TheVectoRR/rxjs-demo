import {Observable, Observer} from 'rxjs';

/**
 * The next 2 subscribed observers are having the excact same logic.
 */

let numbers = [1 ,5, 10];
let source = Observable.from(numbers);

// (1) Implementing an own written Observer

class MyObserver implements Observer<number>{
    next(value){
        console.log(`value: ${value}`);
    }

    error(e){
        console.log(`error: ${e}`);
    }

    complete(){
        console.log('complete');
    }
}

source.subscribe(new MyObserver());

// (2) an easier Observer

source.subscribe(
    value => console.log(`value: ${value}`),
    e => console.log(`error: ${e}`),
    () => console.log('complete')
);

