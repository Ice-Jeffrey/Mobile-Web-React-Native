let arr1 = [1, 2, 3, 'red']

arr2 = arr1.map( (e) => {
    console.log(e+1);
})

//map method in JavaScript arrays
Array.prototype.map = (callback) => {
    let O = Object(this), arr = [];
    O.array.forEach(element => {
        arr.push( callback(element) )
    });
    return arr;
}

//reduce method in JavaScript arrays
Array.prototype.reduce = (callback, initial) => {
    let O = Object(this), acc = initial;
    O.array.forEach(element => {
        acc = callback(element, acc);
    });
    return acc;
}

let obj1 = {
    login: 'hhhh',
    name: 'Jeffrey'
}

let obj2 = {
    'login': 'hh',
    'name': 'Jeffrey'
}

console.log(obj1.login, obj2.name)