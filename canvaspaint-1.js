var draw = startCanvas("maincanvas");

function paint(evt) {
	// Must get position relative to the canvas...
	// Ugly and non X-browser
    draw.circle(evt.pageX - draw.canvasX(), evt.pageY - draw.canvasY(), 10);
}

function paint_within_area(evt) {
    // Must get position relative to the canvas...
    // Ugly and non X-browser
    var x = evt.pageX - draw.canvasX();
    var y = evt.pageY - draw.canvasY();
    // Ej justerat i förhållande till cirkelns radie
    if ( x > 100 && x < 700 && y > 50 && y < 400) {
        draw.circle(x, y, 10);
    }
}

// Rita ruta som markerar ritytan
// Exempel på "chaining"
draw.setCurColor("teal").strokeRect(100, 50, 600, 350).setCurColor("white");
//Osynlig till en början


// Börja rita
draw.canvas().onmousedown = function () {
    draw.canvas().onmousemove = paint_within_area;
};

// Sluta rita
draw.canvas().onmouseup = function () {
    draw.canvas().onmousemove = null;
};

// Välja färg, bryter mot DRY
document.getElementById("black").onclick = function () {
    draw.setCurColor("black");
};

document.getElementById("white").onclick = function () {
    draw.setCurColor("white");
};

document.getElementById("green").onclick = function () {
    draw.setCurColor("green");
};

document.getElementById("red").onclick = function () {
    draw.setCurColor("red");
};

document.getElementById("blue").onclick = function () {
    draw.setCurColor("blue");
};

// Anteckning
draw.saveAsPNG = function () {
    // http://www.nihilogic.dk/labs/canvas2image/
	// this här syftar på det returnerade objektet
};
