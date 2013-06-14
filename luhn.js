// http://en.wikipedia.org/wiki/Luhn_algorithm

/**
 * The Luhn algorithm - compute the last character
 *
 * (Swedish): Luhn algoritmen används för personnummer,
 * kreditkortsnummer, kontonummer, etc
 *
 * @param mixed Integer or string of integers to check
 * @return Number
 */
function luhncalculate(cstring) {
    "use strict";
    // convert to string type
    cstring += "";
    // Check for no string characters
    // Allow but remove space and minus sign
    cstring = cstring.replace(/ /g, "")
    cstring = cstring.replace(/-/g, "");
    if ( !/^[0-9]+$/.test(cstring) ) {
        return undefined;
    }
    var sum = 0;
    // Skip last digit = the control character, go from right to left
    for ( var i = 1, len = cstring.length; i <= len; i += 1 ) {
        var double = (i % 2) + 1;
        // Negative first parameter = start at the end (right)
        var digits = +cstring.substr(-i, 1) * double,
            digit1 = digits % 10,
            digit2 = Math.floor(digits / 10);
        sum += digit1 + digit2;
    }
    sum *= 9;
    // Convert sum to string
    sum += "";
    // And last digit back to number
    return +sum.substr(-1, 1);
}

/**
 * The Luhn algorithm check
 *
 * Function to check credit cards, social security and OCR numbers, etc
 * @param mixed Integer or string of integers to check
 * @return boolean
 */
function luhnvalidate(cstring) {
    "use strict";
    cstring += ""; // type cast as string
    var len = cstring.length;
    // Note difference between substring and substr
    // Also note that luhncalculate returns a Number or undefined
    return luhncalculate(cstring.substring(0, len - 1)) === +cstring.substr(-1, 1);
}

// OO rewrite, static methods only
var luhn = {
    sanitize : function(cstring) {
       "use strict";
        cstring += "";
        cstring = cstring.replace(/ /g, "")
        cstring = cstring.replace(/-/g, "");
        if ( !/^[0-9]+$/.test(cstring) ) {
            return undefined;
        }
        return cstring;
    },
    calculate : function (cstring) {
       "use strict";
        cstring = this.sanitize(cstring);
        if ( cstring === undefined ) {
            return undefined;
        }
        var sum = 0;
        for ( var i = 1, len = cstring.length; i <= len; i += 1 ) {
            var double = (i % 2) + 1;
            var digits = +cstring.substr(-i, 1) * double,
                digit1 = digits % 10,
                digit2 = Math.floor(digits / 10);
            sum += digit1 + digit2;
        }
        sum *= 9;
        sum += "";
        return +sum.substr(-1, 1);
    },
    validate : function (cstring) {
       "use strict";
        cstring += ""; // type cast as string
        var len = cstring.length;
        return this.calculate(cstring.substring(0, len - 1)) === +cstring.substr(-1, 1);
    }
}

