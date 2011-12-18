// Function to check if a number is a prime number
// Tip! Test run in Scratchpad in Firefox (Shift + F4)

// Move between checked in versions to see how the function evolves

// Iteration 2 - inefficient
// Removed checks at 4, 6, 8, 10, etc
function isPrime(num) {
    if (num !== Math.floor(num) || num < 1) {
        throw new Error("Argument num must be a positive integer");
    }
    var is_prime = true;
    if (num % 2 === 0) {
        is_prime = false;
    }
    for ( var i = 3; i < Math.sqrt(num); i += 2) {
        if (num % i === 0) {
            is_prime = false;
        }
    }
    return is_prime;
}


//Shuld say "false and true"
alert(String(isPrime(779)) + " and " + String(isPrime(787)));
