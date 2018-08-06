# Static vs. Dynamic Typing

Here are some details on another distinction that has been introduced earlier.

## Dynamic Typing

Some PLs have **dynamic typing**, which means: 

- a variable is not associated with a particular data type
- each *value* has a data type
- the same variable can hold values of different types at different times
- type checking can be performed at run time as statements are executed

For example, consider the following Perl statements:

```
$x = 5;
$x = "hello";
```

The variable `$x` is given values of different types at different times, and this is valid in Perl. For programs of realistic complexity, the value and type stored by a variable could be dependent on user input, random number generation, etc. Clearly it would be impossible to check the types used in a statement until the statement was about to execute in a particular run time state.

## Static Typing

Other PLs have **static typing**, which means:

- each *variable* is associated with a data type
- the data type of a variable cannot change
- type checking can be performed at compile time (or before run time by a static type checker)

For example, consider the following statement:

```
int i = 1.1;
```

The source code specifies that the variable `i` has type `int`. The compiler or other type checking software can check for proper type usage before run time, so it would be possible for a compiler to indicate that there is something suspicious about this assignment. There is no way to change the variable's type at run time.

## Terminology

You should be aware that different authors and experts define the terms used here in different ways.

For example, some say that the issue of dynamic vs. static typing applies only to strongly typed PLs, and is meaningless for weakly typed PLs. I disagree, for two reasons.

1. As explained earlier, it is best to avoid describing an entire PL as strongly or weakly typed. It is possible for some features of a PL to exhibit weak typing, while other features of the same PL exhibit strong typing.
2. Even if we ignore the previous point, a (so-called) weakly typed language could associate types with variables and check them at compile time, or it could have no type associated with variables and perform checking at run time. For example, both C and Perl would be described as weakly typed, if we must label the entire language one way or the other. Yet C is statically typed while Perl is dynamically typed. For a further example, consider again the statement shown previously:
```
int i = 1.1;
```
It so happens that this is valid syntax in both C and Java. Both are statically typed languages. However, C is more weakly typed here, and accepts this without error; the compiler does an automatic type conversion called **coercion**, and the variable holds the integer value 1. Java is more strongly typed, and produces a compiler error. The error can be eliminated if the programmer explicitly calls for a type conversion (and data loss due to truncation) using a **type cast** as follows:
```
int i = (int)1.1;
```