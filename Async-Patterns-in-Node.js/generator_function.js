function *generatorFunction() {
    console.log("I'm the generator, firing whenever you split.");

    let x = 5;
    yield x;

    x++;
    y = yield x;
    return x + y;
}

let iterator = generatorFunction();

console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next(6));

console.log("All done.");