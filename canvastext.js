"use strict";

var draw = startCanvas("maincanvas");

function sayHi() {
    // Rå canvas i webbläsaren
    var ctx = draw.raw();
    // ctx = Canvas context
    ctx.fillStyle = "black";
    ctx.font = "100px sans-serif";
    ctx.textAlign = "start";
    ctx.fillText("Hejsan", 100, 200);
    setTimeout(sayHi, 2000);
}
setTimeout(sayHi, 1000);

setInterval( function() {
    draw.clearRect(90, 90, 500, 200);
}, 2000);

