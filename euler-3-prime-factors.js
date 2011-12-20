/**
 * Largest prime factor
 *
 * http://projecteuler.net/problem=3
 * The prime factors of 13195 are 5, 7, 13 and 29.
 * What is the largest prime factor of the number 600851475143 ?
 */

var i = 6, n = 600851475143, iterations = 0, factor;
var to_check = n;
while (n > (i - 1)) {
    // All large primes are either (6 * n) + 1 or (6 * n) - 1
    factor = i - 1;
    iterations += 1;
    while (n % factor == 0) {
        n = n / factor;
        iterations += 1;
    }

    factor = i + 1;

    if (n == factor) {
        break;
    };
    while (n % factor == 0) {
        n = n / factor;
        iterations += 1;
    }
    i += 6;
}
alert(n + " is the largest prime factor of " +
      to_check + " . Iterations: " + iterations);

// 6857 is the largest prime factor of 600851475143 . Iterations: 1145
// And no pointless isPrime checking!

throw("DO NOT RUN THIS CODE!");

// First attempt - brute force

function isPrime(num) {
    if (num !== Math.floor(num) || num <= 1) {
        return false;
    }
    if (num % 2 === 0) {
        return false;
    }
    // Does not run if divisible by 2
    var stop = Math.floor(Math.sqrt(num)); // cache
    for ( var i = 3; i <= stop; i += 2) {
        if (num % i === 0) {
            return false;
            // implicit break
        }
    }
    return true;
}

var to_check   = 600851475143;
var stop_check = Math.floor(to_check / 2);
var iterations = 0, solution_found = false;;
/*
if ( isPrime(to_check)) {
    throw new Error("Number to check is a prime number");
}
var candidate = to_check / 2;
if ( to_check % 2 === 0 && isPrime(candidate)) {
    solution_found = true;
} else {
    for ( var i = 3; i < stop_check; i += 2 ) {
        iterations += 1;
        if ( to_check % i === 0 ) {
            // we are testing not i but the other factor to break as early as possible
            candidate = to_check / i;
            if ( isPrime(candidate) ) {
                solution_found = true;
                break;
            }
        }
    }
}
if ( solution_found ) {
    alert(candidate + " is the largest prime factor of " + to_check + " . Iterations: " + iterations);
} else {
    alert("No solution found");
}
// 6857 is the largest prime factor of 600851475143 . Iterations: 43812999
*/


// Fewer - but VERY slow runs
// Involves closures and lookup chains...

// Change to incremental sieve of Eratosthenes

function primeGenerator() {
    // First 4 will be used separately
    // The rest will be used to generate bigger numbers
    var first_primes = [2, 3, 5, 7];
    var build_primes = [11, 13, 17, 19, 23, 29, 31, 37];
    // step is what prime number that has been generated
    // index is the position in the build_primes array
    var step = 0, index = 0;
    return function () {
        if ( step < 4 ) {
            step += 1;
            return first_primes[step];
        } else if (step < 12 ) {
            step += 1;
            return build_primes[step-5];
        } else {
            // Must generate next one
            do {
                var candidate = build_primes[index % 8] + 30 * (1 + Math.floor(index/8));
                index +=1;
            } while ( ! isPrime(candidate) );
            step +=1;
            return candidate;
        }
    };
}
primes = primeGenerator();

if ( isPrime(to_check)) {
    throw new Error("Number to check is a prime number");
}
var candidate;

do {
    iterations += 1;
    candidate = to_check / primes();
} while (! isPrime(candidate));

if ( solution_found ) {
    alert(candidate + " is the largest prime factor of " + to_check + " . Iterations: " + iterations);
} else {
    alert("No solution found");
}

