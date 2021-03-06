// Eratosthenes sieve
/*
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
*/
// Eratosthenes sieve, improved, not memory effecient
// on dense arrays (JS arrays are sparse)
function sieve(max) {
    let D = [], primes = [1, 2];
    for (let q = 3; q < max; q += 2) {
        if (D[q]) {
            for (let i = 0, stop = D[q].length; i < stop; i += 1) {
                let p = D[q][i];
                if (D[2*p+q]) {
                    D[2*p+q].push(p);
                } else {
                    D[2*p+q]=[p];
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


// För demo
// https://stackoverflow.com/questions/951021/what-is-the-javascript-version-of-sleep
/*
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function demo() {
  console.log('Taking a break...');
  await sleep(2000);
  console.log('Two second later');
}

demo();
*/

