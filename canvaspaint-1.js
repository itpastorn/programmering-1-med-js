var draw = startCanvas("maincanvas");

function paint(evt) {
	// Must get position relative to the canvas...
	// Ugly and non X-browser
    draw.circle(evt.pageX - 
    draw.canvasX(), evt.pageY - draw.canvasY(), 10);
}

// Används inte längre
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
draw.setCurColor("teal").strokeRect(100, 50, 600, 350).
setCurColor("white");
//Osynlig till en början

// Kolla: Kan jag använda samma ruta för att rita för ögat?
draw.raw().beginPath();
draw.raw().rect(100, 50, 600, 350);
draw.raw().clip();
// clip() är smart att använda när man vill ha vissa
// delar av ytan intakt

// Börja rita
//TODO: Use lib events instead of DOM 0

draw.canvas().onmousedown = function () {
    // draw.canvas().onmousemove = paint_within_area;
    draw.canvas().onmousemove = paint; // OK med clip
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

// Uppgift 1: En färg till

// Uppgift 2: Hårdkoda en annan "penselbredd"

// Uppgift 3: Knappar som styr penselbredd via global variabel

