# Chapter 17: Unusual Control Structures

Read Chapter 17 of *Code Complete*.

## 17.1 Multiple Returns from a Routine

Like other PLs in the C family, GML uses the keyword `return` for functions (routines that return a value to the caller). Unlike other C family languages, GML does not allow a "bare" return; it uses the `exit` keyword instead.

## 17.2 Recursion

Remember that a recursive approach to problem solving means breaking a problem into smaller instances of the same form, then repeating that process until you reach a very small problem size that can be solved easily and directly. In programming, this means a routine that calls itself on increasingly smaller problem sizes, until reaching a "base case" that can be directly computed.

### Stack Overflow

Many of the concerns related to recursion come from the fact that recursion, by its nature, creates situations where a large number of routine calls are all "on hold", waiting until the call that they made returns control to them.

As we have discussed a number of times, the underlying system implements routine calls by treating some memory as a stack (the "call stack") to save information about the state of computations so that it can be restored later when a call returns. Often, an operating system will provide a separate call stack for each running program. In addition, an OS and its stack handling usually emphasize efficiency of this important mechanism. For these and other reasons, the size of a call stack is usually limited.

If the stack's limited size becomes completely filled, the next attempt to make a routine call will fail. This situation is called **stack overflow**, and causes your program to shut down (more or less gracefully, depending on the operating system). Because of the many pending routine calls it creates, recursive programming is a technique that can lead to stack overflow. I want to distinguish two different ways that this can happen.

A recursive routine that contains a logic error can lead to stack overflow when the error prevents the base case from executing when it should. As a result, the recursive routine calls itself forever-- in theory. In practice, the program will stop because the finite amount of stack space is filled. This form of stack overflow almost doesn't count, because fixing your program will make it go away. Assuming that you get your program correct, you will not need to worry about this cause of stack overflow.

The second form is more dangerous, because correct programs are also vulnerable to stack overflow. In this scenario, the recursive routine is entirely correct, but the size of the problem to be solved is simply too big, and the limited call stack cannot accommodate all of the bookkeeping needed for the recursive computation. This can be addressed by some combination of the following.

- Use McConnell's safety counter tip so that you can at least detect the problem when it occurs, and handle it gracefully.
- If possible, move data from the stack onto the heap by using dynamic allocation. (See our earlier coverage of section 10.5 for a refresher on static vs. dynamic allocation.) This helps because the stack space is limited to be much smaller than the system's available memory. By using heap space, you can draw on more of the entire system memory.
- Some computer systems allow you to configure the size of the stack limit. This might be a solution in some isolated cases.
- Consider changing to a non-recursive solution.

### Optimizing Tail Recursion

McConnell makes some harsh comments about recursive algorithms for "silly" cases like computing the Fibonacci numbers and factorials. While he has a point, there are also some counterarguments that introduce very important concepts.

He says that the recursive Java function that computes a factorial is harder to understand than the iterative version. It might be harder to understand if you are a programmer with no background in computer science. But computer science students should understand recursion well enough. In addition, factorials (and also Fibonacci numbers) are mathematical concepts that mathematicians will often express with recursive functions. Arguably, the recursive approach is programming in terms of the problem domain.

Next, he claims that the recursive Java function that computes a factorial will be slow and will use memory unpredictably. But this is not necessarily true. To understand why, you need to consider the following facts.

- When a compiler translates a higher-level language into a lower-level language, it is common to apply various optimizations to eliminate inefficiencies in the original source code. McConnell goes into this topic in Chapters 25 and 26.
- An algorithm is **tail-recursive** if the last step it performs is a recursive call. The Java factorial program that McConnell shows is tail-recursive.
- Theoretical computer scientists have proven that a tail-recursive algorithm can always be transformed into an iterative (non-recursive) algorithm by using a stack.[*](#note1)

When you put these facts together, here is the implication: although the code shown is recursive, the instructions executed by the hardware are not necessarily recursive. It is entirely possible that the compiler that translates the code into a lower level language converts the recursive code into lower-level instructions that produce the same result without using recursion. So, the recursive Java code may not lead to recursive computations by the hardware. The efficiency and memory use of recursive computations is clearly irrelevant if you are not actually doing recursive computations.

As a result, I would modify McConnell's guidance on recursion by asking programmers to consider the following questions.

- Which is the better way of expressing the solution, recursion or iteration?
- Can I reduce the risk of stack overflow to an acceptable level?
- Is my compiler capable of optimizing tail recursion?
- Can my recursive solution be written so that it is tail-recursive?

Finally, factorials and Fibonacci numbers are "silly" examples in a way that McConnell did not seem to have in mind. Both of these can be calculated by plugging values directly into appropriate formulas. Neither recursion nor iteration are actually required.

## 17.3 `goto`

The `goto` (or `jump`) statement was created at a time that `if`/`else` and loop constructs did not exist. If you think about it, you will see that conditional statements and loop constructs are simply well-formed patterns of jumping forward or backward over sequential instructions. (See the discussion of Structured Programming in section 19.5). Since modern PLs provide structured ways of doing these important things, most other uses of `goto` are harmful and should be avoided.

The major exception to this rule, as McConnell points out, is in error handling. When a program is handling an error situation, it is by definition departing from the "normal" flow of logic and control. It's not surprising that this creates a need to jump out of sequential code in a way that is different from the "normal" control structures of conditional statements and loops.

Some PLs provide **exception handling**, another kind of control structure that is used in error (or exceptional) situations. This is the concept that McConnell calls "try-finally". In the code example on page 404, the "Try" block sets up exception (error) handling for the code that it contains. If the statements in the Try block execute without problems, the statement under "Finally" will run in order to perform some necessary cleanup. However, if there is an error in executing any of the statements inside the Try block, the PL will jump to the cleanup statement under Finally. In other words, the PL guarantees that the cleanup statement under Finally will always run, even when an error occurs.

Unfortunately, many PLs (especially C++ and Java) made their exception handling features too powerful (in my opinion). There is too little restriction on the jumping, so that some very confusing control flows can be created. These features are all right if they are used in limited ways.

Some PLs have no equivalent of `goto`. GML falls into this category. Since GML also does not provide any exception handling mechanism, it can be very awkward to write good error handling code in GML. I found this frustrating when working on test framework code in GML, which naturally does a lot of checking for error conditions.

------

[*](#ref1) This makes sense if you think about it. Recursion is implemented by using the system's call stack to hold the data related to repeated (recursive) routine calls as the solution is computed. A program could instead explicitly use its own stack data structure to manage the equivalent data and iterate (loop) to repeatedly carry out the steps in the solution.