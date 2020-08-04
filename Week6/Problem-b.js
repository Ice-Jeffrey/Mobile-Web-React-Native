function forEach(arr, visitor) {
    let length = arr.length;
    //for each element of the array, call the visitor function
    for(let i=0;i<length;i++)
        visitor(arr[i], i);
}

function every(arr, predicate) {
    //set up an array where for each element you can check if it satisfies the predicate
    let flags = [], flag = true;
    //customize the visitor function to be used in forEach operation
    let visitor = (element, index) => {
        //if satisfies, the flag is true,
        if(predicate(element))
            flags.push(true);
        //if not satisfy, the flag is false,
        else    
            flags.push(false);        
    }
    //call the foreach function
    forEach(arr, visitor);
    //if every element satisfies the predicate, return true
    for(let i=0;i<arr.length;i++)
        flag &= flags[i];
    return flag;
}

function some(arr, predicate) {
    //set up an array where for each element you can check if it satisfies the predicate
    let flags = [], flag = false;
    //customize the visitor function to be used in forEach operation
    let visitor = (element, index) => {
        //if satisfies, the flag is true,
        if(predicate(element))
            flags.push(true);
        //if not satisfy, the flag is false,
        else    
            flags.push(false);        
    }
    //call the foreach function
    forEach(arr, visitor);
    //if every element satisfies the predicate, return true
    for(let i=0;i<arr.length;i++)
        flag |= flags[i];
    return flag;
}

//let's do some test
let arr = [1, 2, 3];
let flag1, flag2;
//the predicate function
let predicate = (element) => {
    if(element >= 2)
        return true;
    else 
        return false;
}

//based on the condition of flag to output related result
let output = (flag) => {
    //if the flag is true, output 'true'. otherwise output 'false'
    if(flag)
        console.log('true');
    else    
        console.log('false');    
}

flag1 = every(arr, predicate);
flag2 = some(arr, predicate);
output(flag1);
output(flag2);