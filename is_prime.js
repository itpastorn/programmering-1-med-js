// Function to check if a number is a prime number
// Tip! Test run in Scratchpad in Firefox (Shift + F4)

// Move between checked in versions to see how the function evolves

// Iteration 0 - insanely stupid
// Tries to divide by every number
function isPrime(num) {
    if (num !== Math.floor(num) || num < 1) {
        throw new Error("Argument num must be a positive integer");
    }
    var is_prime = true;
    for ( var i = 2; i < num; i += 1 ) {
        if (num % i === 0) {
            is_prime = false;
        }
    }
    return is_prime;
}

//Shuld say "false and true"
alert(String(isPrime(779)) + " and " + String(isPrime(787)));
