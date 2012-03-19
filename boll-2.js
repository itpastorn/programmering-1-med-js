var draw = startCanvas("maincanvas");

// field för bollen att studsa inom
var field = {
    x : 100,
    y : 50,
    width : 600,
    height : 350
};

// Lite annat sätt att skriva än i paint
draw.strokeRect(field.x, field.y, field.width, field.height, "maroon");

// Värden för en cirkel = bollen
// Den startar i mitten
var ball = {
    x : field.x + field.width / 2,
    y : field.y + field.height / 2,
    r : 10,
    totspeed : 10,
    isMoving : false
};
// ball2 = ball; // Inte en kopia, utan två namn på samma objekt
var balls = [];  // Tom array
balls[0] = Object.create(ball);
balls[1] = Object.create(ball);
// ball är *prototyp* till varje objekt i arrayen balls
// https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Object/create

for ( var i = 0; i < balls.length; i += 1 ) {
    balls[i].color = "hsl(" + Math.random() * 360 + ", 50%, 50%)";
    // Vinkeln är mellan 0 och 2 pi
    balls[i].angle = Math.random() * Math.PI * 2;
    // Räknas om när farten ändras
    balls[i].xSpeed = Math.cos(balls[i].angle) * ball.totspeed;
    balls[i].ySpeed = Math.sin(balls[i].angle) * ball.totspeed;
}
// Alternative: Set number of desired balls and move creation inside the loop...
// Another way to create new ball
balls.push(Object.create(ball, {
    color : { value : "hsl(" + Math.random() * 360 + ", 50%, 50%)" },
    angle : { value : Math.random() * Math.PI * 2 }
}));
// color and angle are NOT writable, enumerable or configurable
balls[i].xSpeed = Math.cos(balls[i].angle) * balls[i].totspeed;
balls[i].ySpeed = Math.sin(balls[i].angle) * balls[i].totspeed;

function moveBall() {
	// Rensa först spelplanen = radera bollen i dess förra position
    draw.clearRect(field.x, field.y, field.width, field.height);
    for ( var i = 0; i < balls.length; i += 1 ) {
        // Kollisionsdetektera
        if ( balls[i].x < (field.x + balls[i].r / 2) ) {
            balls[i].xSpeed = Math.abs(balls[i].xSpeed);
        } else if ( balls[i].x > (field.x + field.width - balls[i].r / 2) ) {
            balls[i].xSpeed = -Math.abs(balls[i].xSpeed);
        }
        if ( balls[i].y < (field.y + balls[i].r / 2) ) {
            balls[i].ySpeed = Math.abs(balls[i].ySpeed);
        } else if ( balls[i].y > (field.y + field.height - balls[i].r / 2) ) {
            balls[i].ySpeed = -Math.abs(balls[i].ySpeed);
        }
        // Räkna ut ny placering av bollen
        balls[i].x += balls[i].xSpeed;
        balls[i].y += balls[i].ySpeed;
        draw.circle(balls[i].x, balls[i].y, balls[i].r, balls[i].color, false);
    }
    // console.log(ball.angle * 180 / Math.PI);
    if ( ball.isMoving ) {
    	// Om man tar bort denna flyttar bollen ett steg per klick
        setTimeout(moveBall, 20);
    }
}
moveBall();

// Start
document.getElementById("start").onclick = function () {
    if ( ball.isMoving ) {
        return false;
    }
    ball.isMoving = true;
    moveBall();
    this.setAttribute("disabled", "disabled");
    document.getElementById("stop").removeAttribute("disabled");
};

document.getElementById("stop").setAttribute("disabled", "disabled");
// Stopp
document.getElementById("stop").onclick = function () {
    ball.isMoving = false;
    document.getElementById("start").removeAttribute("disabled");
    this.setAttribute("disabled", "disabled");
};

// Lägg till clip för att förhindra bollen att ritas utanför ytan
// draw.raw().beginPath();
// draw.raw().rect(field.x, field.y, field.width, field.height);
// draw.raw().clip();

// Uppgift 1: Ändra fart med knapp - öka/minska
//   - Ändra totspeed på prototypen med multiplikation/division
//   - Ändra x och ySpeed på varje boll

// Uppgift 2: En boll till varje gång man trycker på knappen


