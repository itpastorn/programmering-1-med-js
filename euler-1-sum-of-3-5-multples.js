// Problem at http://projecteuler.net/problem=1

/*
If we list all the natural numbers below 10 that are multiples of 3 or 5, we get 3, 5, 6 and 9. The sum of these multiples is 23.

Find the sum of all the multiples of 3 or 5 below 1000.
For each solution we are adding a variable that counts the number of iterations

Solution runs in Scratchpad (Firefox Shift + F4)
*/

// Simple solution
var summa1 = 0, iterations1 = 0;
for (var i = 3; i < 1000; i += 1) {
	iterations1 += 1;
    if (i % 3 === 0 || i % 5 === 0) {
        summa1 += i;
    }
}

alert("Sum is " + summa1 + " - Solved using " + iterations1 + " iterations");

// Faster solution
var summa2 = 0, iterations2 = 0;
for (var j = 3; j < 1000; j += 3) {
    summa2 += j;
	iterations2 += 1;
}
for (j = 5; j < 1000; j += 5) {
    if (j % 3 !== 0) {
        summa2 += j;
    }
	iterations2 += 1;
}

alert("Sum is " + summa2 + " - Solved using " + iterations2 + " iterations");

// Even faster solution - fewer iterations and less math
var summa3 = 0, iterations3 = 0;
for (var k = 3; k < 1000; k += 3) {
    summa3 += k;
	iterations3 += 1;
}
for (k = 5; k < 1000; k += 15) {
    summa3 += k;
	iterations3 += 1;
}
for (k = 10; k < 1000; k += 15) {
    summa3 += k;
	iterations3 += 1;
}

alert("Sum is " + summa3 + " - Solved using " + iterations3 + " iterations");
