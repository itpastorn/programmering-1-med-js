// http://projecteuler.net/problem=2

/*
Each new term in the Fibonacci sequence is generated by adding the previous two terms. By starting with 1 and 2, the first 10 terms will be:

1, 2, 3, 5, 8, 13, 21, 34, 55, 89, ...

By considering the terms in the Fibonacci sequence whose values do not exceed four million, find the sum of the even-valued terms.

Normally the Fibonacci sequence starts 1, 1, 2, but for this assignment there is only one "1": 1, 2, 3, 5...
Run in Scratchapd in Firefox (Shift+ F4)
*/

// Solution 1 - brute force
var sum = 0, last = 1, current = 1, next, iterations = 0;
while ( current < 4000000 ) {
    if ( current % 2 === 0 ) {
        sum += current;
    }
    next = current + last;
    last = current;
    current = next;
    iterations += 1;
}

alert("The sum is " + sum + ". Iterations: " + iterations);

//Solution 1 - brute force + fancy trick
var sum = 0, last = 1, current = 1, iterations = 0;
while ( current < 4000000 ) {
    if ( current % 2 === 0 ) {
        sum += current;
    }
    // Fancy trick in ES 5 - "destructuring assignment"
    [last, current] = [current, current + last];
    iterations += 1;
}

alert("The sum is " + sum + ". Iterations: " + iterations);

// Fibonacci sequences will always be odd, odd, even - odd, odd, even...
// That means we can move more quickly through the loop
var sum = 0, last = 1, current = 2, iterations = 0;
while ( current < 4000000 ) {
    sum += current;
    [last, current] = [current, current + last];
    [last, current] = [current, current + last];
    [last, current] = [current, current + last];
    iterations += 1;
}

alert("The sum is " + sum + ". Iterations: " + iterations);

// Even more optimized math
var sum = 0, last = 1, current = 2, iterations = 0;
while ( current < 4000000 ) {
    sum += current;
    [last, current] = [last + current * 2, last * 2 + current * 3];
    iterations += 1;
}

alert("The sum is " + sum + ". Iterations: " + iterations);

// So far we have only improved the ALGORITHM, now let's look at the ARCHITECTURE
// Lets de-couple the Fibonacci-generation from the usage
// That means we can re-use it!
// TODO: Protect these properties from outside tampering
var fibgen = {
    last: 1,
    current: 1
};
fibgen.getCurrent = function() {
    return fibgen.current;
};
fibgen.step = function (n) {
    // Steps forward n times
    if ( typeof n === "undefined") {
        n = 1;
    } else if ( typeof n !== "number" || n !== Math.abs(Math.floor(n)) ) {
        throw Error("Argument n to fibgen.step() must be a positive integer or undefined");
	}
	for (var i = 0; i < n; i += 1) {
        [fibgen.last, fibgen.current] = [fibgen.current, fibgen.current + fibgen.last];
	}
	return fibgen.current;
};
fibgen.reset = function() {
    fibgen.last = 1;
    fibgen.current = 1;
}

// Using the generator
var sum = 0, iterations = 0;
fibgen.step(); // Start at 2
do {
    sum += fibgen.getCurrent();
    iterations += 1;
} while  ( fibgen.step(3) < 4000000 );

alert("The sum is " + sum + ". Iterations: " + iterations);

