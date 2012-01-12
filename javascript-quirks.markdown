JavaScript quirks
=================

If you know Java, C/C++, C# or even PHP, JavaScript will sometimes confuse you

 * You may use JS in an way that is sub-optimal
 * You may produce errors

Why?

 * Some of these quirks are *design flaws*, a bi-product of Netscape rushing an immature product to the market
 * Some of these quirks are browser *bugs* and *inconsistencies*
 * Some of these are just JavaScript being *awesome*!

Use Firefox as the de facto standard implementation
---------------------------------------------------

After all Microsoft, Google, Apple and Opera do...

While Chrome may win a few more speed benchmarks, Firefox beats chrome on everything else

 * functional quality
 * first to implement new language features
   * both historically (JavaScript 1.6, 1.7, "use strict", etc)
   * and today (proxies, weak maps, byte array, etc)

Teaching tip
------------

Firefox has opt-in block scope

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


