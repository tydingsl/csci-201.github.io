# Chapter 12: Fundamental Data Types

Read *Code Complete* Chapter 12.

You are already familiar with the most basic concepts of data types. In the "How Hardware Works" course, you learned that all computer data is bits. However, to understand the meaning of a sequence of bits, you must know what encoding was used. For example, 10000010 is 130 if it was encoded as an unsigned integer. Or it could be the signed integer -2. It could be part of the encoding of a 16- or 32-bit floating point number. It might represent a curved quotation mark character in an extended ASCII code called Windows-1252, or it could be half of some Unicode character.

In a programming environment, these different data encodings are called **data types**. Every data value in every PL has a data type. In **statically typed** PLs, each variable has a designated data type, and can only store values of that type. In **dynamically typed** PLs, including GML, a variable has no designated data type. It can initially hold a value of one data type, and later hold a value of a different data type.

## 12.1-12.3 Numbers

GML has a data type named "real" that holds any [real number](http://simple.wikipedia.org/wiki/Real_number). Examples of GML real literals are 5, 75.0, and 3.14. There is no documentation available for the exact encoding used.

Many PLs have multiple numeric types. Often, integer (whole number) values are encoded differently from numbers with a decimal point[^*].

In addition, many PLs provide multiple integer types and/or multiple decimal-point types. The PL may allow the programmer to choose signed or unsigned types. It may also provide encodings of different lengths to allow tradeoffs between memory usage and data range. For example, a PL might provide two integer types: 16-bit and 32-bit. The 16-bit type would be preferred due to its smaller memory size, unless the programmer needs to work with values that would overflow 16 bits. The 32-bit integer is available to accommodate the larger range of values.

Your reading points out some programming pitfalls that should be familiar to you from earlier studies, including overflow and unusual characteristics of floating-point types. Learn to guard against the other pitfalls described here, such as divide by zero and (unintended) integer division.

## 12.4 Characters and Strings

A character refers to a single symbol, as encoded by some character code set (e.g., ASCII, Unicode). A **string** refers to a sequence of characters, or text. Different PLs have different ways of encoding the beginning/end of a string.

While many PLs have separate data types for a single character and a string of characters, GML has only a string type. Examples of GML string literals are "Hello" and 'world'. There is no documentation of the exact encoding used.

## 12.5 Boolean ~~Variable~~s

Although McConnell's book tries to be largely PL neutral, he has a tendency to assume static typing. As a dynamically typed language, GML does not have Boolean variables (or variables of any particular type), but it does have Boolean values: `true` and `false`.

Some languages (notably C), have a way of simulating Boolean values for evaluation in Boolean contexts (`if` statements, loops, etc.). C does not recognize a Boolean type or the words "true" and "false", but it treats the value 0 (integer zero) as equivalent with "false" in a Boolean context. Any non-zero value is treated equivalent to "true".

JavaScript has a Boolean type and recognizes the literal values `true` and `false`. However, it performs type coercion so that `0`, `-0`, `NaN` (IEEE Std. 754's "not a number"), and the special values `null`  and `undefined` are equivalent to `false` when they appear in a Boolean expression context. All other values will be coerced to `true` in such contexts. The terms "falsy" and "truthy" are sometimes used to describe these two sets of values.

## 12.6, 12.7 Enumerated Types and Named Constants

These topics are somewhat similar; my comments will take them in the reverse order of the reading.

A **named constant** is what mathematicians would simply call a constant. Like a variable, it is a name that represents a value; unlike a variable, the value will never change. Common examples are mathematical constants, unit conversion factors, and some other kinds of symbolic names.

[GameMaker supports named constants](http://docs.yoyogames.com/source/dadiospice/001_advanced%20use/010_macros.html) through a feature called "macros". For PLs that do not support constants, you can simulate them by using variables with a different naming convention. Here are some examples.

```
MAX_ROWS = 3; // rows in the TicTacToe board
MAX_COLS = 3; // columns in the TicTacToe board

MILES_PER_KM = 0.63; // one kilometer is about 0.63 miles

SUNDAY = 0;
MONDAY = 1;
TUESDAY = 2;
```

There is nothing that prevents changing the values of these simulated constants, because they are just variables. But `NAMES_LIKE_THIS` are a big hint to experienced programmers, because such names are often used for constants. (Programmers sometimes refer to this form of names as "screaming snake case". You will learn more about naming conventions soon.)

Using named constants (actual or simulated) is a very valuable technique. It improves flexibility (it would be easy to change to a 5 x 5 TicTacToe game). It improves readability (another programmer might not know why the number 0.63 shows up in the middle of some calculation).

The days of the week examples are okay as far as it goes. However, when there is a set of related constants like this, it's even better to use an enumerated type if your PL supports it.

An **enumerated type** is a new, custom data type defined by the programmer. It is "enumerated" because the type's definition is simply to list all of the possible values. Typically, the PL implementation will simply assign sequential integers to the symbolic values, much like a sequence of named constants. But by saying that the values belong together as a distinct type of data, the programmer is telling the compiler or interpreter something about the meaning of the data. This is beginning to expand the concept of "data type" beyond just the underlying binary encoding. I want to delay further discussion of this expanded concept of data types until we finish the current chapter.

## 12.8 Arrays

This section is short and straightforward. You are already well-versed in array use from your previous experience with GML.

You should know that there is one unusual thing about GML arrays: they are **dynamic arrays**, meaning that they automatically grow in size as needed. Most PLs have **static arrays**, requiring you to specify the size of an array when it is created. Often there is no way to increase the size of an array; this must be addressed by creating a second, larger array (requiring excessive memory resources, at least temporarily) and copying the values from the smaller old array to the larger new array, at considerable expense. (This discussion is common for the basic arrays included as fundamental data types. Many PLs that do not provide dynamic arrays as a fundamental type have libraries of utilities to provide equivalent functions.)

## 12.9 Type Aliasing

Feel free to skip this section. If you do skim it, you will see more hints about the advantages of extending the concept "data type" beyond just the binary encoding.

[^*]: There appears to be no mathematical term for "numbers with a decimal point". To a mathematician, the integers are a proper subset of the real numbers. However, because their binary encoding is often different, programmers tend to see integers as distinct from all other reals. To put it differently, consider the question "Is 3.0 equal to 3?". A mathematician will say "yes" (I think). A programmer may very well say "no, depending on your definition of 'equal'".