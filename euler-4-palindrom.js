// Problem 4 at Project Euler
// http://projecteuler.net/problem=4
// A palindromic number reads the same both ways.
// The largest palindrome made from the product of two 2-digit numbers is 9009 = 91 × 99.
// Find the largest palindrome made from the product of two 3-digit numbers.


// Brute force

function isPalindrome(string) {
	var len = string.length;
    for (var i = 0, max = len/2; i < max; i += 1) {
        // console.log(string[i] + " " + string[len-i-1]);
        if ( string[i] !== string[len-i-1] ) {
            return false;
        }
    }
    return true;
}

// Alternative check
// TODO Measure if it is more effective
function isPalindrome2(string) {
    return string.split("").reverse("").join("") === string;
}

// alert(isPalindrome(String(2123458543212)));

var f1 = 0, f2 = 0;
var candidate = 0, iterations = 0;

// We start high and count down as that probably means we will find the solutions the fastest
// 2nd condition means no higher solution is possible
for (var i = 999; i > 99 && candidate < i * 999; i -= 1) {
	// 2nd loops stops at i since we do not need to double check i and j combinations
    for (var j = 999; j >= i; j -= 1) {
         iterations += 1;
         var product = i * j;
         // alert(product + " i " + i + " j " + j);
         if ( product > candidate) {
             if (isPalindrome(String(product))) {
                 candidate = product;
                 var f1 = i;
                 var f2 = j;
             }
         }
    }
}
alert(candidate + " is the product of " + f1 + " and " + f2 + 
" - Iterations: " + iterations);

// Without 2nd condition
// 906609 is the product of 913 and 993 - Iterations: 405450
// With 2nd condition
// 906609 is the product of 913 and 993 - Iterations: 4371 or 4278??? Que?

// Trying bigger numbers...
// 999000000999 is the product of 999001 and 999999 - Iterations: 499500
// Practical limit at 7 digit factors = almost 10 million iterations
// 99956644665999 is the product of 9997647 and 9998017 - Iterations: 9398280

// TODO Check if palindromic numbers with even numbers always are divisible by 11 and improve algorithm
// If so we can start at 990 (smallest number below 1000) that is divisible by 11) and step down by 11
// for (var i = 990; i > 99 && candidate < i * 999; i -= 11) {
// This solves the problem in 388 iterations

// This code would imply that it is
proven = true;
for ( var i = 10; i < 10000000; i++ ) {
    var p = i + "" + String(i).split("").reverse("").join("");
    p = parseInt(p, 10);
    if ( p % 11 !== 0 ) {
        proven = false;
        alert(p + " not divisible by 11");
    }
}
// alert(proven);
// true
