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

 * ASI = Automatic Semicolon Insertion
   * Unexpected termination
   * No minification possible
   * Less readable code

Rules to avoid problems:
 
 * Always use explicit ;
 * Always use brackets, even for one line conditional blocks
 * Always put brackets on the same line as the conditional or declaration
   * No pure K&R or Allman style


Quirk #n: Dynamic variables
---------------------------


Quirks #n: Hidden eval
----------------------

 * onfocus="foo()";
 * setInterval("foo()", 200);

Eval is evil!

 * Destroys performance
 * Destroys sane scope resolution
 * Security issues abound

The first example is also *obtrusive*. Thou shalt not mix script and HTML.


Quirks #n: What's this?
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


Quirk #n: Everything from the DOM is a string
---------------------------------------------

The plus operator will concatenate


Quirk #n: No transitivity using ==
----------------------------------

The problem:

xxx

Solution:

Always use ===

Except when comparing to null.


Quirk #n: NaN
-------------



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

