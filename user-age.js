// Proof of concept
var age = "1966-07-21"; // Simulera innmatning
var div = 365.25 * 24 * 60 * 60 * 1000;

// var adate = new Date(age);
// var diff = (new Date().getTime() - adate.getTime());

var diff = Date.now() - Date.parse(age);
var years = Math.floor(diff/div);
var days = Math.floor((diff % div) * 365.25 / div);

console.log("Du är " + years + " år och " + days + " dagar gammal");

// Skottår på riktigt
var then = new Date(age);
var now  = new Date();
var thisYear = now.getFullYear();
var thatYear = then.getFullYear();

// Skottdagar
var adjust = 0;
// Senare än 29 februari innevarande skottår?
if ( thisYear % 4 === 0 && ( now.getMonth === 2 && now.getDate === 29 ) || 
     thisYear % 4 === 0 &&  now.getMonth > 2 ) {
    adjust += 1;
}
// Senare än 29 februari födelseåret som var ett skottår?
if ( thatYear % 4 === 0 && then.getMonth > 2 ) {
    adjust -= 1;
}

for ( var i = thatYear; i < thisYear; i += 1) {
    if ( i % 4 ) {
        adjust += 1;
    }
}

var div = 365 * 24 * 60 * 60 * 1000;
var diff = now.getTime() - then.getTime();
// Antal år
var years = Math.floor(diff / div);
// Antal dagar
var days = Math.floor(365 * ( (diff / div) - years ));
days -= adjust;
if (days < 0 ) {
    years -= 1;
    days = 365 + days;
}



 

