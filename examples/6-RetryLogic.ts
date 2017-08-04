import {Observable} from 'rxjs';


let output = document.getElementById("output");
let button = document.getElementById("button");

let click = Observable.fromEvent(button, "click");

function load(url: string) {
    return Observable.create(observer => {
        let xhr = new XMLHttpRequest();

        xhr.addEventListener("load", () => {
            if (xhr.status === 200) {
                let data = JSON.parse(xhr.responseText);
                observer.next(data);
                observer.complete();
            } else {
                observer.error(xhr.statusText);
            }
        });

        xhr.open("GET", url);
        xhr.send();
    }).retryWhen(retryStrategy(3, 1500));
    ;
}

function retryStrategy(attempts: number=4, delay: number=1000) {
    return function (errors) {
        return errors
            .scan((acc, value) => {
                console.log(acc, value);
                return acc + 1;
            }, 0) // 0 is the starting value of acc
            .takeWhile(acc => acc < attempts)
            .delay(delay);
    }
}

function renderMovies(movies) {
    movies.forEach(m => {
        let div = document.createElement("div");
        div.innerText = m.title;
        output.appendChild(div);
    });
}

/**
 * flatMap subscribe for us to the next observable.
 * click event observable fires a http request observable, with flatMap we need to subscribe only once and the chained
 * observable will fire for us as well.
 */
click.flatMap(e => load("movies2.json"))
    .subscribe(
        renderMovies,
        e => console.log(`error: ${e}`),
        () => console.log('complete')
    );

