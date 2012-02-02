# De absoluta grunderna i programmering med JavaScript #

De minsta byggstenarna i språket.

# Kommentarer #

    // resten av raden
    /*
    Flera
    rader
    */ 

# Värdetyper #

## Vad för **slags** värde är följande?##

    5
    "fem"
    "5"
    false
    true
    [1, 2, 3]
    { age: 5, height: 105 }
    
## Testa i konsollen ##

    typeof 5;
    typeof "fem";
    typeof "5";
    typeof false;
    typeof true;
    typeof [1, 2, 3];
    typeof { age: 5, height: 105 };

## Enkla värdetyper (primitives) ##

  * Number
  * String
  * Boolean
  * Undefined
  * Null

## Objekt ##

  * Object
  * Array
  * Function

I JavaScript *är* funktionerna objekt.

Värden av typerna number, string och boolean kan vid behov uppträda som objekt.

    typeof "hej"; // string
    "hej".length; // 3 - en egenskap som om det vore ett objekt

### "In JavaScript everything is an object" ###

Berömt, nästan sant citat.

 * Bättre vore att säga att icke-objekt kan uppträda som objekt vid behov
 * Internt sker detta genom s.k. "wrapper" objekt
 * Detta gäller inte null och undefined

Trots denna märkliga bugg i språket:

    typeof null === "object"

Så svarar JavaScript, men det är fel. Brendan Eich hade bara 2 veckor på sig, som sagt.

### Undvik wrapper objekten ###

Kommer man från Java så görs ofta följande misstag:

    var foo = new Boolean(false);
    var bar = new Number(5);
    var zoo = new String("hej");

Här används wrapper objekten uttryckligen. Gör aldrig detta!

    var foo = new Boolean(false);
    if ( foo) {
        console.log("Du ser detta för objekt är sanna (truthy)");
    }
    
Hoppsan!

# Variabler #

Variabler lagrar värden.

Variabler har namn, liksom andra _symboler_

Somliga ord är _[reserverade](https://developer.mozilla.org/en/JavaScript/Reference/Reserved_Words)_ och får inte användas som namn på symboler.

## Några ord som är reserverade i strict mode ##

 * break
 * do
 * delete
 * if
 * while
 * var
 * let
 * true
 * false

## Variabler bör deklareras ##

Deklarera = säga att man tänker använda en variabel.

Deklaration sker med ordet "var" (eller "let" i JS 1.7/ES Harmony)

    var foo;
    var bar = 3; // Deklarerad och initialiserad.
    var x = "hej", y = "jovisst", z;

En deklarerad, men inte initialiserad variabel har värdet _undefined_

(Argument till funktioner deklareras automatiskt. De behöver inte ordet var.)

## Variablers räckvidd (scope) ##

_Globala_ variabler är egenskaper på värdobjektet = window i webbläsaren

    var foo = 3;
    window.foo; // 3

_OBS! Ovanstående exempel funkar inte i konsollen_

Variabler som deklareras inuti funktioner är lokala. De har "function scope".

### Function scope ###

    function fn() {
        var foo = 1;
        bar = 2;
        console.log(foo); // 1
        console.log(bar); // 2
    }
    fn(); // Anropa
    console.log(foo); // undefined
    console.log(bar); // 2

### Globala variabler = problem ###

"Do not pollute the global namespace"

 * Otydlig avsikt - ville du verkligen ha en global variabel?
 * Oväntade krockar - två symboler med samma namn 

### Använd objektnotation för att göra din avsikt tydlig ###

    function fn() {
        var foo = 1;
        window.bar = 2;
    }

### Block scope ###

Finns ännu bara i JavaScript 1.7 (Firefox), men kommer att finnas i ECMAScript Harmony.

    var foo = 1;
    {
        let foo = 2;
        console.log(foo); // 2
    }
    console.log(foo); // 1

Bra för loopar:

    for (let i = 0; i < 5; i += 1) {
        // gör något
    }
    console.log(i); // undefined - i har upphört

Avancerad kunskap: Variabler deklarerade med "let" beter sig annorlunda ihop med s.k. closures.

## Variablernas värdetyp deklareras inte och den kan bytas under programkörning ##

Somliga språk, som Java och C, har **strikta** typer. När variablen deklareras anges dess typ

    // Java
    int foo = 3;
    foo = 4; // funkar
    foo = false; // Typfel - typen kan inte bytas under gång.

JavaScript är **dynamiskt typat**

    var foo = 1;
    typeof foo; // number
    foo = {};
    typeof foo; // object
    foo = false;
    typeof foo; // boolean

# Enskilda instruktioner kallas satser (statement) #

Dessa avgränas med semikolon.

Men JavaScript kan också infoga semikolon automatiskt.

_ASI_ = Automatic Semicolon Insertion

## ASI ställer till med problem ##

Här var det tänkt att man skulle returnera ett objekt:

    function getMe()
    {
        return
        {
            myName: "Lars",
            mySize: "xl"
         }
     }
     getMe(); // null

Vad hände? ASI efter ordet return!

Däremot blev det ingen ASI efter getMe() - hur kan man veta sån't?

## Undvik ASI-problem ##

 1. Skriv alltid ut semikolon - också bra för "minification"
 2. Sätt aldrig måsvinge på raden efter - vanlig stil i andra sammanhang
 3. Använd [JSHint](http://jshint.com/)

## Satser grupperas i block ##

Block avgränsas med [klammerparenteser](http://sv.wikipedia.org/wiki/Klammerparentes) - "måsvingar"

Block kallas också för "sekvens"

# Uttryck (expression) #

Allt som har ett värde är ett uttryck (expression).

    3
    3 + 5
    "hej"
    false
    foo || bar // "eller"
    ( x + y) / 5
    Math.round(bar)  // Har ett returvärde

## Uttrycken byggs upp av operatorer och operander ##

I uttrycket 3 + 6 är 3 och 6 operander och plustecknet är operator.

## Matematiska operatorer ##

    13 + 7 // addition
    13 - 7 // subtraktion
    13 * 7 // multiplikation
    13 / 7 // division
    13 % 7 // modulus, resten
    +13    // Anger positivt tal
    -13    // Anger negativt tal

Lägg märke till att + och minus i de sista exemplen är en _prefix_ operator med bara en operand.

(Operatorer med en enda operand kallas _unary_ (på engelska))

Upphöjt till löses med metoden pow i objektet Math.

    Math.pow(10, 3) // 10 upphöjt till 3

## Strängoperatorer ##

    "hej" + "san" // _konkatenering_, ihopslagning

## Jämförelseoperatorer ##

Dessa returnerar boolska värden

    3 < 5       // true
    4 <= 4      // true
    5 > 6       // false
    -1 => 0     // false
    "ab" > "aa" // true - strängarna jämförs i bokstavsordning
    "11" == 11  // true - "equal" - typkonvertering (se nedan) sker
    "11" === 11 // false - "identical" - ingen typkonvertering
    "11" != 11  // false - inte lika med - typkonvertering (se nedan) sker
    "11" !== 11 // true - inte identisk med - ingen typkonvertering

## Logiska operatorer ##

    foo && bar  // och
    foo || bar  // eller
    foo xor bar // antingen eller
    !foo        // "inte" foo - negation

Lägg märke till att ! är en _prefix_ operator med bara en operand.

## Tilldelning (assignment) ##

    foo = expr

"Shorthands"

    foo += expr // samma som foo = foo + expr
    foo -= expr // samma som foo = foo - expr
    foo *= expr // samma som foo = foo * expr
    foo /= expr // samma som foo = foo / expr

Listiga men knepiga, kan leda till problem, så vi undviker dessa:

    foo++   // samma som foo += 1
    foo--   // samma som foo -= 1
    ++foo   // samma som foo += 1
    --foo   // samma som foo -= 1

Skillnade mellan _prefix_ och _postfix_ är **när** ökningen/minskningen sker:

    var foo = 1;
    var bar = foo++;
    // foo är nu 2 och bar är 1
    // bar tilldelades värdet av foo, sedan ökade foo med 1

Jämför med:
    
    var foo = 1;
    var bar = ++foo;
    // foo är nu 2 och bar är också 2
    // Först ökade foo till 2, sedan tilldelades bar det nya värdet

### Man kan kedjekoppla tilldelning ###

    foo = bar = 5;
    // samma som
    bar = 5;
    foo = bar;

Men detta kan vara farligt:

    function xyz() {
        var foo = bar = "hej";
    }
    // Skapar/ändrar bar som en global variabel

Motsvarar nämligen:

    function xyz() {
        window.bar = "hej";
        var foo = bar;
    }

## Andra operatorer vi tills vidare skippar ##

 * Binär matematik
 * Den "ternära operatorn"
 * invocation
 * Parenteser - behöver inte förklaras
 * TODO

## Uttryck som blandar värdetyper ##

TODO

## Typkonvertering som språkegenskap (computer science) ##

Även strikta språk kan ha typkonvertering. Ex. Java.

Språk som typkonverterar kallas "weakly typed" (weak typing)

 * JavaScript är alltså dynamic weak
 * Java är strict weak
 * C är strict strong

## (Nästan) allt som hämtas från DOM är strängar eller objekt ##

    document.getElementById("age").value; // Användaren har skrivit sin ålder (45) som siffra i ett formulär
    var older = age + 10;

Vad tror du _older_ har för värde?

45 + 10 blir 55 men "45" + 10 blir "4510" därför att _konkatenering_ har skett

### Gör en manuell typkonvertering för att slippa problemet ###

    var older = parseInt(age, 10) + 10;
    var older = Number(age) + 10;
    var older = +age + 10;

En unär + operator funkar alltså enklast!
    
### Om typkonvertering till siffra misslyckas ###

Så blir resultatet **NaN** = Not a Number

NaN är ett elände:

    typeof NaN // number - vad sjutton?
    NaN === NaN // false - vad sjutton igen?
    NaN !== NaN // true - inte lika med sig själv!

    NaN + 5 // NaN
    NaN + "5" // "NaN5" - konkatenering där NaN typkonverterar till "NaN"

Man kan kolla om något är NaN med funktionen isNaN()

    isNaN(foo)

Men först typkonverteras foo, så resultatet är inte helt pålitligt!

En bättre koll:

    myOwnIsNaN(n) {
        return n !== n;
    }

## Truthy/falsy ##


TODO

Används för kapacitetsdetektering


# "By reference" kontra "by value" #



-----------------------------------------

Minnesanteckningar - skapa lektion om

 * Styrstrukturer
 * Strängar
 * Math
 * Objekt (enkelt)
 * Arrayer
 * Funktioner
   * Argument (men inte "arguments" i denna kurs)
   * Returvärden
   * Deklarationer
   * Expressions
   * Anonyma
   * Som metoder // används bara passivt i kursen
   * Skillnaden mellan fn och fn()
   * Self-executing
 * Iteration
 * Rekursion

För framtiden:

 * Enkelt om arv och prototyper
 * Enkelt om closures
 * this
 * Regexp
 * Funktionella array-metoder (reduce, map, etc)
