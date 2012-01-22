/* jshint forin:true, eqnull:true, noarg:true, noempty:true, eqeqeq:true, strict:true,
   undef:true, curly:true, browser:true, devel:true, es5:true, indent:4, maxerr:50, white:true */

// Note: JSHint will complain about destructuring assignment. This is a willful violation.

/**
 * The purpose of this file is to explain what sorting algorithms are 
 * and why they should NOT be re-implemented in userland code
 *
 * We will compare a slow algorithm (Bubblesort) with Quicksort and the built in Array.sort
 */

// Capability test a few things we use
// Destructuring assignment
try {
    var test_a = 1, test_b = 2;
    [test_a, test_b] = [test_b, test_a];
} catch (e) {
    console.log("Destructuring assignment not supported. Known to work in Firefox and Opera.");
}
try {
    Date.now();
} catch (e) {
    console.log("Date.now() not supported.");
}


/**
 * Simple bubble sort
 * 
 * This function will modify the array being passed by reference
 * BTW, never ever use bubble sort for anything but testing
 * http://en.wikipedia.org/wiki/Bubble_sort
 */
function bubblesort (a, cfun) {
    "use strict";
    var sorted = false;
    var len = a.length - 1;
    while ( !sorted ) {
        sorted = true;
        for ( var i = 0; i < len; i += 1) {
            if ( cfun(a[i], a[i+1]) > 0 ) {
                [a[i], a[i+1]] = [a[i+1], a[i]];
                sorted = false;
            }
        }
        len -= 1;
    }
    return a;
}

/**
 * Simple quicksort, a bit RAM-expensive but otherwise quite OK
 * 
 * http://en.wikipedia.org/wiki/Quicksort
 * 
 * @param a     Array to be sorted
 * @param cfun  Comparison function to be used
 * @return Array
 */
function trivial_quicksort(a, cfun) {
    "use strict";
    if ( !Array.isArray(a) ) {
        throw new Error("First argument to trivial_quicksort must be an array");
    }
    if ( typeof(cfun) !== 'function' ) {
        throw new Error("Second argument to trivial_quicksort must be a function");
    }
    var len = a.length;
    if ( len <= 1 ) {
        return a;
    }
    if ( len === 2 ) {
        return (cfun(a[0], a[1]) <= 0) ? a : [a[1], a[0]];
    }
    // Just pick a pivot somewhere in the middle - this could be optimized
    var pivot = a[Math.floor(len/2)];
    // If pivot equals smallest or largest item using only two arrays
    // will cause infinite recursion, thus we add an equals array not in ref. implementation.
    var less = [], equals = [], greater = [];
    for ( var i = 0; i < len; i += 1) {
        if ( cfun(a[i], pivot) < 0 ) {
            less[less.length] = a[i];
        } else if ( cfun(a[i], pivot) === 0 ){
            equals[equals.length] = a[i];
        } else {
            greater[greater.length] = a[i];
        }
    }
    return trivial_quicksort(less, cfun).concat(equals, trivial_quicksort(greater, cfun));
}

function compare(a, b) {
    "use strict";
    return a - b;
}

//Make an array - use more items on fast machines
var test = [];
// Test speed using an array of 100 items
var start_time = Date.now();
for ( var i = 0; i < 100; i += 1) {
    test[i] = Math.floor(Math.random() * 10000);
}
bubblesort(test, compare);
var items = 1000 * (Date.now() - start_time);
console.log("Number of items to sort: " + items);
// Build real test array
test = [];
for ( i = 0; i < items; i += 1) {
    test[i] = Math.floor(Math.random() * 10000);
}

start_time = Date.now();
// Using slice to make sure we use a copy
bubblesort(test.slice(0), compare);
console.log("Time spent using userland bubblesort: " + (Date.now() - start_time) + " ms");

start_time = Date.now();
trivial_quicksort(test.slice(0), compare);
console.log("Time spent using userland quicksort: " + (Date.now() - start_time) + " ms");

start_time = Date.now();
Array.sort(test.slice(0), compare);
console.log("Time spent using built in Array.sort: " + (Date.now() - start_time) + " ms");

// Approximate results during my tests (5000 items):
// Bubblesort ~ 2800 ms
// Quicksort  ~   23 ms
// Array.sort ~    6 ms
