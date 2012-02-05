/* jshint forin:true, eqnull:true, noarg:true, noempty:true, eqeqeq:true, strict:true,
   undef:true, curly:true, browser:true, devel:true, es5:true, indent:4, maxerr:50, white:true */

/**
 * A code library for teaching JavaScript with Canvas
 * 
 * @author Lars Gunther <gunther@keryx.se>
 * @version pre-alpha
 * @licence MIT
 * @todo Capability detection
 * @todo Documentation
 * @todo Testing
 * @todo Hundreds of things!
 */

// Capability detect strict mode
var hasstrict = (function() {
    "use strict";
    return !this;
}());

// Capability detect Canvas

// Capability detect Element.classlist

// Capability detect qurySelectorAll

// Capability detect DOM 2 events

// Capability detect Object.create

// Capability detect console

// TODO more capability detection

/**
 * Initiating a canvasobject and returning all helper functions
 * 
 * Using a pattern similar to the module pattern, but do not want a singleton
 * 
 * @param string id The id in HTML for the canvas-object
 * @returns object An object with that should be assigned to a variable
 * @usage var draw = startCanvas(id)
 */
function startCanvas(id) {
    "use strict";
    var canvas      = document.getElementById(id),
        context2D   = canvas.getContext('2d'),
        totalWidth  = canvas.width,
        totalHeight = canvas.height,
        colors      = ["red", "pink", "green", "lime", "orange", "yellow", "maroon", "silver", "grey", "black", "blue", "navy", "lightblue"],
        curColor    = "black";

    // Find position of canvas relative to the page (thanks PPK)
    // TODO: Recalculate on window resize and fullscreen toggle
    var canvasLeft = 0, canvasTop = 0, obj = canvas;
    do {
        canvasLeft += obj.offsetLeft;
        canvasTop  += obj.offsetTop;
    } while ((obj = obj.offsetParent)); // Dubbla parenteser för att markera att det är en tilldelning

    // TODO: Switch from module pattern to revealing module pattern
    return {
        // Allows for real access to the context object
        raw : function () {
            return context2D;
        },
        // Allows for real access to the canvas DOM-object
        canvas : function () {
            return canvas;
        },
        // Returns this to be chainable
        setCurColor : function (color) {
            // TODO check for acceptable value of parameter color
            curColor = color;
            // TODO: Investigate if I want this behavior on the raw object...
            context2D.fillStyle   = color;
            context2D.strokeStyle = color;
            return this;
        },
        getCurColor : function () {
            return curColor;
        },
        circle : function (x, y, r, color, log) {
            context2D.save();
            context2D.fillStyle = color || this.getCurColor();
            context2D.beginPath();
            context2D.arc(x, y, r, 0, Math.PI * 2, true);
            context2D.closePath();
            context2D.fill();
            context2D.restore();
            if ( log ) {
                console.log("Draw " + color + " colored circle at " + x + "/" + y + ", radius was " + r);

            }
            return this;
        },
        fillRect : function (x, y, width, height, color, log) {
            context2D.save();
            context2D.fillStyle = color || this.getCurColor();
            context2D.fillRect(x, y, width, height);
            context2D.restore();
            if ( log ) {
                console.log("Draw " + color + " colored rectangle at " + x + "/" + y +
                    ", width/height was " + width + "/" + height);
            }
            return this;
        },
        strokeRect : function (x, y, width, height, color, log) {
            context2D.save();
            context2D.strokeStyle = color || this.getCurColor();
            context2D.strokeRect(x, y, width, height);
            context2D.restore();
            if ( log ) {
                console.log("Draw " + color + " stroke.colored rectangle at " + x + "/" + y +
                    ", width/height was " + width + "/" + height);
            }
            return this;
        },
        text : function(text, x, y, color, size) {
            context2D.save();
            context2D.font = size + "px sans-serif";
            context2D.fillStyle = color || this.getCurColor();
            context2D.fillText(text, x, y);
            context2D.restore();
            return this;
        },
        randomColor : function () {
            // Make abstract "random alternative" ?
            return colors[Math.floor(Math.random() * colors.length)];
        },
        randomInteger : function (max) {
          return Math.floor(Math.random() * (max + 1));
        },
        randomX : function () {
          return this.randomInteger(totalWidth);
        },
        randomY : function () {
          return this.randomInteger(totalHeight);
        },
        clearScreen : function () {
            context2D.clearRect(0, 0, totalWidth, totalHeight);
            return this;
        },
        // Position of canvas relative to the page
        canvasX : function () {
            return canvasLeft;
        },
        canvasY : function () {
            return canvasTop;
        },
        toggleFullScreen : function () {
            // TODO
            return this;
        },

        // TODO: X-browser events...
        addEvent : {
            // These events may be applied to the canvas as a whole only, not DOM-elements in the HTML
            mouse: function () {
                // Mouse events (normalized...)
              // Set mouse.point.x
              // Set mouse.point.y
            },
            // These events may be applied to the canvas as a whole only, not DOM-elements in the HTML
            touch :function () {
                // Touch events (normalized...)
            },
            // Attaches to the window object
            keyboard : function () {
                // Key events (normalized...)
            }
        },
        removeEvent : {
            // ...
        }

        // TODO: Hit testing for clicks/touches...

        // TODO: Collission detection

        // TODO: Animation

        // TODO: Chaining should break if function fails its job

    };
}

// TODO: seal + approved way of adding new properties and methods
// Anteckning - detta ska gå - fast på ett skrare sätt
//draw.saveAsPNG = function () {
    // http://www.nihilogic.dk/labs/canvas2image/
    // this här syftar på det returnerade objektet
//};

// Check out http://libcanvas.github.com/
// + https://github.com/jeremyckahn/rekapi/blob/master/README.md ESPECIALLY "actor"
// Tutorial http://projects.joshy.org/presentations/HTML/CanvasDeepDive/presentation.html

// Denna liknar min idé!
// http://lab.aerotwist.com/canvas/fireworks/

/*
 * Lite anteckningar
draw.raw().save();
draw.raw().fillStyle = "lime";
draw.raw().shadowColor = "black";
draw.raw().shadowBlur = 10;
draw.raw().beginPath();
draw.raw().arc(350, 200, 10, 0, Math.PI * 2, true);
draw.raw().closePath();
draw.raw().fill();
draw.raw().restore();


isPointInPath()

 */

