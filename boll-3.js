(function() {
    "use strict";
    var draw = startCanvas("maincanvas");
    
    // Number of balls
    function infoNumBalls() {
        var ctx = draw.raw();
        ctx.save();
        ctx.clearRect(5, 410, 220, 40);
        ctx.font      = "20px sans-serif";
        ctx.textAlign = "start";
        var num = balls.length;
        ctx.fillText("Antal bollar: " + num, 10, 440);
        ctx.restore();
    }

    // Speed
    function infoSpeed() {
        var ctx = draw.raw();
        ctx.save();
        ctx.clearRect(600, 410, 220, 40);
        ctx.font      = "20px sans-serif";
        ctx.textAlign = "end";
        var spd = Math.round(ball.totspeed * 1000) / 1000;
        ctx.fillText("Fart: " + spd, 790, 440);
        ctx.restore();
    }

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
    var ball = Object.create({}, {
        x : { value : field.x + field.width / 2, writable : true  },
        y : { value : field.y + field.height / 2, writable : true  },
        r : { value : 10 },
        isMoving : { value : false, writable : true },
        totspeed : { value : 7, writable : true }
    });

    function changeSpeed(increase) {
        var oldspeed = ball.totspeed;
        if ( oldspeed > 50 && increase ) {
            console.log("Max speed reached");
            return oldspeed;
        }
        if ( increase ) {
            ball.totspeed *= 1.1;
        } else {
            ball.totspeed /= 1.1;
        }
        for ( var i = 0, len = balls.length; i < len; i += 1 ) {
            balls[i].xSpeed *= ball.totspeed / oldspeed;
            balls[i].ySpeed *= ball.totspeed / oldspeed;
        }
        return ball.totspeed;
    }

    var balls = [];  // Tom array

    function spawnBall(log) {
        balls.push(Object.create(ball, {
            color : { value : "hsl(" + Math.random() * 360 + ", 50%, " + (20 + Math.random() * 60) + "%)" },
            angle : { value : Math.random() * Math.PI * 2 }
            // color and angle are NOT writable, enumerable or configurable
        }));
        var i = balls.length - 1;
        balls[i].xSpeed = Math.cos(balls[i].angle) * ball.totspeed;
        balls[i].ySpeed = Math.sin(balls[i].angle) * ball.totspeed;
        if ( log ) {
            console.log("Antal bollar: " + (i + 1));
        }
    }

    // Toggle if balls are cleared or are painting lines
    var clear = true;
    function moveBall() {
	    // Rensa först spelplanen = radera bollen i dess förra position
	    if ( clear ) {
	        draw.clearRect(field.x, field.y, field.width, field.height);
	    }
        for ( var i = 0, len = balls.length; i < len; i += 1 ) {
            if ( ball.isMoving ) {
                // Räkna ut ny placering av bollen
                balls[i].x += balls[i].xSpeed;
                balls[i].y += balls[i].ySpeed;
                // Kollisionsdetektera
                if ( (balls[i].x) < (field.x + balls[i].r ) ) {
                    balls[i].x -= balls[i].xSpeed;
                    balls[i].xSpeed = Math.abs(balls[i].xSpeed);
                } else if ( (balls[i].x) > (field.x + field.width - balls[i].r ) ) {
                    balls[i].x -= balls[i].xSpeed;
                    balls[i].xSpeed = -Math.abs(balls[i].xSpeed);
                }
                if ( (balls[i].y) < (field.y + balls[i].r ) ) {
                    balls[i].y -= balls[i].ySpeed;
                    balls[i].ySpeed = Math.abs(balls[i].ySpeed);
                } else if ( (balls[i].y) > (field.y + field.height - balls[i].r ) ) {
                    balls[i].y -= balls[i].ySpeed;
                    balls[i].ySpeed = -Math.abs(balls[i].ySpeed);
                }
            }
            draw.circle(balls[i].x, balls[i].y, balls[i].r, balls[i].color, false);
        }
        if ( ball.isMoving ) {
        	// Om man tar bort denna flyttar bollen ett steg per klick
            setTimeout(moveBall, 20);
        }
    }
    moveBall();
    infoSpeed();

    // Start
    document.getElementById("start").onclick = function () {
        if ( ball.isMoving ) {
            spawnBall(true);
            infoNumBalls();
            return true;
        }
        if ( balls.length === 0 ) {
            spawnBall(true);
            infoNumBalls();
        }
        ball.isMoving = true;
        moveBall();
        document.getElementById("stop").removeAttribute("disabled");
    };

    document.getElementById("stop").setAttribute("disabled", "disabled");
    // Stopp
    document.getElementById("stop").onclick = function () {
        ball.isMoving = false;
        document.getElementById("start").removeAttribute("disabled");
        this.setAttribute("disabled", "disabled");
    };

    document.getElementById("toggle").onclick = function () {
        clear = !clear;
    };

    document.getElementById("inc").onclick = function () {
        changeSpeed(true);
        infoSpeed();
    };

    document.getElementById("dec").onclick = function () {
        changeSpeed(false);
        infoSpeed();
    };

    document.getElementById("rm").onclick = function () {
        balls.pop();
        if ( clear && !ball.isMoving ) {
            moveBall();
        }
        infoNumBalls();
    };

    if ( window.location.hash ) {
        var startballs = +window.location.hash.substring(1);
        if ( startballs > 200 ) {
            console.log("Max 200 startbollar");
            startballs = 200;
        }
        for (var i = 0; i < startballs; i += 1 ) {
            spawnBall();
        }
        infoNumBalls();
    }
}());
