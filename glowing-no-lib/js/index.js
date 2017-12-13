// Omslut all kod med en
// self-executing (self invoking)
// anonymous function
(() => {
    'use strict';
    let canvas   = document.getElementById('glowcanvas');
    let context  = canvas.getContext('2d');

    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight - 10;
    // Scrollbars uppträder om hela höjden utnyttjas

    // startvärden första kurvan
    let firstX  = context.width * Math.random();
    let firstY  = context.height * Math.random();
    // Färg väljs ur "färghjul", första värdet utgår från detta
    let initHue = 0;

    /**
     * Funktionen som ritar linjerna
     *
     * @param curX Där kurvan ska börja = där den slutade sist
     * @param curX Där kurvan ska börja = där den slutade sist
     * @param hue Senast anvämda nyans (HSL)
     */
    function line(curX, curY, hue) {
        // Sparar "tillståndet" - onödigt här men god praxis
        context.save();
        // Påbörja en ny kurva
        context.beginPath();
        // Bredd mellan 5 och 15
        context.lineWidth = 5 + Math.random() * 10;
        // Gå till startpunkt i koordinatsystemet = där förra kurvan slutade
        context.moveTo(curX, curY);
        // Slumpa fram en ny slutpunkt
        curX = context.canvas.width * Math.random();
        curY = context.canvas.height * Math.random();
        // "Beställ" en kurva med slumpmässig böjning
        context.bezierCurveTo(context.canvas.width  * Math.random(),
                              context.canvas.height * Math.random(),
                              context.canvas.width  * Math.random(),
                              context.canvas.height * Math.random(),
                              curX, curY);

        // Gå ett slumpmässigt antal grader framåt i färghjulet
        hue += 10 * Math.random();
        context.strokeStyle = 'hsl(' + hue + ', 50%, 50%)';
        // Uppgift (längre fram) - flytta ut shadowColor och ShadowBlur
        // eftersom de aldrig ändras
        // Glödande kantlinje på kurvan
        context.shadowColor = 'white';
        context.shadowBlur  = 10;
        // Genomför själva ritandet
        context.stroke();
        // Återställ gamla tillståndet
        context.restore();
        // Rekursivt anrop = anropa sig själv
        setTimeout(() => { line(curX, curY, hue); }, 80);
    }
    // Första anropet av funktionen
    line(firstX, firstY, initHue);

    // Skapa en helsvart men mycket transparent "hinna" som läggs överst,
    // men gradvis flyttas bakåt
    function blank() {
        // Svart med 90 % genomskinlighet
        context.fillStyle = 'rgba(0, 0, 0, 0.1)';
        // Rektangel med fyllning
        context.fillRect(0, 0, context.canvas.width, context.canvas.height);
    }
    setInterval(blank, 100);
})();