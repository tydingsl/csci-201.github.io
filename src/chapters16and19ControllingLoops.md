# Chapters 16, 19: Controlling Loops

Read *Code Complete* Chapter 16, plus sections 19.3-19.6.

## 16.1 Selecting the Kind of Loop

Study the following alternative terminology. It is more precise and also more widely used.

| McConnell's Term          | Preferred Alternative    |
| ------------------------- | ------------------------ |
| rigid                     | **definite iteration**   |
| flexible                  | **indefinite iteration** |
| beginning (test location) | **pre-test loop**        |
| end (test location)       | **post-test loop**       |

**Iteration** refers to repetition driven by a loop.

Carefully study the C++ example at the bottom of page 369, and the improved version on the following page. (GML and C++ both belong to the C-like family of languages, so you should be able to follow the logic flow.) The "before" code uses a practice that some authors call "loop and a half"; the repeated code is like a half pass through the loop before the loop starts. Some authors even teach this technique to beginning programmers, but I agree with McConnell that it should be avoided.

## 16.3 Creating Loops from the Inside Out

Many less experienced programmers feel stuck when starting a complex programming task. This section gives a specific example of applying some more general rules:

1. Write in pseudocode/comments/English before writing in your PL. (Chapter 9 is all about this approach. I recommend it.)
2. Write in incomplete, broken PL as is helpful. After you have the ideas down, you can work on making the code complete and syntactically correct.
3. Don't get stuck on the idea of writing the final code in order from first line to last. It is often easier to work on smaller parts out of order and put them together.

## 19.3 Null Statements

Sometimes students mistakenly write code similar to the example given at the top of page 444, but put the semicolon at the end of the while line. They will often follow this with a block of code that they expect to be the body of the loop, but it is not. This mistake usually creates an infinite loop, because the situation tested in the Boolean expression never changes.

If you do need to write an empty loop, be sure that you use one of the techniques shown to indicate that it is intentional.

## 19.4, 19.6 Deep Nesting, Complexity

Many students reach a stage where they try to use one long routine to solve programming problems that are too big for that approach. This often involves deep nesting and repetitive blocks of code.

To the greatest extent prudent, you should follow the guidelines here in your programming. One of the best ways to reduce nesting, complexity, and redundancy is to break up the code into a larger number of routines. We will see more on that topic soon.