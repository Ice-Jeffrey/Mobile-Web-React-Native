function forEach(arr, visitor) {
    let length = arr.length;
    //for each element of the array, call the visitor function
    for(let i=0;i<length;i++)
        visitor(arr[i], i);
}

let callback = (element, index) => {
    //this is the callback function, just output the element and show its index
    console.log(element + ' index: ' + index);
}

//instantiate a new array in our
let arr = [1, 2, 3];
//call the foreach function we have written
forEach(arr, callback);
console.log(arr);