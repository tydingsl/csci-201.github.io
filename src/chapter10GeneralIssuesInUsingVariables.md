# Chapter 10: General Issues in Using Variables						            				    

Read Chapter 10 of *Code Complete*. The following commentary will guide you in applying these concepts.

## 10.2 Variable Declarations

A variable declaration is a programming statement that creates a new variable. You can think of it as an introduction or an announcement that the variable exists. The details of variable declarations are quite different for different PLs.

In JavaScript, you learned to declare variables like this:

```javascript
let minValue;
```

(Actually, you usually included an assignment to initialize the variable with a starting value. That's a good practice discussed below, but here we will concentrate on the simple declaration above.) This tells the programming environment to reserve memory space to store some data, and that you will use the name `minValue` to refer to the data.

Some PLs do not require variable declarations. Instead, they support "implicit" (automatic) creation of variables. JavaScript supports implicit declarations, but in a particular way. If you do not declare a variable before you use it, then it will be automatically created as an instance (not local) variable. ("Instance" and "local" describe a variable's *scope*, which we will get to shortly in section 10.4.)

As much as possible, avoid relying on implicit declarations. Your reading includes an example of one reason for this. Suppose that you rely on implicit declarations, and are using a variable named `account_number`. If you write a statement that mistakenly gives the name as `account_num`, you have just introduced a significant error into your code. By mistyping the variable name, you have created a second, separate variable without realizing it.

This is prevented if your toolset requires you to declare a variable before using it. You would declare and use the "correct" name `account_number` without any difficulty. But the mistaken statement that uses the name `account_num` would generate an error because you are trying to use a variable that has not been declared.

Some programming toolsets will allow you to turn off support for implicit declarations. As the book suggests, turn this off if you can. In GML, we have no way of disabling the implicit declaration. But you can avoid relying on it by creating and initializing all instance variables at the time the instance is created.

You need to figure out how to apply these ideas and guidelines to the PL you have chosen to study. Your PL may be a **statically typed** language, which means that the declaration must say what type of data the variable will store (number, string, etc.) This concept does not exist in JavaScript or other **dynamically typed** PLs, where a variable can store any type of data. We will learn more about static and dynamic typing later.

## 10.3 Initializing Variables

Initializing a variable means giving it its first (initial) value. This is sometimes called "defining" the variable. Initialization is important, because problems may arise when you attempt to use the value of a variable that has not been initialized.

Some programming toolsets will generate an error in situations like this. If your compiler or interpreter does not, an "add-on" code checking tool may flag it for you.

JavaScript has an unusual way of dealing with this issue: it defines a special value named `undefined`. The value of the JavaScript variable declared above with `let` is `undefined`.

Some languages eliminate this problem by defining rules about default data values. (For example, all uninitialized variables might have the value 0 (zero).) Best practice, though, is to explicitly initialize variables instead of relying on rules that might change or be misunderstood. Avoid relying on information that does not appear in the code, like default values.

## 10.4 Scope

Your reading explains the concept of variable **scope** pretty clearly. Each PL will have a set of "scope levels". For JavaScript, they are: block, local (or function), object, and global. The scope of a JavaScript variable depends on two things: *where* it is declared, and (sometimes) what reserved word is used to declare it. Here is an example. 

```javascript
var globalVar1 = 1;
let globalVar2 = 2;

class ScopeExample { 
    constructor() { 
        this.objectVar = 3; 
    } 
    
    method() { 
        var localVar1 = 4;
        let blockVar1 = 5;
        
        {
            var localVar2 = 6
            let blockVar2 = 7;
        }
        
        this.objectVar = 4;
    }
}
```

As their names indicate, `globalVar1` and `globalVar2` are global variables. When they are used in the "top-level" or global scope, `var` and `let` produce the same result. These variable declarations are not contained inside of anything, and these global variables can be used anywhere in the program. 

When an object of the `ScopeExample` class is created, any code with access to that object will be able to access the object's `objectVar` property. For example:

```javascript
let exampleObject = new ScopeExample();
exampleObject.objectVar = 0;
```

It is impossible to access the `objectVar` property without using the `ExampleScope` object that contains it. If, after the two statements above, you then execute the statement `exampleObject.method();` then the value of `exampleObject.objectVar` was `3` after the first statement (because `new` calls the constructor), `0` after the second statement, and `4` after the method call.

When `method()` is running, the local variables `localVar1` and `localVar2` can be used anywhere inside the function; they can never be used outside the function. The same is true of the `blockVar1` variable. Because `blockVar1` is declared with `let`, it can be used anywhere in the curly braces that surround it; here, that is the same as the function.

The `method()` function contains a "free-standing block"-- a pair of curly braces that group two statements inside of the function. Usually, we see blocks that are not free-standing-- curly braces around statements are usually connected to an `if` statement or some kind of loop. But these free-standing blocks are legal in some languages including JavaScript; their only purpose is to create another, more private, scope for block variables. The block variable `blockVar2` can only be used inside the curly braces of the free-standing block; it cannot be used in the rest of `method()` , or anywhere else.

You can skim the subsections on pages 245-248 at a high level. But pay close attention to the guidelines and comments on minimizing scope.

## 10.5 Persistence

Usually, **persistence** refers to techniques for saving program information in nonvolatile storage so that it can persist from one run of the program to another, even if the system loses power.

McConnell uses the term in a much broader sense that includes the typical meaning, plus much more. Part of this larger meaning involves a distinction between two approaches to managing memory: **static allocation** and **dynamic allocation**. In some ways, this is closely related to the concept of variable scope. There is a subtle difference though: scope refers to the visibility/existence of a name (a variable), while persistence refers to the existence of the underlying data. If there is only one variable referring to a given memory address, then there is no distinction. However, the distinction is important if there is more than one variable that refers to the same physical memory address (a situation known as **aliasing**).

In most PLs, the memory storage used by block, local, and global variables is statically allocated from an area of memory called the **stack**.

As you may recall from the "How Hardware Works" course, most instruction set architectures include the ability to PUSH and POP data to/from a system stack in a "first-in, last-out" fashion. One of the primary uses of this mechanism is to save information about the current state of a subroutine (including its local variables) before executing a call to a different subroutine. A return to the calling subroutine is implemented by popping the system stack to reinstate the situation prior to the call.

Modern operating systems provide similar stack-based handling of subroutine calls for higher-level PLs. It is common for an OS to provide a separate stack for each running program.

When a variable goes "out of scope", that variable can no longer be used to access the data that it represented. A block or local variable goes out of scope when execution leaves the block or function that contains it. A global variable goes out of scope when the global program ends. When the variables go out of scope, the memory space that was reserved by their declaration is automatically released for other use as the stack is popped. The data is lost, although another copy of the value(s) might exist elsewhere.

Dynamic memory allocation is different. JavaScript and similar languages allow dynamic allocation of memory through the `new` operator, which returns a **reference** to a newly created object. A reference is a way of access some memory contents; other PLs use the terms pointer, handle, address, object ID, or descriptor to refer to this concept. ("Reference" is the preferred language-neutral term; the ID or address is not data in the direct primitive sense, but an indirect reference that allows access to the data.) Each PL will have dynamic allocation function(s) that allocate memory when they are called. This memory is pulled from the **heap** or "free store", an area of memory distinct from the stack.

JavaScript variables that store a reference are no different from those that hold primitive data such as the game's score. When the variable goes out of scope, access to the data is lost, unless another copy exists elsewhere. But the indirect nature of a reference means that the "copy" is not a distinct clone of the data value; it is a copy of the reference, which allows us to access the one and only underlying instance.

To illustrate, consider the following (simplified) JavaScript, using local variables and statically allocated data. The first routine (function) declares then initializes the local variable `data`, then passes its value as an argument to the second routine. The second script takes the value of its argument (arguments behave as  local variables), adds 1, and displays the result, which is 6. The return to the first (calling) routine destroys the local symbol `argument`. Back in the first routine, a copy of the lost value is available as the local variable `data`, but this separate copy was made before the addition of 1. So the final output prints the unaltered copy of the value: 5.

```javascript
routineOne() {
    let data = 5;
    routineTwo(data);
    console.log(data); // prints: 5
}

routineTwo(argument) {
    argument = argument + 1;
    console.log(argument); // prints: 6
}
```

Now, contrast this with a parallel example where dynamic memory allocation is used instead of static allocation. Both outputs display a value of 6. Although the `argument` that is local to the second script is destroyed as before, what is retained in the local variable of the calling routine is not a copy of the underlying data; it is a copy of the reference that allows access to the one and only underlying instance, with its instance variable that contains the altered value 6.

```javascript
routineOne() {
    let reference = new Object(); // could be any class
    reference.data = 5;
    routineTwo(reference);
    console.log(reference.data); // prints: 6
}

routineTwo(argument) {
    argument.data = argument.data + 1;
    console.log(argument.data); //  prints: 6
}
```

In other words, there is only one object in the code above. While `routineTwo` is running, there are two references that "point at" this object. One reference is destroyed when it goes out of scope at the completion of `routineTwo`. But back in the calling routine, we have another reference to the one-and-only object. So the change to its internal data survives the call to `routineTwo`.

We must now consider how dynamically allocated memory can be released for other use. Statically allocated stack space is automatically released when a routine call terminates. But when can we safely conclude that dynamically allocated space is no longer needed? There are two approaches.

In the first approach, the PL implementation handles it automatically. Perhaps the system counts the number of existing references to a particular area of memory. As long as one or more references to an area of memory exists, the programmer may access it. When the reference count goes to zero, the system can safely mark the memory available for some other use. **Reference counting** is one strategy to implement **garbage collection**: the automatic recovery of dynamic allocations no longer in use. This is roughly the approach that JavaScript uses.

In the second approach, it is up to the programmer to explicitly request that dynamically allocated memory be released, by calling a function that is the "flip side" of the dynamic allocation function. For example, C++ also uses a `new` operator that returns a reference to a new, dynamically allocated object. But in C++ programs the programmer must use the `delete` operator to tell the system to destroy an object and reclaim its memory space.

There are, of course, tradeoffs to these two approaches. Garbage collection is easier for the programmer, and prevents certain common mistakes. However, it tends to reduce performance because the system must do the overhead work of reference counting or some other bookkeeping strategy. Some strategies only attempt to recover unused memory when the system is running low. This tends to improve performance, but also makes it less consistent and predictable. (The same program running the same operations on the same data may perform differently depending upon how much memory is free.) Guaranteed worst case performance is vital for safety critical systems, so garbage collection is not a good choice in some situations.

The manual approach gives the programmer complete control, and the ability to guarantee consistent optimal performance. However, it leaves programmers free to introduce certain problems. One of these occurs when a programmer releases some dynamically allocated memory, but continues to use the values stored there. This can cause a failure, but only on occasions where the potential problem leads to conflicting use of the same space. The problem can be intermittent, inconsistent in its behavior, and hard to find.

The second problem is called a **memory leak**: the programmer has allowed all references to some dynamically allocated memory to go out of scope. There is no way for the programmer to refer to this memory, not even for the purposes of requesting that it be released. This may not impact a short running program. However, imagine a long running program like a Web server, where a small memory leak (maybe just a few bytes) occurs on each incoming Web request. The server may run fine for a long time, until one day the accumulated memory lost to the leak causes a failure due to insufficient resources. This, too is a difficult problem to identify and locate.

For a cutesy explanation of dynamic memory allocation, see [Malloc, Free, and the Mall of New Athens](http://computationaltales.blogspot.com/2011/04/malloc-free-and-mall-of-new-athens.html) at the Computational Fairy Tales blog.
