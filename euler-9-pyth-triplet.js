/*
 * This is a JavaScript Scratchpad.
 *
 * Enter some JavaScript, then Right Click or choose from the Execute Menu:
 * 1. Run to evaluate the selected text,
 * 2. Inspect to bring up an Object Inspector on the result, or,
 * 3. Display to insert the result in a comment after the selection.
 */

// Project Euler Problem 9
// Find largest possible c (approximation erring on the safe side)
var max_c = Math.floor(Math.sqrt(1000000));

// Find largest possible b
var max_b = max_c - 1;

// Find largest possible a
var max_a = max_c - 2;

// Count iterations it took to solve the problem
var i = 0;
// Brute force
solved = false;
outer:
for ( var a = 1; a < max_a; a +=1 ) {
    for ( var b = 1; b < max_b; b += 1 ) {
        i += 1;
        var c = Math.sqrt(a * a + b * b);
        if ( c > max_c ) {
            break;
        }
        if ( a + b + c === 1000 ) {
            solved = true;
            break outer;
        }
    }
}
if ( solved ) {
alert("The numbers are " + a + ", " + b + " and " + c + " and the product is " + a*b*c +
". It took " + i + " iterations to solve the problem");
} else {
    alert("Unsolved");
}