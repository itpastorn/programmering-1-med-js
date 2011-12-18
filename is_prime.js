// Function to check if a number is a prime number
// Tip! Test run in Scratchpad in Firefox (Shift + F4)

// Move between checked in versions to see how the function evolves


// Iteration 3 - barely usable
// Reduces redundant iterations
function isPrime(num) {
    if (num !== Math.floor(num) || num < 1) {
        throw new Error("Argument num must be a positive integer");
    }
    if (num % 2 === 0) {
        return false;
    }
    // Does not run if divisible by 2
    for ( var i = 3; i < Math.sqrt(num); i += 2) {
        if (num % i === 0) {
            return false;
            // implicit break
        }
    }
    return true;
}


//Shuld say "false and true"
alert(String(isPrime(779)) + " and " + String(isPrime(787)));
