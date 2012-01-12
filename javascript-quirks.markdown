JavaScript quirks
=================

If you know Java, C/C++, C# or even PHP, JavaScript will sometimes confuse you.
And you may confuse your students...

 * You may use JS in an way that is sub-optimal
 * You may produce errors

Why?

 * Some of these quirks are *design flaws*, a bi-product of Netscape rushing an immature product to the market
 * Some of these quirks are browser *bugs* and *inconsistencies*
 * Some of these are just JavaScript being *awesome*!


Use Firefox as the de facto standard implementation
---------------------------------------------------

After all Microsoft, Google, Apple and Opera do...

While Chrome may win a few more speed benchmarks, Firefox beats chrome on everything else:

 * Functional quality
 * First to implement new language features
   * both historically (JavaScript 1.6, 1.7, "use strict", etc)
   * and today (proxies, weak maps, byte array, etc)
 * The scratchpad (Shift + F4) is an awesome tool for teaching


Teaching tip
------------

Firefox has opt-in block scope. Great when teaching scope.

    var foo = "hi";
    {
        let foo = "hello";
        alert(foo);
    }
    alert(foo);
    
    for (let i = 0; i < 2; i += 1) {
       // do something
    }
    alert(i); // error i is not defined


In environments where you *can* use let (i.e. Firefox extensions) the feature is extremely popular.


Quirk #n: Unhelpful help
------------------------

ASI = Automatic Semicolon Insertion

 * Unexpected termination
 * No minification possible
 * Less readable code

Rules to avoid ASI problems:
 
 * Always use explicit ;
 * Always use brackets, even for one line conditional blocks
 * Always put brackets on the same line as the conditional or declaration
   * No pure K&R or Allman style

Check your code using JSHint! (A slightly better JSLint)


Quirk #n: Dynamic variables
---------------------------



Quirk #n: Everything from the DOM is a string
---------------------------------------------

The plus operator will concatenate

Conversions may produce NaN (see below)

Beware of octals


Quirk #n: No transitivity using ==
----------------------------------

The problem:

xxx

Solution:

Always use ===

Except when comparing to null.


If you are used to PHP, JavaScript is really tricky. PHP has sane conversion rules and the double equality comparison works as expected.

Especially in PHP the string "0" is falsy.


Quirk #n: NaN
-------------

It poisons everything it touches

Including this expression:

    NaN === NaN  // false! What?

Check for NaN:

    if ( foo !== foo ) { // foo is NaN }
    if ( isNaN(foo) ) { // foo is NaN }

But isNaN will convert its argument to Number..

    isNaN("foo") === true

ECMAScript Harmony will bring an even better check - the egal function. Backported to ES5:

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

The egal function will be vailable as an operator as well:

    if ( foo is bar ) {
        // We can reliably know that foo is identical to bar even if both are NaN 
    }

What about the bonus check?

According to normal JS 0 === -0, but 1/0 === Infinity and 1/-0 === -Infinity (non transient behavior)

Thus, in EcmaScript Harmony:

    NaN is NaN   // true
    0   is -0    // false


Quirk #n: Not every number conversion is identical
--------------------------------------------------

    Number("010") === 10
    parseInt("010") === 8   // octal

Always use the base parameter with parseInt:

    parseInt("010", 10) === 10

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


Bonus tip: Converting strings to numbers
----------------------------------------

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


Quirk #n: Everything (really is not) an object
----------------------------------------------

"In JavaScript everything is an object" - really?

There are wrapper functions to all primitives:

    typeof 2 === "number" // a primitive
    typeof "2" === "string" // a primitive

When primitives are invoked as objects, they are automatically wrapped behind the scenes.
But numeric literals can not be invoked as functions.

    2.toString(); // syntax error
    var foo = 2;
    foo.toString(); // "2"
    
    "qwerty".match(/e/) // works - yes that's a regexp

Never use the wrapper functions to instantiate objects

    var foo = new Number(45);
    typeof foo === "object" // thus foo is error prone


Quirk #n: Hidden eval
----------------------

 * onfocus="foo()";
 * setInterval("foo()", 200);

Eval is evil!

 * Destroys performance
 * Destroys sane scope resolution
 * Security issues abound

The first example is also *obtrusive*. Thou shalt not mix script and HTML.


Quirk #n: What's this?
-----------------------

The magic variable "this" is not bound!

It is a good thing&tm; but highly confusing

 * When used in a regular function this === window
 * When used in an object context it's that object (sort of like in Java Classes)
 * When used when a function has been instantiated using "new Constructor()" it's the instance
   * Foo() -> this is window
   * new Foo() -> this is the instance of Foo
 * When used with event handlers (DOM 0) it's the element that received the event.
 * When used with event listeners (DOM 2+) it's the element that received the event.
 * When used with attachEvent (MS) it's 
   * Thankfully, mpst libraries normalize the event!
 * It can be explicitly set using Function.call and Function.apply
 * It can be explicitly set using closures, Object.bind (EcmaScript 5) and libraries 

Phew!


Quirk #n: Literals
------------------

If you write

    var foo = new Array();
    var bar = new Object();

I know your a noob!

This is how you should do it!

    var foo = [];
    var bar = {};

* Better performance
* Less to type


Quirk #n: Arrays
----------------

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


Quirk #n: Lambda functions
--------------------------


Quirk #n: Function expressions
------------------------------

Are available

Must be used when assignment is conditional

Are not hoisted


Quirk #n: Global variables are too easy to make and too easy to use
-------------------------------------------------------------------

How to avoid:

* Self-executing (a.k.a. self-invoking) anonymous functions
* Design patterns

Pro tip:

    (function (window, document, undefined) {
        // Function body
    })(window, document);

    // Makes undefined really is undefined!
    // Helps scope resolution = better performance
    // Allows for more aggressive minification

If somebody writes:
    undefined = "foo";
The global variable undefined is now "foo". Really bad.


Quirk #n:
---------
