# Chapter 13: Unusual Data Types

Read *Code Complete* Chapter 13.

## 13.1 Structures

In most PLs, the values in an array must have the same data type ("homogenous"), and must be accessed using an integer index.

In contrast, a **structure** is a data type that can contain multiple values of different data types ("heterogenous"). The individual values in the structure can be accessed by name. These values are sometimes called **fields**.

Another common term for "structure" is **record**. A structure or record is similar to a row in a relational database (or a table of data), with the field names in the column labels and the values in the table cells.

Structures or records can be described as an early, limited form of object-oriented concepts. JavaScript objects resemble structures in that each object can contain multiple variables (fields, members, properties) that are referred to by name. Each sgc `Sprite` object is a structure with fields for x coordinate, y coordinate, speed, etc.

Here is a simple example, in C.

```c
#include <stdio.h>

void main()
{
	struct batter
	{
		unsigned int at_bats;
		unsigned int hits;
	};

	struct batter babe_ruth; /* variable babe_ruth is a struct of type batter */

	babe_ruth.at_bats = 8399; 
	babe_ruth.hits = 2873;

	printf("Babe Ruth's lifetime batting average: %f\n", 
           (double)babe_ruth.hits / babe_ruth.at_bats);
}

```

Unless you are programming in the C language, you are unlikely to be using structures in this limited form. However, the concepts are relevant background for any PL that supports object-oriented concepts. You will learn more about object-oriented concepts that extend structures in a later chapter.

## 13.2 References and Pointers

The code and examples in this section are most directly relevant to programming in the C and C++ languages. The underlying concepts are valuable for study of many PLs, however, and for better understanding of how PLs manage memory storage. If you are not studying C or C++, feel free to skip the language-specific subsections starting on page 332.

You learned some about references and pointers in Chapter 10 when we covered persistence and dynamic memory allocation. Here is a recap.

When JavaScript code creates a new object using the `new` operator, the constructor returns a **reference** to a newly created object. This reference uniquely identifies the object.  A reference is a variable that, instead of storing a data value, allows indirect access to a data value.

Many PLs contain similar concepts. In some PLs, references are implemented as a "serial numbers" or "object identifiers". A **pointer** is a special kind of reference that stores the numeric RAM address where the data value is stored. (Be aware that different PLs use these terms in somewhat different ways.)

Pointers are low-level concepts that provide a great deal of power and flexibility, especially where pointer arithmetic is used. (Pointer arithmetic means performing calculations on memory addresses in order to navigate through memory.) Pointers can also be very dangerous if misused.

Other forms of references are designed to be safer, if not as powerful as pointers. These include:

- [C++'s implementation of references](https://isocpp.org/wiki/faq/references), plus libraries implementing various forms of pointers
- [reference types in Java](http://study.com/academy/lesson/reference-data-types-in-java.html)
- [Perl's symbolic references](https://docstore.mik.ua/orelly/perl/prog3/ch08_04.htm)
- [PHP's "variable variables"](http://php.net/manual/en/language.variables.variable.php)

Notice that dynamic memory allocation is not the only situation where references/pointers are used in programming. We will see some other examples in class, and in future reading assignments.

You might enjoy [Pointer Fun with Binky](https://youtu.be/6pmWojisM_E).

## 13.3 Global Data

Use global variables only as a last resort. The concept of **access routines** described in this section is very important, and will re-appear in a number of other contexts.
