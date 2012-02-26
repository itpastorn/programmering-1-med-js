// Stuff to try in the scratchapd or console for my programming classes (in Swedish)
// Scratchpad i Firefox = Shift + F4
// Console i Firefox = CTRL + SHIFT + K
// Efter dubbla snedstreck är resten av raden en kommentar = hela dessa rader
/*
Detta är en kommentar som går över
flera rader
*/

/*
 * Att börja varje rad med en stjärna är också OK
 * 
 * Här följer 6 uppgifter som är till för att introducera programmering
 * och mer specifikt JavaScript
 */

// Uppgift a - en variant på Hello World
var name = prompt("Vad heter du?");
alert("Ditt namn är " + name.length + " tecken långt");


// Uppgift b - räkna ut någons ålder
var year = prompt("Vilket år är du född (4 siffror)?");
var age  = (new Date()).getFullYear() - year;
alert("Du fyller (eller fyllde) " + age + " år i år");


// Uppgift c - Hitta enskilda bokstäver (tecken) i någons namn
var name = prompt("Vad heter du?");
alert("Första bokstaven i ditt namn är " + name[0]);
alert("Sista bokstaven i ditt namn är " + name[name.length - 1]);


// Uppgift d - introduktion av konsollen
// Konsollen är mindre störande än alert
var the_king = "Carl XVI Gustaf";
console.log("Kungen är " + the_king);

// Varför står det "undefined" om man skriver kommandona i konsollen direkt?
// Det är ett "returvärde". Inget att bry sig om just nu.
// Datavetenskaplig förklaring för lärarkollegor: KOnsollen är en REPL miljö.

console.log("Lilla kungen är " + the_king.toLowerCase());
console.log("Stora kungen är " + the_king.toUpperCase());


// Uppgift e - if - else
var name = "Skriv ditt namn här";
if ( name.length > 5 ) {
    console.log("Ditt namn har mer än 5 tecken");
} else {
    console.log("Ditt namn innehåller 4 eller färre tecken ");
}


// Uppgift f - en enkel loop
var name = "Skriv ditt namn här";
var eman, i = 1, len = name.length;
while ( i <= len ) {
    eman += name[len - i];
    i += 1;
}
console.log("Namnet baklänges blir '" + eman + "'");


/*
Vad har vi sett?
Uppgift a:
  - Variabel
  - När en variabel nämns FÖRSTA gången bör den "deklareras" med kodordet "var"
  - I samband med deklaration kan man också "instansiera" variabeln med ett innehåll
  - Variabler "tilldelas" (assign) värden med ett enkelt likamedstecken
  - Varje "sats" (statement) avslutas med kommatecken
    - JavaScript "förlåter" dig IBLAND om du glömmer dessa, men det leder till extremt svårbedömd kod. Undvik!
  - Två inbyggda funktioner i webbläsaren (prompt och alert)
    - Dessa två funktioner är inte en del av det egentliga språket JavaScript ur datavetenskaplig synvinkel
  - String.length är en "egenskap" (property) som talar om hur lång en text är (antal tecken) 
  - Ihopslagning av tre delar text till en längre (konkatenering av strängar)

Uppgift b:
  - Strunta i new Date() tills vidare. Du vet vilket år det är, det räcker.
  - Matematik (subtraktion)

Uppgift c:
  - Man kan komma åt varje enskilt tecken i en sträng. Första tecknet har "index" 0 (noll)
  
Uppgift d:
  - Konsollen är ett utvecklingsverktyg där man också kan få output
  - Med "metoder" kan man bland annat ändra på innehållet i en sträng


Uppgift e:
  - Man kan skriva uttryck som är sanna eller falska
  - "Villkor" kan användas för att styra programflödet
  - if - else är exempel på en "styrstruktur"
  - Man kan gruuppera "satser" i "block" med måsvingar (krullparenteser, klammerparenteser)
    - Placera alltid start-måsvingen på slutet av raden i JavaScript
    - Annars kan den automatiska semikolon insättningen lura dig!
    - Detta gäller inte i andra programmeringsspråk
  - När man har block, så markeras dessa också med indrag (4 mellanslag), för att göra det enklare
    för ögat att tyda koden. ANVÄND ALLTID INDRAG!!!

Uppgift f:
  - Man kan deklarera flera variabler på en rad åtskilda med kommatecken
  - Med styrstrukturen while kan man skapa en loop som upprepas så länge ett villkor är sant
  - (Oändliga loopar är det värsta som finns!)
  - eman += något <=> eman = eman + något
  - Funkar både med konkatenering och addition (och de andra tre räknesätten)
*/
