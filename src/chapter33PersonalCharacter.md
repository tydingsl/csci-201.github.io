# Chapter 33: Personal Character

Read *Code Complete* Chapter 33.

This chapter shows that dedication to excellence in a particular profession can complement an individual's overall development as an excellent person leading their ideal life.

It is the kind of material that many students will be tempted to blow off. In asking you not to, I will cite two points.

1. No one can force you to be great. But if you want to be great, this chapter contains a lot of clues. (And not just about programming or computers.)
2. Sticking closer to programming, McConnell cites data showing that great programmers are 10 times as effective as poor programmers. Can you honestly say that you don't care which end of that scale is you?

If you genuinely don't want to be great, and don't care which end of the scale is you, then I am 100% sincere that I want to speak with you personally and understand your perspective. You know how to find me.

## Why now?

McConnell addresses the "Why?" question, arguing for the importance of personal character to programming (and to any human activity).

I want to address the question "Why now?". McConnell puts this near the end of the book. Why cover it near the beginning of the course?

Because nearly every other chapter will introduce specific information that should be considered and applied in light of the personal character emphasis.

## An Example

Skeptical? Take one small (but critical) example from the chapter we've already covered. On page 243 (and again in the end-of-chapter checklists) McConnell advises enabling all compiler warnings and paying attention to them.

First, some background in case you are not familiar with the relevant details. Compilers (and other programming toolsets) can automatically find a variety of problems and potential problems in a program's source code. (This is called **static analysis** because it simply looks at the code without running it.) The details vary from one PL and one tool to another.

There is a strong cultural norm among programmers that many of these warnings are just noise to be ignored. (Generally, these would not be the great programmers.) As a result, the default behavior for many compilers is to show only some kinds of warnings and errors, and to suppress some of the warnings that could be detected. 

What's worse, many programmers change the default behavior *in the wrong direction*, so that the compiler suppresses even more kinds of potential issues. Often programmers will disable all of these messages altogether.

Now, a real world professional example of the results. In February 2014, Apple announced and fixed an iOS flaw in the encryption underlying secure https Web transactions. For up to 18 months, iOS users had been vulnerable to having their (supposedly) secure transactions hijacked by hackers.

The entire C source file is open source, available [here](http://opensource.apple.com/source/Security/Security-55471/libsecurity_ssl/lib/sslKeyExchange.c).

Here is a snippet that contains the problem.

```c
    if ((err = ReadyHash(&SSLHashSHA1, &hashCtx)) != 0)
        goto fail;
    if ((err = SSLHashSHA1.update(&hashCtx, &clientRandom)) != 0)
        goto fail;
    if ((err = SSLHashSHA1.update(&hashCtx, &serverRandom)) != 0)
        goto fail;
    if ((err = SSLHashSHA1.update(&hashCtx, &signedParams)) != 0)
        goto fail;
        goto fail;
    if ((err = SSLHashSHA1.final(&hashCtx, &hashOut)) != 0)
        goto fail;
```

You don't need to understand C or the details of this program to see the flaw. Look at the next-to-last `if` statement. If that condition is true, the program will goto a line labeled `fail`. The next statement tells the code to goto the `fail` line *always-- in all cases, no matter what*. This is the bug; this code that is meant to set up the secure connection *never* completes successfully.

Here are some observations. All of them relate to violations of guidelines that McConnell will suggest, or has already.

- The indenting implies that the second `goto` only happens when the `if` evaluates to `true`, but it is misleading. Curly braces around the multiple statements under the `if` would eliminate the bug (although the code would still be strangely redundant).
- It's not clear how the `goto` statement was duplicated, but copying and modifying code is a major source of errors. Copy and paste can kill.
- The last `if` statement can never execute. The preceding `goto` prevents us from ever reaching that code.

This last point is the one I want to emphasize here: unreachable code can be detected by static analysis, and nearly every C compiler can automatically warn about this.

Let's be clear: it is almost certain that *iOS programmers released a horrible security flaw that their compiler automatically told them about!* At least one of the following must be true.

- They were not using a compiler that performed such checks. (Unlikely, but if so, they should get one and use it.)
- The compiler warned them, but the programmers ignored the message that pointed out a major danger. (A bit more likely.)
- They configured the compiler to not display the message that would have pointed out a major danger. (Most likely.)

If you aren't outraged, you aren't paying attention. Do you now grasp the importance of McConnell's guidance?

In fact, we can't call it "guidance". In a forum comment related to this iOS flaw, I ranted: "Professional ethics demand that we advance toward a culture where ignorance of these practices is considered incompetence, and willful failure to apply them is considered malpractice."

As an instructor, it's my responsibility to address the ignorance. Consider it done. As a computing professional, it's your ethical responsibility to apply the practices. Start now.