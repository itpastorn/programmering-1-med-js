// Function to check if a number is a prime number
// Tip! Test run in Scratchpad in Firefox (Shift + F4)

// Move between checked in versions to see how the function evolves


// Iteration 4 - usable
// Caching Math.sqrt()
// And converts to integer to help the JIT compilers
function isPrime(num) {
    if (num !== Math.floor(num) || num < 1) {
        throw new Error("Argument num must be a positive integer");
    }
    if (num % 2 === 0) {
        return false;
    }
    // Does not run if divisible by 2
    var stop = Math.floor(Math.sqrt(num)); // cache
    for ( var i = 3; i < stop; i += 2) {
        if (num % i === 0) {
            return false;
            // implicit break
        }
    }
    return true;
}

// Explaining this version
/*
 * For 50 % of all numbers - the even ones - it will be O(1)
 * For most numbers it will break quickly, on 3, 5, 7, etc
 * When reaching Math.sqrt(num) it will stop, since continuing would
 * only mean doing redundant double checks
 * Math.sqrt is calculated once BEFORE the loop O(1) and not in every iteration O(n)
 *
 * There are still some redundant checks (9, 15, 21, etc)
 */

//Shuld say "false and true"
alert(String(isPrime(779)) + " and " + String(isPrime(787)));
