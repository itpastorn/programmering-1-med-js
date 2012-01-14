/* jshint forin:true, eqnull:true, noarg:true, noempty:true, eqeqeq:true, strict:true,
   undef:true, curly:true, browser:true, devel:true, es5:true, indent:4, maxerr:50, white:true */

"use strict"; // JSHint kommer klaga "Use the function form". Tills vidare är detta dock OK.

var draw = startCanvas("maincanvas");

// Japans flagga
draw.circle(400, 225, 100, "red");

for (var i = 0; i < 100; i += 1) {
    draw.circle(draw.randomX(), draw.randomY(), draw.randomInteger(100), draw.randomColor());
}

draw.clearScreen();

function drawRandomCircleTimeout() {
    draw.circle(draw.randomX(), draw.randomY(), draw.randomInteger(100), draw.randomColor());
    if ( drawRandomCircle.count < 100 ) {
        drawRandomCircle.count += 1;
        window.setTimeout(drawRandomCircleTimeout, 250);
    }
}
drawRandomCircleTimeout.count = 0;
// drawRandomCircleTimeout();

function drawRandomCircle() {
    draw.circle(draw.randomX(), draw.randomY(), draw.randomInteger(100), draw.randomColor());
}
// draw.canvas().onclick = drawRandomCircle;
//TODO: Use lib events instead of DOM 0

function drawPositionedCircle(evt) {
	// Must get position relative to the canvas...
	// Ugly and non X-browser
    draw.circle(evt.pageX - draw.canvasX(), evt.pageY - draw.canvasY(), 10 + draw.randomInteger(50), draw.randomColor(), true);
}

draw.canvas().onclick = drawPositionedCircle;
//TODO: Use lib events instead of DOM 0


