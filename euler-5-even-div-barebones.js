/**
 * Find the smallest number evenly divisible by all numbers up to n (barebones)
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

    // Find all primes up to n
    var primes = sieve(n + 1), len = primes.length, answer = 1;
    
    // For every prime multiply the number of times it must be used
    for ( var i = 0; i < len; i += 1 ) {
        answer *= Math.pow(primes[i], Math.floor(Math.log(n)/Math.log(primes[i])));
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

