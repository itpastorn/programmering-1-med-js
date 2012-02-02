# JavaScript #

## Kort historik ##

 * Netscape vill ha skript i webbläsaren
 * Brendan Eich får bara _två veckor_ på sig, innan första versionen presenterades
 * Kallades först _Mocha_, sedan _LiveScript_ (sept 1995)
 * Bytte namn av **marknadsföringsskäl** till JavaScript (dec 1995)
 * _Namnet_ ägs av Oracle, som köpt Sun, där Java uppfanns
 * Microsoft kallar sin version JScript

## Användning ##

 * I webbläsaren: "Client side scripting"
 * På servern: "Server side scripting" (ovanligt fram tills 2010)
 * I andra program, som _makrospråk_ (Adobe Photoshop, m.fl. Open/Libre Office)
 * I Flash under namnet _ActionScript_
 * För utveckling av _widgets_ och mobila _appar_
 * Etc.

JavaScript hade länge rykte om sig att vara ett språk som inte kunde "så mycket"
men numera har många insett att det är en helt galen föreställning.

JavaScript != "Java light"

## Standardisering ##

HTML, CSS och DOM standardiseras av W3C.

JavaScript av **ECMA** (European Computer Manufacturers Association)

Därav namnet ECMAScript.

Standardiseringen gick _hastigt_ och har följts _dåligt_. Detta bidrog till det dåliga ryktet.

Men främst är det DOM-delen som skiljer (mer nedan).

## Versioner ##

Netscape, sedan Mozilla, har alltid varit drivande i utvecklingen och skapat _de facto_ 
implementeringen som andra följer.

[Detaljerad tabell på Wikipedia](http://en.wikipedia.org/wiki/JavaScript#Versions)

  JS    ES    År    Webbläsare                Kommentar
  1.0         1996  Netscape Navigator 2.0    Också MSIE 3
  1.3   1+2   1998  Netscape Navigator 4.06   Också MSIE 4   
  1.5   3     2000  NN 6/ Firefox 1           Successivt in i MSIE 5.5 -8 + Opera och Safari
  1.6         2005  Firefox 1.5               Successivt till Opera, Safari och Chrome
  1.7         2006  Firefox 2                 (Delar kommer till ECMAScript Harmony)
  1.8         2008  Firefox 3                 Opera 11.50
  1.8.5 5     2009  Firefox 4                 MSIE 9, Chrome, Opera, Safari (2011)

Alla webbläsare från 2012 och framåt stödjer i **mycket** god utsträckning _ECMAScript 5.1_

Nästa version av standarden går under arbetsnamnet _ECMAScript Harmony_

Stora delar av den finns redan i Firefox, vissa delar i Chrome, några delar i MSIE 10.

I den här kursen kommer vi att hastigt titta på nyckelordet _"let"_ som bara stöds av Firefox (en del av JavaScript 1.7 och **troligen** en del av "Harmony")

## JavaScript kontra DOM och BOM ##

JavaScript körs i en **värdmiljö** ("host object"), vanligtvis en webbläsare.

För att man ska kunna göra något, så erbjuder värden gränssnitt = **api** = application program interface.

De delar av värdmiljön som direkt relaterar till webbläsaren som sådan kallas BOM = Browser Object Model

De delar av värdmiljön som direkt relaterar till dokumentet som visas _i_ webbläsaren kallas DOM = Document Object Model

Exempel - detta är DOM och BOM:

  document.getElementById("foo")  // Hitta elemntet med id = foo
  window.setInterval(foo, 100)    // Kör funktionen foo var 100:e millisekund
  window.location.href            // Adressen till sidan där man är
  elem.addEventListener()         // Lägg till en händelselyssnare

Detta är "ren" JavaScript:

  var foo = 53;
  var elev = { namn: "Kalle", klass: "9c" };

## DOM som det stora problemet ##

Det dröjde innan standardiseringen av DOM kom igång. Då hade Netscape och Microsoft utvecklat egna varianter
i syfte att skapa **minsta** möjliga interoperabilitet.

"Best viewed in" var målet - inte standarder.

Idealet för standarder: "Write once run everywhere"

Problemen:

  1. "Jag kan nå't som inte du kan" och aldrig kommer kunna.
  2. "Allting som du kan kan jag göra bättre" fast på ett helt annat sätt.
  3. "Jag kan också" men luras bara, för jag har en massa buggar.

Fram till version 3.0 så hade Netscape Navigator såpass dominerande ställning att alla härmade den.

NN 3.0 som _de facto_ standard kallas DOM 0 ("noll") och innehåller flera saker som aldrig, eller helt nyligen, blivit officiell standard.

Dit hör **händelsehanterare** (event handlers):

  element.onclick = function;

Den officiella standarden har något kraftfullare: **lyssnare** (event listeners), men fram till och med MSIE 8, så stöddes de inte av just MSIE:

  elem.addEventListener("click", fn, false)  // Standard: Firefox, Opera, Safari, Chrome + MSIE 9+
  elem.attachEvent("onclick", fn)            // Icke-standard: MSIE 4-8

När en händelse inträffar så skapas ett **objekt** som innehåller egenskaper med information om händelsen.

Exempel:

 * Musklick - Var någonstans i koordinatsystemet var musen när man klickade?
 * Tangenttryck - Vilken tangent trycktes ned?

MSIE har haft andra namn, eller samma namn fast viss skillnad på implementationen, på dessa egenskaper.

## Hur hantera detta ##

### Dålig kösning: Browsersniffa ###

Lär dig känna igen denna lösning, för om du googlar finns det mängder av skräp på nätet.

  if ( navigator.appName.indexOf() ) {}
  if ( document.layers ) {}

Etc.

Browsersniff funkar dåligt:

 * Webbläsare anpassar sig genom att luras
 * Webbläsare utvecklas!
 * Onödig komplexitet

### Tre bättre lösningar ###

 1. Kapacitetsdetektera (object detection, capability detection)
 2. Använd ett bibliotek, typ [JQuery](http://jquery.com/).
 3. Ignorera alla gamla webbläsare

Den sista "lösningen" använder vi på den här kursen. Vi lär oss för framtiden! (Den kan inte användas om en kund vill ha en produkt idag.)

## Ajax ##

Somliga webbplatser kan uppatera en **del** av sidan med ny information som skickats från servern.

Klassisk sidvisning:

 1. Visa sidan
 2. Användaren fyller i ett formulär eller klickar på en länk
 3. Visa en ny sida

Ajax:

 1. Visa sidan
 2. Användaren gör något
 3. Information skickas med JavaScript till servern
 4. Servern svarar och JavaScript hanterar svaret
 5. Sidan visas i ett nytt **tillstånd**

Tack vare detta kan man göra **applikationer** och inte bara **sidor** på webben.

Namnet Ajax myntades av Jesse James Garret 2003 och stod *ursprungligen* för "Asynchronous JavaScript And XML".

Ajax är en slogan, snarare än en exakt teknik. När vi programmerar är det bättre att använda begreppet __XHR__ (XmlHttpRequest) för den teknik som används.

## God praxis ##

**DHTML** - JavaScript på 90-talet bidrog till att göra webben sämre.

*Webbstandardrörelsen* identifierade grunden för god praxis.

 1. HTML styr upp innehåll
 2. CSS styr upp utseende
 3. DOM och JavaScript styr upp __beteende__

*Douglas Crockford* är en programmeringsguru som visat världen att JavaScript är:

 * Ett *bra* språk i grunden, med många "good parts"
 * Ett språk som lätt missbrukas och har också "bad parts"

När du googlar efter svar på specifika frågor eller söker svar via diskussionsforum så finns det nyckelord du kan kasta in för att få bra svar:

 * Unobtrusive
 * Progressive enhancement
 * Good parts
 * Best practice
 * DOM scripting

Det finns också varningssignaler du bör känna till:

  <body onload="foo()"> dvs. HTML och JavaScript blandas
  document.write()
  eval()
  <script language="javascript">   Attributet language är föråldrat och icke-standard.

För att gömma JavaScript för webbläsare som fanns på marknaden före 1996 så användes följande knep:

  <script>
  <!--
  // JS kod här dold inom HTML-kommentarer
  -->
  </script>

Det finns fortfarande artiklar och instruktionsfilmer på Youtube som 15 år senare säger att du *måste* använda detta knep!

## Vad moderna webbläsare kan ##

### Exekvera (köra) koden vansinnigt snabbt ###

Mer än 100 gånger snabbare än för några år sedan.

**JIT** = Just in Time kompilering.

  * Tracemonkey, JägerMonkey, IonMonkey (Firefox)
    * Spidermonkey är grundfunktionerna
  * Squirrelfish Extreme = Nitro (Safari)
    * "JavaScript Core" är grundfunktionerna
  * V8 med Crankshaft (Chrome)
  * Carakan (Opera)
  * Chakra (MSIE 9+)  
  
### ECMAScript 5.1 och lite "Harmony" ###

Största vinsten? Inga skillnader längre!

Blockera några "bad parts" av språket:

    "use strict";

Fler funktioner.

### DOM 3.0 och lite 4.0 ###

Största vinsten? Inga skillnader längre!

Webbläsarna tar till och med bort saker de varit ensamma om!

Kraftfullare funktioner.

### HTML5 och annat nytt ###

NEWT = New and Exciting Web Technologies

Följande exempel är bara ett litet urval av allt som håller på att hända!

HTML5:

 * Förenklingar (ex doctype, script utan "type", "meta charset")
 * Fler element och attribut (section, article, nav, aside, header, footer, figure, details, etc)
 * Formulärelement (date, number, email, 

CSS 3 användbart idag:

 * Runda hörn!
 * Fler selektorer
 * Fler sätt att ange färg inklusive rgba(), hsla()
 * Anpassning till olika skärmstorlekar och mediatyper med @media
 * Gradienter (färgtoningar)
 * Multipla bakgrunder
 * Kolumner (som i tidningar)
 * Transformation (2D och 3D rotera, skeva, skala)
 * Transition (övergångar) och animation
 * CSS tabeller

CSS 3 på gång:

 * Bättre layoutmöjligheter: Flexbox, "exclusions and shapes", "grid layout", "line grid"
 * CSS för "paged media"

Grafik:

 * SVG = Scalable Vector Graphics. Deklarativ och "retained mode" (objekten kan flyttas).
 * Canvas - 2D high level graphics. Imperativ och "immediate mode" (sudda, rita, sudda, rita).
 * WebGL - 3D low level graphics. (Microsoft är dock inte med på detta ännu.)

Dessutom används GPU:n för att snabba upp också vanlig HTML och CSS.

Nya funktioner:

 * Drag and drop, inklusive dra en fil från "utforskaren"
 * Spela upp video
 * Hantera video (ex. "capture frames")
 * Spela upp ljud
 * Hantera ljud (göra en "beat detector")
 * Lagra data (session storage, IndexedDB)
 * Web workers (parallell exekvering)

Nätverksaccess:

 * Web Sockets
 * Server sent events
 * Offline

Hårdvaruaccess:

 * Geolocation (tillgång till GPS-info)
 * Accelerometern (tilt events)
 * Touch events
 * "Pointer lock" - vrid rummet, flytta inte muspekaren
 * Kameran
 * Filsystemet
 * Bluetooth, USB,
Etc.

Du kan snart göra "nästan allt" i webbläsaren.

HTML och CSS används för så mycket mer än bara webbplatser, ex. ePub.

## Andra språk för programmering på klientsidan ##

 * VBScript (Microsoft) - slog aldrig igenom. (Kunde öppna CD-ROM luckan...)
 * Dart (Google) - har mött ganska ljummet intresse.
 * Coffeescript (Mozilla) - är ett sätt att "skriva" JavaScript!

## Slutsatser ##

JavaScript är ett bra och kraftfullt språk som bara kommer att öka i betydelse under överskådlig tid.

Det finns många missförstånd och dåliga råd som skapar förvirring och får dig skriva dålig kod.

