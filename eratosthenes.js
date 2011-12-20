// Eratosthenes sieve
function sieve(max) {
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
