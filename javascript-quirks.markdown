# JavaScript quirks #

If you know Java, C/C++, C# or even PHP, JavaScript will sometimes confuse you.
And you may confuse your students...

 * You may use JS in an way that is sub-optimal
 * You may produce errors

Why?

 * Some of these quirks are *design flaws*, a by-product of Netscape rushing an immature product to the market
 * Some of these quirks are browser *bugs* and *inconsistencies*
 * Some of these are just JavaScript being *awesome*!

This document should benefit anyone wishing to learn JavaScript, but the main target group is teachers
that need to know the quirks that might show up during class. Thus I do not intend to document every JavaScript
peculiarity, just the most important ones.


## But first: Do not be scared! ##

We are dealing with the peculiarities and some of this really is weird.
However, JavaScript is a beautiful language and it can easily
to teach it to newbies.

### This is not a lesson plan ###

This is not an outline of stuff to teach or a suggested order for things to be brought up in class.
This document is aimed at **teachers** who will need to explain *some* of this stuff, but will
probably need to know it in order to help their students as problems occur.


## Use Firefox as the de facto standard implementation ##

After all Microsoft, Google, Apple and Opera do...

While Chrome may win a few more speed benchmarks, Firefox beats chrome on everything else:

 * Functional quality
 * First to implement new language features
   * both historically (JavaScript 1.6, 1.7, "use strict", etc)
   * and today (proxies, weak maps, byte array, etc)
 * The scratchpad `Shift + F4` is an awesome tool for teaching
 
## Tip: Keep the Console visible ##

Errors will be logged in it and you may test small snippets of code there.

## Teaching tip ##

Firefox has opt-in block scope. Great when teaching scope.

    var foo = "hi";
    {
        let foo = "hello";
        alert(foo);
    }
    alert(foo);
    
    for (let i = 0; i < 2; i += 1) {
       // do something
       // i is defined
    }
    alert(i); // error i is not defined

In environments where you *can* use let (i.e. Firefox extensions) the feature is extremely popular.

This will probably be part of ECMAScript Harmony.

P.S. `alert()`, `confirm()` and `prompt()` are great when teaching or doing *simple tests*,
but should not be used for real applications.


## Quirk #n: Unhelpful help ##

ASI = Automatic Semicolon Insertion

 * Unexpected termination
 * No minification possible
 * Less readable code

This will not work as expected:

    function laugh()
    {
        return
        {
            haha: "ha!"
        };
    }
    laugh();
    // returns undefined

Why? ASI happened after the return keyword.

Rules to avoid ASI problems:
 
 * Always use explicit ;
 * Always use brackets, even for one line conditional blocks
 * Always put brackets on the same line as the conditional or declaration
   * No pure K&R or Allman style


## Tip: Be strict and use lint tools ##

ECMAScript 5 introduced a very helpful strict mode. In that mode some error prone parts of JS
are verboten. To get into strict mode, just put this pragma in your script;

    "use strict";

Older browsers will just treat it as text and ignore it.

But do not "use strict" in the *global scope* since that may destroy imported scripts that are not strict mode proof.

One more reason to use a *self executing anonymous function*. (See below.)

[MDN documentation about strict mode](https://developer.mozilla.org/en/JavaScript/Strict_mode/)

### JSHint

Check your code using [JSHint](http://www.jshint.com/)! (A slightly better JSLint)


## Quirk #n: Dynamic variables ##

TODO


## Quirk #n: Everything from the DOM is a string ##

TODO

The plus operator will concatenate

Conversions may produce `NaN` (see below)

Beware of octals (common in dates)


## Quirk #n: Comparisons using == ##

When comparing two values with == (2 equals signs) *type conversion* will happen, but in quite erratic ways.

    '' == '0'          // false - no type conversion occured
    0 == ''            // true - type conversion occured
    0 == '0'           // true - no transitivity!

The problem is that it is nigh impossible to account for all the different type conversion possibilities.


If you are used to PHP, JavaScript is really tricky. PHP has more sane conversion rules and the double equality comparison (usually) works as expected.

Especially in PHP the string `"0"` is always falsy.

How non booleans convert in JavaScript depends on the setting:

    if ("0")           { alert("Truthy?"); }; // Alert
    if ("0" == false ) { alert("Truthy?"); }; // No alert, because false converted first... Stupid!

Whereas in PHP the following works sanely:

    if ("0")           { echo "Truthy?"; }; // No - falsy it is
    if ("0" == false ) { echo "Truthy?"; }; // Yup, "0" is the same as "0" == false

And this is really messy in JS:

    null != true
    null != false

    undefined != true
    undefined != false

### Solution

Always use `===` (triple equality, checking for *identical* values)

If typecasting is needed, do it yourself!

### Exception

Except when *comparing to null* and undefined is OK too. Thus this is redundant:

    if ( x === null || x === undefined ) {
        // do stuff
    }

Although Crockford would disagree, the majority of all JavaScripters think this is a better solution:

    if ( x == null ) {
        // do stuff
    }



## Quirk #n: NaN ##

When JavaScript encounters a value that it should try to convert to a number, but it can not be converted,
it gets the special value NaN (Not a Number). However, NaN is a problem. It will break any expectectation!

Any math operation involving NaN will produce NaN.

    setTimeout ( function () { alert("hej"); }, NaN); // Will execute at once

NaN poisons everything it touches! Including this expression:

    NaN === NaN  // false! What?

And this is just hilarious:

    typeof NaN === "number"

Check for NaN:

    if ( foo !== foo ) { // foo is NaN } // Use this!
    if ( isNaN(foo) ) { // foo is NaN }  // Seems obvious, but avoid!

Why avoid isNaN()? It will convert its argument to Number first and produce unwanted results:

    isNaN("foo") === true

ECMAScript Harmony will bring an even better check - the **egal** function.

    Object.is(x, y)  // NaN-safe ===

Backported to ES5:

    Object.defineProperty(Object, 'is', {
        value: function(x, y) {
            if (x === y) {
                // 0 === -0, but they are not identical
                return x !== 0 || 1 / x === 1 / y;
            }

            // NaN !== NaN, but they are identical.
            // NaNs are the only non-reflexive value, i.e., if x !== x,
            // then x is a NaN.
            // isNaN is broken: it converts its argument to number, so
            // isNaN("foo") => true
            return x !== x && y !== y;
        },
        configurable: true,
        enumerable: false,
        writable: true
    });

The egal function will be vailable as an operator as well (but that can't be backported):

    if ( foo is bar ) {
        // We can reliably know that foo is identical to bar even if both are NaN 
    }

### What about the bonus check? ###

According to normal JS `0 === -0`, but `1/0 === Infinity` and `1/-0 === -Infinity` (breaking expectations)

Thus, in EcmaScript Harmony:

    NaN is NaN   // true
    0   is -0    // false

Compare to the old unwanted behavior:

    NaN === NaN   // false
    0   === -0    // true


## Tip: By the way you can divide by zero ##

And get Infinity!

Or negative Infinity.


## Quirk #n: Not every number conversion is identical ##

    Number("010") === 10
    Number("08")  === 8
    parseInt("010") === 8   // Octal
    parseInt("08")  === 0   // Bad octal

Always use **the base parameter** with parseInt:

    parseInt("010", 10) === 10

Number takes arrays, parseInt does not

    Number([2]) === 2  // Array with single value
    Number(["2"]) === 2  // Also works with a string value
    
    parseInt([2], 10)  // NaN
    
Often the best way is to simply add a plus sign:

    7 + "7"  === "77"
    7 + +"7" === 14

But beware of NaN

    7 + +"7 sailors" // NaN

And this is also a quirk

    Number("7 sailors") // NaN
    parseInt("7 sailors", 10) === 7


## Bonus tip: Converting strings to numbers ##

In PHP this works:

    (int)"qwerty" // 0
    (int)"7 sailors" // 7

But in JavaScript only the latter:

    parseInt("qwerty") // NaN
    parseInt("7 sailors") === 7

In JavaScript this is equivalent to the PHP conversion, with one bonus feature. We avoid the octal (leading zero) gotcha.

    foo = parseInt(val, 10);
    if ( foo !== foo ) {
        foo = 0; // it was NaN
    }

PHP also has a very usable function to check for number-ish values: isNumeric()

    if ( isNumeric("32") ) {
        // Yes that string is numeric!
    }

In JavaScript:

    function isNumeric(value) {
        if ( typeof value === "number") {
            return true;
        }
        var testing = parseInt(value, 10);
        if ( testing !== testing ) {
            return false; // produced NaN
        }
        // Let's use the differenc between Number and parseInt to our advantage
        return Number(value) === testing;
    }

BTW: Octal *literals* (i.e. numbers that start with zero) are verboten in strict mode!
But since parseInt most of the time gets a string as indata, you will still need the 2nd argument.


## Quirk #n: The || operator is the awesome (but not always boolean) ##

    var foo = "hi";
    var bar = foo || "hello";
    // bar === "hi"

Great for some assignments:

    function handle_event(e) {
        e = e || window.event;
        // ...
    }


## Quirk #n: Everything (really is not) an object ##

"In JavaScript everything is an object" - really?

There are wrapper functions to all primitives:

    typeof 2 === "number" // a primitive
    typeof "2" === "string" // a primitive

When primitives are invoked as objects, they are automatically wrapped behind the scenes.
But numeric literals can not easily be invoked as objects, since the dot is interpreted as a decimal delimiter.
You can use two dots or parenthesis to work around that issue.

    2.toString(); // syntax error
    var foo = 2;
    foo.toString(); // "2"
    2..toString(); // "2"
    (2).toString(); // "2"
    2 .toString(); // "2" Notice the space between 2 and dot. Ambiguous style = Avoid!
    
    
    "qwerty".match(/e/) // works - yes that's a regexp

Never use the wrapper functions to instantiate objects

    var foo = new Number(45);
    typeof foo === "object" // thus foo is error prone

This example is even worse

    var foo = new Boolean(false);
    if (foo) {
        alert("You'd really think this wouldn't show, but it does!")
    }

It's OK to invoke the wrapper functions for type casting, just do not use them as constructors.

### Two values that won't wrap ###

 * null
 * undefined

Even though

    typeof null === "object"

This is just a bug in the language

## Quirk #n: Hidden eval ##

    onfocus="foo()";           // Antipattern
    
    setInterval("foo()", 200); // Antipattern

Eval is evil!

 * Destroys performance
 * Destroys sane scope resolution
 * Security issues abound

The first example is also *obtrusive*. Thou shalt not mix script and HTML.


## Quirk #n: What's 'this'? ##

The magic variable "this" is not bound!

It is a good thing&tm; but highly confusing

 * When used globally or in a regular function **this === window** (ES 3) - a design flaw!
 * When used globally or in a regular function **this === undefined** in ES 5 **strict mode**. 
 * When used in an **object context** it's that object (sort of like in Java Classes)
 * When used when a function has been instantiated using "new Constructor()" it's **the instance**
   * Foo() -> this is window or undefined
   * new Foo() -> this is the instance of Foo
 * When used with event handlers (DOM 0) it's the element that received the event.
 * When used with event listeners (DOM 2+) it's the element that received the event.
 * When used with attachEvent (MS) it's not!
   * Thankfully, mpst libraries normalize the event!
 * It can be explicitly set using Function.call and Function.apply
 * It can be explicitly using Object.bind (EcmaScript 5) and libraries 
 * It can be cajoled to an object using nifty tricks with closures

Phew!


## Quirk #n: Literals ##

If you write

    var foo = new Array();
    var bar = new Object();

I know your a noob!

This is how you should do it!

    var foo = [];
    var bar = {};

* Better performance
* Less to type
* Array constructors are error prone

Examples:

    var foo = new Array("3"); // [ "3" ] 
    var foo = new Array(3);   // [ undefined, undefined, undefined ]
    var foo = new Array(-1);  // throws an exception


## Quirk #n: Arrays ##

Arrays are objects and may have arbitrary named properties

    // Antipattern
    foo = [item1, item2];
    foo.prop = "qwerty";
    
Which are highly confusing

    foo.length === 2 // prop is not counted

And loops do not work as anticipated either

A better pattern

    var foo = {
        prop : "qwerty",
        items : [item1, item2]
    };

You want an associative array? Use objects! After all, in JavaScript that's
really what an object is, except that properties may be functions. Which is awesome!


## Quirk #n: Things that looks like arrays ##

TODO

But are not!

Not all array properties may be available. Fix:

    Array.prototype.*method*.call(obj, 0);


### DOM-collections ###

**Live** nodelists are returned by:

 * `getElementsByTagName()`
 * `getElementsByName()`
 * `getElementsByClassName()`

And the following properties are live nodelists:

 * `Element.childNodes`
 * `Element.children`

That liveness can be tricky...

**Static** nodelists are returned by:

 * `querySelectorAll()`


### The arguments object ###

TODO

ES 5 strict mode notes

> Strict mode makes arguments and eval less bizarrely magical. (MDN)

 * No `arguments.callee` (use named function expressions instead)
 * No `arguments.caller`
 * The arguments object is no longer updated when an individual parameter variable is changed

The future?
[ES Harmony rest parameters](http://wiki.ecmascript.org/doku.php?id=harmony:rest_parameters)


## Tip: Type checking arrays ##

It is pre-ECMAScript 5
[actually very hard to determine with accuracy if an object is an array](https://developer.mozilla.org/web-tech/2010/07/26/determining-with-absolute-accuracy-whether-or-not-a-javascript-object-is-an-array/)

    typeof [] === "object"  // Not Array - sigh!

Confusing

Lot's of bad ideas

ES 5

    Array.isArray(obj)

Pre ES 5

    obj instanceof Array   // Will get it right 99 %

Better

    Object.prototype.toString.call(obj) == '[object Array]'

 
### Yes the `typeof` operator is broken ###

    typeof null === "object"
    typeof [] === "object"

`instanceof` may work better

    null instanceof Object === false
    [] instanceof Array === true

But you can't use unwrapped primitives with `instanceof`

    7 instanceof Number === false
    7 instanceof number // ReferenceError: number is not defined

Thus, there is no one perfect solution that checks reliably for every kind of value.
There are proposals to tix this in ES Harmony, but nothing has been agreed upon yet.


## Quirk #n: Lambda functions and functions as first class objects ##

TODO

May be named

Which is better than using `arguments.callee`

Which is not allowed in ES 5 strict mode


## Quirk #n: Function expressions and function declarations ##

This is a function *declaration*:

    function foo() {}

These are function *expressions*:

    var foo = function () {}
    var foo = function bar () {}  // Can be invoked as foo(), not as bar()

Function expressions are available, since functions are **first class objects**

Function expressions:

 * Are not hoisted
 * Must be used when assignment is conditional (IE <= 8? doesn't support it)

In ES 5 strict mode functon statements are not allowed in any block but the top level
of its containing function.

This is kosher:

    function foo() {
        "use strict";
        // top level of foo
        function bar() {
            // strict mode is inherited
            // top level of bar
            function baz() {}
        }
    }

But this is not:

    function foo(a) {
        "use strict";
        if ( a ) {
            function bar() {}
        }
    }


## Quirk #n: Global variables are too easy to make and too easy to use ##

How to avoid:

* Self-executing (a.k.a. self-invoking) anonymous functions
* Design patterns


### Pro tip on self-executing functions ##

    (function (window, document, undefined) {
        // Function body
    })(window, document);

    // Makes undefined really is undefined!
    // Helps scope resolution = better performance
    // Allows for more aggressive minification

If somebody writes:
    undefined = "foo";
The global variable undefined is now "foo". Really bad.


## Quirk #n: I can't live with or without you ##

TODO "with" is evil

Confusing

Kills performance

Better to assign the chain to a variable:

    var foo = walla.balla.bong.foo;
    foo.prop = val;
    foo.method();

BTW! `with` is verboten in strict mode! (syntax error)


## Quirk #n: Hoisting ##

    var a = 8;
    var someFunc = function(){
        console.log(a);
        var a = 8;
    };
    someFunc(); // writes undefined

Equivalent to:

    var a = 8;
    var someFunc = function(){
        var a; // Hoisted
        console.log(a);
        a = 8;
    };
    someFunc(); // writes undefined

Want to use that global? (You shouldn't...)

    var a = 8;
    var someFunc = function(){
        console.log(a);
        a = 9;
    };
    someFunc(); // 8

If you do. at least make global variables **explicit**:

    window.a = 8;
    var someFunc = function(){
        console.log(window.a);
    };
    someFunc(); // 8

## Quirk #n: JavaScript is not a class act ##

TODO

If somebody tells you that JS is not OO "unlike Java". Laugh and run away!

You may program JS using a procedural, OO or functional paradigm.

Except for null and undefined everything can be treated as an object. (See above.)

But JavaScript do **not** have **immutable classes** defined pre-compile time. JavaScript has
**prototypes**.

Prototypes are powerful and it is perfectly possible to emulate classes. But everyone that
starts out doing this sooner or later stops and embraces the native prototypes instead.


Note: ECMAScript Harmony might bring some kind of class construct. But it will be 
*syntactic sugar* around prototypes, not C++/Java/PHP-ish static classes.

### Tip: Avoid `new` and use `Object.create()` ###

TODO


## Quirk #n: JavaScript !== DOM ##

Most inconsistencies between browsers are not in the core language but in the DOM.

How to handle the DOM is not the purpose of this document but you should stick to the following principles:

 * **Separate** behavior from content and design
 * Which is one aspect of being **[unobtrusive](http://en.wikipedia.org/wiki/Unobtrusive_JavaScript)**
 * And is usually best done using **progressive enhancement**
 * **Capability detect** - do not sniff browser versions
 
Avoid like the plague:

 * `document.write()`
 * Hidden eval (see above)
 * TODO


## AJAX and security notes ##

TODO

Use a library or disregard old IE versions for teaching. Libraries are convenient, though!

Prefer JSON over XML as a data format.

(E4X is broken and may even be removed from Firefox.)

Do not eval JSON (or anything else sent by the server or submitted by the user)

ES 5 has bult in JSON functions. Use an official library for old browsers.

Treat everything from outside sources as potential poison.

More tips:

 * Server applications should use server only cookies
 * TODO

### When is it OK to eval? ###

When all of these apply:

 * When you're an experienced developer
 * When you submit your code to rigorous testing
 * When you are letting other experts review your code
 * You're in strict mode which makes eval somewhat safer in supporting browsers

And when one of these apply:

 * You are working on a teaching or developer tool
 * You are contributing to a JSON library for old browsers
 * You are employed by Google and you are ordered by your boss to break every rule...


## Teaching aspects of libraries ##

To what extent should you use libraries? It depends on what you are teaching? In the Swedish gymnasium
I'd recommend this:

 * **Programming 1 and 2:** Use some libraries to help students overcome browser inconsistencies and facilitate
   faster "set up and tear down". Another use is to provide some help with really complicated stuff like
   powerful animations for SVG and Canvas and collision detection. But mostly the course should be "pure" JS.
 * **Webbutveckling 1:** The focus for this course is HTML and CSS. Using JQuery or a similar library is actually
   encouraged, but not in a way that violates best practice.
 * **Webbutveckling 2:** While this is not a pure course in programming and the use of libraries is taken for granted
   the student must know the basics of JavaScript and the DOM. Please also note that now that browsers have stuff
   like `document.querySelectorAll`, `element.classList.toggle()` and almost universal support for DOM 2 events 
   (available in IE9+), CSS *transformation*, *transitions* and *animations* lots of stuff that previously
   required libraries are within the reach of normal developers using raw functions.
 * **Webbutveckling 3:** While there is some freedom for specialization, this course really is designed for digging deep in to the DOM,
   especially new functionality like geolocation, session and local storage, audio and video api:s, etc.
   However, if the student chooses to make a WebGL app it is almost suicidal not to use libraries... (Matrix math!)


## Inspiration ##

 * [Google JavaScript style guide](http://google-styleguide.googlecode.com/svn/trunk/javascriptguide.xml)
 * [Douglas Crockford's style guide](http://javascript.crockford.com/code.html)
 * The Good Parts by Crockford and all his talks
   * Excerpt: http://oreilly.com/javascript/excerpts/javascript-good-parts/bad-parts.html
 * [The very weird stuff at wtfjs.com](http://wtfjs.com/)
 * [JavaScript Garden](http://bonsaiden.github.com/JavaScript-Garden/)
 * [Principles of Writing Consistent, Idiomatic JavaScript](https://github.com/rwldrn/idiomatic.js)
 
## Special thanks to ##

 * [Raynos](http://raynos.org/blog/)
 * [J. R. Stockton](http://www.merlyn.demon.co.uk/)
 
