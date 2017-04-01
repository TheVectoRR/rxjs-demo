// import just what we need
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';

let numbers = [1 ,5, 10, 15]
let source = Observable.create(observer => {

    let index = 0;
    let produceValue = () => {
        observer.next(numbers[index++]);

        if(index < numbers.length){
            setTimeout(produceValue, 500); // async, delaying 0.5 a second
        }
        else{
            observer.complete();
        }
    }

    produceValue();

}).map(n => n * 2) // using RxJs Operators
    .filter(n => n <= 10);



source.subscribe(
    value => console.log(`value: ${value}`),
    e => console.log(`error: ${e}`),
    () => console.log('complete')
);

