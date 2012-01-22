/**
 * Find the smallest number evenly divisible by all numbers up to n
 *
 * Problem 5 at project Euler
 * http://projecteuler.net/problem=5
 *
 * The idea here is to get the logarithm for 20 that produces
 * 2^4 * 3^2 * 5 * 7 * 11 * 13 * 17 * 19
 *
 * @param number n A positive integer
 * @return number
 */
function even_div(n) {
    "use strict";
    // Special case 2 since modern JIT-JS can do bitwise operators really fast
    // but mostly for fun
    // How many times can the number be divided by 2
    // Otherwise in ES <=5 Math.floor(Math.log(n)/Math.log(2));
    // And in ES6: Math.floor(Math.log2(n));
    var test = n, pow2 = -1;
    do {
        pow2 += 1;
        test = test >> 1;
    } while ( test );
    // We are storing all multiplicators in an array to make things more explicit
    var multiplicator = [[2, pow2]];

    // Find all primes up to n
    var primes = sieve(n + 1), len = primes.length;
    
    // For every prime but 2 (special cased above) add it according to its logarithm
    for ( var i = 1; i < len; i += 1 ) {
        multiplicator.push([primes[i], Math.floor(Math.log(n)/Math.log(primes[i]))]);
    }
    console.log(multiplicator);
    
    // Looping through the array to produce the number
    var answer = 1;
    for ( i = 0, len = multiplicator.length; i < len; i += 1 ) {
        answer *= Math.pow(multiplicator[i][0], multiplicator[i][1]);
    }
    return answer;
}

console.log("Smallest number evenly divisible by all numbers up to 20 is " + even_div(20));
console.log("Smallest number evenly divisible by all numbers up to 30 is " + even_div(30));
// Biggest possible before answer goes exponential
console.log("Smallest number evenly divisible by all numbers up to 48 is " + even_div(48));

// Eratosthenes sieve
function sieve(max) {
    "use strict";
    var D = [], primes = [];
    for (var q = 2; q < max; q += 1) {
        if (D[q]) {
            for (var i = 0, stop = D[q].length; i < stop; i += 1) {
                var p = D[q][i];
                if (D[p+q]) {
                    D[p+q].push(p);
                } else {
                    D[p+q]=[p];
                }
            }
            delete D[q];
        } else {
            primes.push(q);
            if (q * q < max) {
                D[q*q] = [q];
            }
        }
    }
    return primes;
}

