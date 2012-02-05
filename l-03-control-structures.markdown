# Att styra programflöde #

Att skapa algoritmer = att programmera

Testa angivna kodexempel i Scratchpad eller konsollen!

Läs [avsnittet "statements" på MDN](https://developer.mozilla.org/en/JavaScript/Guide/Statements)

# Tre grundläggande mönster #

 1. Förgrening (branching)
 2. Upprepning som loop (iteration)
 3. Upprepning via "anrop av sig själv" (recursion)

# Pseudokod #

Förgrening

    om såldaBiljetter < antalPlatser
        säg "Det finns plats kvar"
    annars
        säg "Alla platser upptagna"
     
Iteration

    låt antalBorstadeTänder vara 0
    så länge som antalBorstadeTänder < antalTänderIMunnen
        borstaNästaTand()
        öka antalBorstadeTänder med 1 (ett)

Rekursion

    funktionen sköljHår
        rikta dusch mot håret i några sekunder
        kontrollera om schampo finns kvar
        om schampo finns kvar: sköljHår
    sköljHår // Första sköljningen

OBS! Viktigt att rekursion och iteration inte blir oändlig!

# Villkor #

 * Ett uttryck som utvärderas till true eller false (truthy/falsy)
 * Skrivs inom parenteser

Exempel (kan inte testas eftersom variablerna inte finns):

    ( foo < bar )
    ( elem.hasClass("foo") )
    ( document.getElementById("bar") )
    ( expr1 && expr2 )

# if - else #

Absolut grundnivå = detta måste du kunna

Testa i Scratchpad

    var name = "Lars";
    if ( name === "Lars" ) {
        console.log("Du heter Lars");
    } else {
        console.log("Du heter något annat");
    }
    
    var age = 45; // variera denna
    if ( age > 40 ) {
        console.log("Du är en gammal gubbe/gumma!");
    } else if ( age > 30 ) {
        console.log("Du en vuxen i dina bästa år!");
    } else {
        console.log("Du är allt bra ung du!");
    }

(Jag som skriver detta är 45 och driver med mig själv.)

JavaScript har inte ordet "elseif" (utan mellanslag)

Referens:

 * [MDN if...else](https://developer.mozilla.org/en/JavaScript/Reference/Statements/if...else)

## Undvik oklarheter - använd alltid måsvingar ##

Detta funkar också om bara en enda sats ska utföras, men det är ett sätt att skriva som ofta skapar fel

    if ( age > 40 ) console.log("Du är en gammal gubbe/gumma!");
    else if ( age > 30 ) console.log("Du en vuxen i dina bästa år!");
    else console.log("Du är allt bra ung du!");

## den ternära operatorn ##

Överkurs

Syntax

    ( expr ) ? värde om sant : värde om falskt

Exempel - testa i Scratchpad

    var foo = 5; // variera
    var size = ( foo < 10 ) : "litet" : "stort";
    console.log("Variabeln foo rymmer ett " + size + " tal.");

Identisk funktionalitet som förklaring

    var foo = 5; // variera
    if ( foo < 10 ) {
        var size = "litet";
    } else {
        size = "stort";
    }
    console.log("Variabeln foo rymmer ett " + size + " tal.");

## Smart tilldelning med || (or) ##

Överkurs, men du ser ofta exemplet i befintlig kod

Operatorn || (eller) ger inte det boolska värdet om första operanden är "truthy" utan det exakta värdet av den operanden.
Om den första operanden är "falsy" ges den andra operanden.

    var foo = "hej";
    var bar = foo || "hejsan";
    console.log(bar);  // "hej"
    
    var foo = "";
    var bar = foo || "hejsan";
    console.log(bar);  // "hejsan"

# switch - case #

Bra att känna till, men inte helt grundläggande.

Switch betyder växel.

Om du har ett värde som kan förgrenas åt flera håll så är ofta switch bra.

Testa med Scratchpad:

    var score = 3; // variera mellan 1 och 5
    switch ( score ) {
    case 1:
        console.log("Dåligt");
        break;
    case 2:
        console.log("OK");
        break;
    case 3:
        console.log("Bra");
        break;
    case 4:
        console.log("Toppen");
        break;
    case 5:
        console.log("Helt enkelt bäst");
        break;
    default:
        console.log("Hoppsan - inte med på skalan!");
    }

Frågor:
 * Vad gör break?
 * Vad gör default?

Referens:

 * [MDN Switch](https://developer.mozilla.org/en/JavaScript/Reference/Statements/switch)

# while #

Absolut grundnivå

Bild (svg)

Syntax

    while ( expr ) {
        // do stuff
    }

Enkelt exempel. Testa i Scratchpad.

    // Räknar ut fakulteten för n dvs. 1 * 2 * 3 * ... * n
    // Variera åttan på raden nedanför - max är 170
    var fak = 1, cur = 2, n = 8;
    while ( cur <= n ) {
        fak *= cur;
        cur += 1;
    }
    console.log("Fakulteten av " + stop + " är " + fak);

Referens:

 * [MDN while](https://developer.mozilla.org/en/JavaScript/Reference/Statements/while)

## Exempel med while som bygger på att tilldelning har ett värde ##

Gå till [startsidan på Wikipeda](http://www.wikipedia.org/)

Skriv i Scratchpad

    // Hitta den div som kommer före alla språkens divvar
    var langdiv = document.getElementsByClassName("divTop10item")[0].previousElementSibling;
    // Så länge som du kan hoppa till nästa
    while ( langdiv = langdiv.nextElementSibling) {
        // Två steg ner finns namnet på språket
        console.log(langdiv.firstElementChild.firstElementChild.textContent);
    }

## Listig while ##

Exempel ner, som medvetet bryter mot regeln att inte använda ++ och --

Testa i Scratchpad

    var burkar = 100;
    while ( --burkar) {
        console.log("Det står " + burkar + " burkar Cola på hyllan.";
        console.log("Tag en burk, drick en slurk. Det står " + (burkar - 1)  + " burkar Cola på hyllan.";
        // parentes tekniskt  onödig, men förtydligar logiken
    }

Problemet med --:

 * Kommer den att börja skriva ut 100 eller 99 burkar?
 * Varför?
 * Medvetet det som avsågs?

# do - while #

Bra att känna till, men inte grundnivå

Syntax

    do {
        // something
    } while ( expr )

Liknar while, men körs alltid minst en gång

Referens:

 * [MDN do...while](https://developer.mozilla.org/en/JavaScript/Reference/Statements/do...while)

# for () #

Absolut grundnivå

Syntax

    for ( start; villkor; slut ) {
        // Gör något
    }

Exempel - testa i Scratchpad:

    for ( var i = 0; i < 10; i += 1 ) {
        console.log(i + " i kvadrat blir " + i * i);
    }

Variabeln kallas i av tradition, eftersom vi ägnar oss åt _iteration_

Referens:

 * [MDN for](https://developer.mozilla.org/en/JavaScript/Reference/Statements/for)

## Initiera två variabler - bra för prestanda ##

Om villkoret i mitten resulterar i en mer tidskrävande åtgärd, så kan man spara CPU-cykler genom att lagra svaret i en variabel.

Testa detta enkla scoutschiffer i scratchpad:

    var username  = "Lars"; // variera
    var cryptname = "";
    for (var i = 0, len = username.length; i < len; i += 1 ) {
        var nextcharcode = username.charCodeAt(i) + 1;
        cryptname += String.fromCharCode(nextcharcode);
    }
    console.log(username + " krypterat blir " + cryptname);

Ej optimerad loop, där längden räknas ut på nytt varje varv:

    for (var i = 0; i < username.length; i += 1 ) {}

Fråga: Hur dekrypterar du detta?

Referens:

 * [MDN charCodeAt](https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/String/charCodeAt)
 * [MDN fromCharCode](https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/String/fromCharCode)

## break i for loopar ##

Om du vill avbryta en for-loop i förtid.

Tänk dig att det finns en massa bollar som studsar, men om någon av dem går nedanför noll så är det game-over.

(Du kan inte testa detta exempel.)

    for ( var i = 0, antal = bollar.length; i += 0 ) {
        if ( bollar[i].positionY < 0 ) {
            gameOver =  true;
            break;
        }
        moveBall(bollar[i]);
    }

## labels med for-loopar

Överkurs

TODO

# for - in #

Överkurs

TODO

## hasOwnProperty #

Också överkurs, men nödvändigt komplement till for - in

TODO

# Array.forEach # 

Överkurs

TODO

# for of #

ECMASCript Harmony

TODO

# for each - in #

E4X non standard

TODO

